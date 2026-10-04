import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const JWTTokenHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
  } catch (error) {
    if (error instanceof Error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
