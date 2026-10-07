import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { writeData } from "../../logging/logging.function";
import {
  deleteEmployeesIdService,
  getAllEmployeesService,
  getEmployeesIdService,
  postAllEmployeesService,
} from "../../services/employee/employee.services";

const currentFilePath = fileURLToPath(import.meta.url);

export const getAllEmployeeController = async (req: Request, res: Response) => {
  try {
    const employeeData = await getAllEmployeesService();
    return res.status(StatusCodes.OK).json(employeeData);
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

export const postAllEmployeesController = async (
  req: Request,
  res: Response,
) => {
  try {
    const {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
      user,
    } = req.body;

    await postAllEmployeesService({
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
      user,
    });

    return res.status(StatusCodes.CREATED).json();
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

export const getEmployeesIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const getSpecificEmployee = await getEmployeesIdService(+id);

    return res.status(StatusCodes.OK).json(getSpecificEmployee);
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

export const putEmployeesIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const putSpecificEmployee = await getEmployeesIdService(+id);

    return res.status(StatusCodes.CREATED).json(putSpecificEmployee);
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

export const deleteEmployeesIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const eid = req.query.eid;

    await deleteEmployeesIdService(+eid);

    return res.status(StatusCodes.NO_CONTENT).json();
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
