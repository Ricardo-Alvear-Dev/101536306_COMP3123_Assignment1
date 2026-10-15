import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import * as path from "path";
import { writeData } from "../logging/logging.function";

export const JWTTokenVerification = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = jwt.verify(
      req.headers.authorization?.split(" ")[1] as string,
      process.env.JWT as string,
    );

    if (result) {
      return next();
    }

    // __filename is natively available in CommonJS Node.js environments
    const currentFilePath = __filename;

    writeData(
      `Error: You are not authorized to continue. This error occurred on file: ${path.basename(currentFilePath)}`,
    );

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error_message: "You are not authorized to continue" });
  } catch (error) {
    if (error instanceof Error) {
      const currentFilePath = __filename;

      writeData(
        `Error: ${error.message}. This error occurred on file: ${path.basename(currentFilePath)}`,
      );

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
};
