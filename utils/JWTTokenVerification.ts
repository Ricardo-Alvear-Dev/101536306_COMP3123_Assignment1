import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import * as path from "path";
import { fileURLToPath } from "url";
import { writeData } from "../logging/logging.function";

export const JWTTokenVerification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = jwt.verify(
      req.headers.authorization?.split(" ")[0] as string,
      process.env.JWT as string,
    );

    if (result) {
      next();
    }

    const currentFilePath = fileURLToPath(import.meta.url);

    writeData(
      `Error: You are not authorized to continue. This error occurred on file: ${path.basename(currentFilePath)}`,
    );

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error_message: "You are not authorized to continue" });
  } catch (error) {
    if (error instanceof Error) {
      const currentFilePath = fileURLToPath(import.meta.url);

      writeData(
        `Error: ${error.message}. This error occurred on file: ${path.basename(currentFilePath)}`,
      );

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
};
