import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().min(1).max(65535).default(3000)
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const issues = parsedEnv.error.issues.map((issue) => ({
    path: issue.path.join("."),
    message: issue.message
  }));
  throw new Error(`Invalid environment configuration: ${JSON.stringify(issues)}`);
}

export const env = parsedEnv.data;
