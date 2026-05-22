import { config } from "dotenv";
import { validateDeployEnv } from "../src/lib/env/deploy.ts";

[".env.production.local", ".env.production", ".env.local", ".env"].forEach((path) => {
  config({ path, quiet: true });
});

const result = validateDeployEnv(process.env);

if (!result.success) {
  console.error("Deploy env check failed:");
  for (const issue of result.error.issues) {
    console.error(`- ${issue.path.join(".")}: ${issue.message}`);
  }
  process.exit(1);
}

console.log("Deploy env check passed.");
