import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";

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

    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ error_message: "Something went wrong with the token creation" });
  } catch (error) {
    if (error instanceof Error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
  }
};
