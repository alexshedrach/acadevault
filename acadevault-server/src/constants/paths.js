import path from "path";
import { fileURLToPath } from "url";

// Determine directory dynamically (ESM compatible)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Export common paths for reusability
// Use process.cwd() to get the project root directory
// Use __dirname when path file is in the root working directory

// export const ROOT_DIR = __dirname;
export const ROOT_LOG_DIR = __dirname;
export const ROOT_DIR = process.cwd();
export const PUBLIC_DIR = path.join(ROOT_DIR, "public");
export const USER_ASSETS_DIR = path.join(PUBLIC_DIR, "users");
export const MATERIAL_ASSETS_DIR = path.join(PUBLIC_DIR, "uploads");
export const LOG_DIR = path.join(ROOT_LOG_DIR, "../../logs");
