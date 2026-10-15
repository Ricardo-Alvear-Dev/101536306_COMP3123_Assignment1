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
    const authHeader = req.headers.authorization;
    const token = authHeader?.split(" ")[1];

    if (!token) {
      const currentFilePath = __filename;
      writeData(
        `Error: No token provided. This error occurred on file: ${path.basename(currentFilePath)}`,
      );
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({
          error_message: "You are not authorized to continue (Missing token)",
        });
    }

    // jwt.verify throws an error if verification fails
    jwt.verify(token, process.env.JWT as string);

    return next();
  } catch (error) {
    const currentFilePath = __filename;
    let errorMessage = "Internal Server Error";

    if (error instanceof Error) {
      errorMessage = error.message;
    }

    writeData(
      `Error: ${errorMessage}. This error occurred on file: ${path.basename(currentFilePath)}`,
    );

    // Differentiate between invalid token (Unauthorized) and server errors if needed,
    // or return Internal Server Error as you had before:
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ error_message: errorMessage });
  }
};
