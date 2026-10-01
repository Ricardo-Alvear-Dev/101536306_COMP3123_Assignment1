import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";

export const getAllEmployeesService = (req: Request, res: Response) => {
  try {
    return res.status(StatusCodes.OK).json();
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
  }
};

export const postAllEmployeesService = (req: Request, res: Response) => {
  try {
    return res.status(StatusCodes.CREATED).json();
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
  }
};

export const getEmployeesIdService = (req: Request, res: Response) => {
  try {
    return res.status(StatusCodes.OK).json();
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
  }
};

export const putEmployeesIdService = (req: Request, res: Response) => {
  try {
    return res.status(StatusCodes.CREATED).json();
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
  }
};

export const deleteEmployeesIdService = (req: Request, res: Response) => {
  try {
    return res.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
  }
};
