import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const postSignUpUserService = (req: Request, res: Response) => {
  try {
    return res.status(StatusCodes.CREATED).json();
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
  }
};

export const postLoginUserService = (req: Request, res: Response) => {
  try {
    return res.status(StatusCodes.OK).json();
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
  }
};
