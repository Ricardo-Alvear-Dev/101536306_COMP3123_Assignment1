import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import path from "node:path";
import { writeData } from "../../logging/logging.function";
import {
  deleteEmployeesIdService,
  getAllEmployeesService,
  getEmployeesIdService,
  postAllEmployeesService,
  putEmployeesIdService,
} from "../../services/employee/employee.services";

const currentFilePath = __filename;

export const getAllEmployeeController = async (req: Request, res: Response) => {
  try {
    const employeeData = await getAllEmployeesService();
    return res.status(StatusCodes.OK).json(employeeData);
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

export const getEmployeesIdController = async (req: Request, res: Response) => {
  try {
    const eid = req.params.eid as string;
    const getSpecificEmployee = await getEmployeesIdService(eid);
    return res.status(StatusCodes.OK).json(getSpecificEmployee);
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

export const putEmployeesIdController = async (req: Request, res: Response) => {
  try {
    const eid = req.params.eid as string;
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

    const updatedEmployee = await putEmployeesIdService({
      eid,
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
      user,
    });

    return res.status(StatusCodes.OK).json(updatedEmployee);
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

export const deleteEmployeesIdController = async (
  req: Request,
  res: Response,
) => {
  try {
    const eid = req.query.eid as string;
    await deleteEmployeesIdService(eid);
    return res.status(StatusCodes.NO_CONTENT).json();
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
