import { writeFile } from "node:fs/promises";

export const writeData = async (content: String): Promise<void> => {
  try {
    content += `\n${new Date().toISOString()}`;
    await writeFile("loggingErrors.txt", content, "utf-8");
    console.log("File written successfully");
  } catch (error) {
    console.error("Error writing to file:", error);
  }
};
