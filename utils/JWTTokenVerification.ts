import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

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

    return res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ error_message: "You are not authorized to continue" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
