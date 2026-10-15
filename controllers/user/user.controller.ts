import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import path from "node:path";
import { writeData } from "../../logging/logging.function";
import {
  postLoginUserService,
  postSignUpUserService,
} from "../../services/user/user.services";

const currentFilePath = __filename;

export const postSignUpUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await postSignUpUserService({ email, password });
    return res.status(StatusCodes.CREATED).json({ jwtToken: result });
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

export const postLoginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    await postLoginUserService({ email, password });
    return res.status(StatusCodes.OK).json("Logged in!");
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
