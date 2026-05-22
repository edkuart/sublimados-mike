import { spawn } from "node:child_process";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.QA_BASE_URL || process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";
const chromePath =
  process.env.CHROME_PATH ||
  "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
const port = Number(process.env.QA_CHROME_PORT || 9333);
const artifactRoot = path.resolve(process.cwd(), ".qa-artifacts", "visual-audit");
const screenshotDir = path.join(artifactRoot, "screenshots");
const profileDir = path.join(artifactRoot, `chrome-profile-${Date.now()}`);

class CdpClient {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.events = new Map();
    ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id && this.pending.has(message.id)) {
        const { resolve, reject } = this.pending.get(message.id);
        this.pending.delete(message.id);
        if (message.error) reject(new Error(message.error.message));
        else resolve(message.result);
        return;
      }
      const waiters = this.events.get(message.method) || [];
      waiters.splice(0).forEach((resolve) => resolve(message.params));
    });
  }

  send(method, params = {}) {
    const id = ++this.id;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`CDP timeout: ${method}`));
        }
      }, 15000);
    });
  }

  waitFor(method) {
    return new Promise((resolve) => {
      const waiters = this.events.get(method) || [];
      waiters.push(resolve);
      this.events.set(method, waiters);
    });
  }

  close() {
    this.ws.close();
  }
}

async function main() {
  await rm(artifactRoot, { recursive: true, force: true });
  await mkdir(screenshotDir, { recursive: true });

  const chrome = spawn(
    chromePath,
    [
      "--headless=new",
      `--remote-debugging-port=${port}`,
      `--user-data-dir=${profileDir}`,
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      "about:blank",
    ],
    { stdio: "ignore" },
  );

  const report = {
    baseUrl,
    startedAt: new Date().toISOString(),
    screenshots: [],
    checks: [],
    consoleErrors: [],
  };

  try {
    await waitForChrome();
    const target = await createTarget();
    const client = await connect(target.webSocketDebuggerUrl);
    const consoleErrors = [];

    await client.send("Page.enable");
    await client.send("Runtime.enable");
    await client.send("Log.enable");
    client.ws.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.method === "Runtime.exceptionThrown") {
        consoleErrors.push({
          type: "exception",
          text: message.params?.exceptionDetails?.text,
          url: message.params?.exceptionDetails?.url,
        });
      }
      if (message.method === "Log.entryAdded" && ["error", "warning"].includes(message.params?.entry?.level)) {
        consoleErrors.push({
          type: message.params.entry.level,
          text: message.params.entry.text,
          url: message.params.entry.url,
        });
      }
    });

    const pages = [
      { name: "home-desktop", path: "/", width: 1440, height: 900 },
      { name: "home-mobile", path: "/", width: 390, height: 844, mobile: true },
      { name: "catalogo-desktop", path: "/catalogo", width: 1440, height: 900 },
      { name: "producto-desktop", path: "/productos/taza-blanca-personalizada", width: 1440, height: 900 },
      { name: "producto-mobile", path: "/productos/taza-blanca-personalizada", width: 390, height: 844, mobile: true },
      { name: "politicas-desktop", path: "/politicas", width: 1440, height: 900 },
      { name: "login-mobile", path: "/login", width: 390, height: 844, mobile: true },
    ];

    for (const page of pages) {
      await setViewport(client, page);
      await navigate(client, page.path);
      await settle(client);
      const screenshot = await takeScreenshot(client, `${page.name}.png`);
      report.screenshots.push(screenshot);
      report.checks.push(await inspectPage(client, page));
    }

    await setViewport(client, { width: 1440, height: 900 });
    await navigate(client, "/productos/taza-blanca-personalizada");
    await settle(client);
    report.checks.push(await testQuoteFlow(client));
    report.screenshots.push(await takeScreenshot(client, "producto-flow-filled.png"));

    await setViewport(client, { width: 390, height: 844, mobile: true });
    await navigate(client, "/");
    await settle(client);
    report.checks.push(await testMobileMenu(client));
    report.screenshots.push(await takeScreenshot(client, "mobile-menu-open.png"));

    report.consoleErrors = consoleErrors;
    report.finishedAt = new Date().toISOString();
    await writeFile(path.join(artifactRoot, "report.json"), JSON.stringify(report, null, 2));
    client.close();

    const failures = report.checks.flatMap((group) => group.failures || []);
    console.log(`Visual audit screenshots: ${screenshotDir}`);
    console.log(`Visual audit report: ${path.join(artifactRoot, "report.json")}`);
    console.log(`Visual audit checks: ${report.checks.length}`);
    console.log(`Visual audit console warnings/errors: ${consoleErrors.length}`);
    if (failures.length > 0) {
      failures.forEach((failure) => console.error(`FAIL ${failure}`));
      process.exitCode = 1;
    } else {
      console.log("Visual audit passed.");
    }
  } finally {
    chrome.kill();
  }
}

