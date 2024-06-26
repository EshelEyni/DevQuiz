import { readdir, lstat, rmdir, unlink, mkdir, copyFile } from "fs";
import { join, dirname } from "path";
import { promisify } from "util";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const deleteFolderContents = async (folderPath) => {
  const files = await promisify(readdir)(folderPath);
  for (const file of files) {
    const currentPath = join(folderPath, file);
    const stat = await promisify(lstat)(currentPath);
    if (stat.isDirectory()) {
      await deleteFolderContents(currentPath);
      await promisify(rmdir)(currentPath);
    } else {
      await promisify(unlink)(currentPath);
    }
  }
};

const copyFiles = async (src, dest) => {
  await promisify(mkdir)(dest, { recursive: true });
  const entries = await promisify(readdir)(src, { withFileTypes: true });
  for (let entry of entries) {
    const srcPath = join(src, entry.name);
    const destPath = join(dest, entry.name);
    entry.isDirectory()
      ? await copyFiles(srcPath, destPath)
      : await promisify(copyFile)(srcPath, destPath);
  }
};

const main = async () => {
  const backendPublicPath = join(__dirname, "backend", "build", "public");
  const frontendDistPath = join(__dirname, "frontend", "dist");

  try {
    // Delete all files in the backend public directory
    await deleteFolderContents(backendPublicPath);
    // Copy all files from the frontend dist directory to the backend public directory
    await copyFiles(frontendDistPath, backendPublicPath);
    console.log(
      "Files successfully copied from frontend/dist to backend/build/public"
    );
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

main();
