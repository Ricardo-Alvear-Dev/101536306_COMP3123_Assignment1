import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { writeData } from "../../logging/logging.function";
import { healthStatusService } from "../../services/health/health.service";

const currentFilePath = fileURLToPath(import.meta.url);

export const healthStatusController = async (req: Request, res: Response) => {
  try {
    await healthStatusService();
    return res
      .status(StatusCodes.OK)
      .json("Status: Every function is operating as expected.");
  } catch (error) {
    if (error instanceof Error) {
      writeData(
        `Error: ${error.message}. This error occurred on file: ${path.basename(currentFilePath)}`,
      );

      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
};