async function waitForChrome() {
  const versionUrl = `http://127.0.0.1:${port}/json/version`;
  for (let i = 0; i < 60; i += 1) {
    try {
      const response = await fetch(versionUrl);
      if (response.ok) return;
    } catch {
      await new Promise((resolve) => setTimeout(resolve, 250));
    }
  }
  throw new Error("Chrome DevTools no inicio a tiempo.");
}

async function createTarget() {
  const response = await fetch(`http://127.0.0.1:${port}/json/new`, { method: "PUT" });
  if (!response.ok) throw new Error(`No se pudo crear tab CDP: ${response.status}`);
  return response.json();
}

function connect(wsUrl) {
  const ws = new WebSocket(wsUrl);
  return new Promise((resolve, reject) => {
    ws.addEventListener("open", () => resolve(new CdpClient(ws)));
    ws.addEventListener("error", () => reject(new Error("No se pudo conectar a CDP.")));
  });
}

async function setViewport(client, viewport) {
  await client.send("Emulation.setDeviceMetricsOverride", {
    width: viewport.width,
    height: viewport.height,
    deviceScaleFactor: viewport.mobile ? 2 : 1,
    mobile: Boolean(viewport.mobile),
  });
}

async function navigate(client, route) {
  const load = client.waitFor("Page.loadEventFired");
  await client.send("Page.navigate", { url: new URL(route, baseUrl).href });
  await load;
}

async function settle(client) {
  await client.send("Runtime.evaluate", {
    expression: "new Promise((resolve) => setTimeout(resolve, 600))",
    awaitPromise: true,
  });
}

async function takeScreenshot(client, fileName) {
  const result = await client.send("Page.captureScreenshot", {
    format: "png",
    fromSurface: true,
    captureBeyondViewport: true,
  });
  const filePath = path.join(screenshotDir, fileName);
  await writeFile(filePath, Buffer.from(result.data, "base64"));
  return filePath;
}

async function inspectPage(client, page) {
  const result = await evaluate(client, `
    (() => {
      const text = document.body?.innerText || "";
      const links = Array.from(document.querySelectorAll("a[href]")).map((a) => a.getAttribute("href"));
      return {
        title: document.title,
        url: location.href,
        hasHorizontalOverflow: document.documentElement.scrollWidth > window.innerWidth + 1,
        width: window.innerWidth,
        scrollWidth: document.documentElement.scrollWidth,
        hasMain: Boolean(document.querySelector("main")),
        bodyTextLength: text.length,
        emptyHashLinks: links.filter((href) => href === "#").length,
      };
    })()
  `);
  const failures = [];
  if (!result.hasMain) failures.push(`${page.name}: no tiene <main>`);
  if (result.bodyTextLength < 100) failures.push(`${page.name}: contenido visible insuficiente`);
  if (result.hasHorizontalOverflow) failures.push(`${page.name}: overflow horizontal (${result.scrollWidth} > ${result.width})`);
  if (result.emptyHashLinks > 0) failures.push(`${page.name}: contiene ${result.emptyHashLinks} enlace(s) href="#"`);
  return { name: page.name, result, failures };
}

