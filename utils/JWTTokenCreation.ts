import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { writeData } from "../logging/logging.function";

const currentFilePath = fileURLToPath(import.meta.url);

export const JWTTokenCreation = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const result = jwt.sign(req.body, process.env.JWT as string, {
      expiresIn: "1d",
    });

    if (result) {
      next();
    }

    writeData(
      `Error: token creation error. This error occurred on file: ${path.basename(currentFilePath)}`,
    );

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error_message: "Something went wrong with the token creation" });
  } catch (error) {
    if (error instanceof Error) {
      writeData(
        `Error: ${error.message}. This error occurred on file: ${path.basename(currentFilePath)}`,
      );

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
    }
  }
};
