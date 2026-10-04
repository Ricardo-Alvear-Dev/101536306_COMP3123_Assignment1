import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import {
  deleteEmployeesIdService,
  getAllEmployeesService,
  getEmployeesIdService,
} from "../../services/employee/employee.services";

export const getAllEmployeeController = async (req: Request, res: Response) => {
  try {
    const employeeData = await getAllEmployeesService();
    return res.status(StatusCodes.OK).json(employeeData);
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
  }
};

export const postAllEmployeesController = (req: Request, res: Response) => {
  try {
    return res.status(StatusCodes.CREATED).json();
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
  }
};

export const getEmployeesIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error_message: "Invalid id syntax" });

    const getSpecificEmployee = await getEmployeesIdService(+id);

    return res.status(StatusCodes.OK).json(getSpecificEmployee);
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
  }
};

export const putEmployeesIdController = async (req: Request, res: Response) => {
  try {
    return res.status(StatusCodes.CREATED).json();
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
  }
};

export const deleteEmployeesIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!id)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error_message: "Invalid id syntax" });

    await deleteEmployeesIdService(+id);

    return res.status(StatusCodes.NO_CONTENT).json();
  } catch (error) {
    if (error instanceof Error)
      return res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: error.message });
  }
};