async function testQuoteFlow(client) {
  const result = await evaluate(client, `
    (async () => {
      const setNativeValue = (element, value) => {
        const setter = Object.getOwnPropertyDescriptor(element.__proto__, "value")?.set;
        setter?.call(element, value);
        element.dispatchEvent(new Event("input", { bubbles: true }));
        element.dispatchEvent(new Event("change", { bubbles: true }));
      };
      const byPlaceholder = (text) => Array.from(document.querySelectorAll("input, textarea"))
        .find((input) => input.getAttribute("placeholder") === text);
      setNativeValue(document.getElementById("Nombre o texto principal"), "Prueba QA");
      setNativeValue(document.getElementById("Observaciones"), "Prueba visual automatizada");
      setNativeValue(byPlaceholder("Tu nombre"), "Cliente QA");
      setNativeValue(byPlaceholder("+502 5000-0000"), "+502 5555-0000");
      setNativeValue(byPlaceholder("Zona 10, Guatemala"), "Zona 11, Guatemala");
      setNativeValue(byPlaceholder("Colonia, residencial…"), "Colonia QA");
      Array.from(document.querySelectorAll("button")).find((button) => button.innerText.includes("Recolección"))?.click();
      const checkbox = document.querySelector('input[type="checkbox"]');
      checkbox.click();
      await new Promise((resolve) => setTimeout(resolve, 700));
      window.__qaOpen = null;
      window.open = (url) => { window.__qaOpen = url; return null; };
      const button = Array.from(document.querySelectorAll("button"))
        .find((item) => item.innerText.includes("Enviar cotización por WhatsApp"));
      const disabledBeforeClick = Boolean(button?.disabled);
      button?.click();
      await new Promise((resolve) => setTimeout(resolve, 500));
      return {
        buttonFound: Boolean(button),
        disabledBeforeClick,
        openedUrl: window.__qaOpen,
        hasWhatsAppUrl: typeof window.__qaOpen === "string" && window.__qaOpen.includes("wa.me"),
        errorsText: Array.from(document.querySelectorAll("p")).map((p) => p.innerText).filter((text) => text.includes("Ingresa") || text.includes("Acepta") || text.includes("Completa")),
      };
    })()
  `);
  const failures = [];
  if (!result.buttonFound) failures.push("quote-flow: no se encontro CTA WhatsApp");
  if (result.disabledBeforeClick) failures.push("quote-flow: CTA sigue deshabilitado con datos completos");
  if (!result.hasWhatsAppUrl) failures.push("quote-flow: no genero URL de WhatsApp");
  return { name: "quote-flow", result, failures };
}

async function testMobileMenu(client) {
  const result = await evaluate(client, `
    (async () => {
      const menu = document.querySelector('button[aria-label="Menú"]');
      menu?.click();
      await new Promise((resolve) => setTimeout(resolve, 400));
      const text = document.body.innerText;
      return {
        menuFound: Boolean(menu),
        menuExpanded: text.includes("Cotizar por WhatsApp") && text.includes("Menú"),
        hasClose: Boolean(document.querySelector('button[aria-label="Cerrar menú"]')),
      };
    })()
  `);
  const failures = [];
  if (!result.menuFound) failures.push("mobile-menu: no se encontro boton de menu");
  if (!result.menuExpanded) failures.push("mobile-menu: no se desplego el menu movil");
  if (!result.hasClose) failures.push("mobile-menu: no se encontro boton cerrar");
  return { name: "mobile-menu", result, failures };
}

async function evaluate(client, expression) {
  const result = await client.send("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (result.exceptionDetails) {
    throw new Error(result.exceptionDetails.text || "Runtime.evaluate failed");
  }
  return result.result.value;
}

await main();
