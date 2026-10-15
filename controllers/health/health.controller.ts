import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import path from "node:path";
import { writeData } from "../../logging/logging.function";
import { healthStatusService } from "../../services/health/health.service";

const currentFilePath = __filename;

export const healthStatusController = async (req: Request, res: Response) => {
  try {
    await healthStatusService();
    return res
      .status(StatusCodes.OK)
      .json("Status: Every function is operating as expected.");
  } catch (error) {
    let errorMessage = "Internal Server Error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    writeData(
      `Error: ${errorMessage}. This error occurred on file: ${path.basename(currentFilePath)}`,
    );

    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: errorMessage });
  }
};
