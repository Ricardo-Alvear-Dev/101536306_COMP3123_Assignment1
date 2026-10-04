import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  postLoginUserService,
  postSignUpUserService,
} from "../../services/user/user.services";

export const postSignUpUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error_message: "Invalid username, email, or password" });

    await postSignUpUserService({ username, email, password });

    return res.status(StatusCodes.CREATED).json();
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
  }
};

export const postLoginUserController = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error_message: "Invalid username, email, or password" });

    await postLoginUserService({ username, email, password });

    return res.status(StatusCodes.OK).json();
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
  }
};
