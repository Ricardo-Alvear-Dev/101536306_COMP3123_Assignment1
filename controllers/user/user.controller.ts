import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { writeData } from "../../logging/logging.function";
import {
  postLoginUserService,
  postSignUpUserService,
} from "../../services/user/user.services";

const currentFilePath = fileURLToPath(import.meta.url);

export const postSignUpUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await postSignUpUserService({ email, password });

    return res.status(StatusCodes.CREATED).json({ jwtToken: result });
  } catch (error) {
    if (error instanceof Error) {
      writeData(
        `Error: ${error.message}. This error occurred on file: ${path.basename(currentFilePath)}`,
      );

      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
    }
  }
};

export const postLoginUserController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    await postLoginUserService({ email, password });

    return res.status(StatusCodes.OK).json();
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
  }
};
