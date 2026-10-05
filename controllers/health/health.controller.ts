import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { healthStatusService } from "../../services/health/health.service";

export const healthStatusController = async (req: Request, res: Response) => {
  try {
    await healthStatusService();
    return res
      .status(StatusCodes.OK)
      .json("Status: Every function is operating as expected.");
  } catch (error) {
    if (error instanceof Error)
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error.message);
  }
};
