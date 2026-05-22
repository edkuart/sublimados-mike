import "server-only";
import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
import { sanitizeOriginalFileName } from "./validation";

const uploadRoot = path.resolve(process.cwd(), ".uploads", "pending");
const uploadsBaseRoot = path.resolve(process.cwd(), ".uploads");

export type StoredUpload = {
  storageKey: string;
  originalName: string;
  safeName: string;
  mimeType: string;
  sizeBytes: number;
};

export async function storeUploadLocally(file: File, extension: string): Promise<StoredUpload> {
  await fs.mkdir(uploadRoot, { recursive: true });

  const originalName = sanitizeOriginalFileName(file.name);
  const id = crypto.randomUUID();
  const safeName = `${id}${extension}`;
  const finalPath = path.resolve(uploadRoot, safeName);

  if (!finalPath.startsWith(uploadRoot)) {
    throw new Error("Invalid upload path.");
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(finalPath, buffer, { flag: "wx" });

  return {
    storageKey: `pending/${safeName}`,
    originalName,
    safeName,
    mimeType: file.type,
    sizeBytes: file.size,
  };
}

export function resolveStoredUploadPath(storageKey: string) {
  if (!/^pending\/[a-f0-9-]+\.[a-z0-9]+$/i.test(storageKey)) {
    throw new Error("Invalid storage key.");
  }

  const finalPath = path.resolve(uploadsBaseRoot, storageKey);

  if (!finalPath.startsWith(`${uploadsBaseRoot}${path.sep}`)) {
    throw new Error("Invalid upload path.");
  }

  return finalPath;
}

export async function readStoredUpload(storageKey: string) {
  const finalPath = resolveStoredUploadPath(storageKey);
  const buffer = await fs.readFile(finalPath);
  const extension = path.extname(finalPath).toLowerCase();

  return {
    buffer,
    extension,
  };
}
