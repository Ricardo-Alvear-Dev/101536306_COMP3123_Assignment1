import express from "express";
import {
  deleteEmployeesIdController,
  getAllEmployeeController,
  getEmployeesIdController,
  postAllEmployeesController,
  putEmployeesIdController,
} from "../../controllers/employee/employee.controllers";

const employeeRouter = express.Router();

employeeRouter
  .route("/employees")
  .get(getAllEmployeeController)
  .post(postAllEmployeesController)
  .delete(deleteEmployeesIdController);
employeeRouter
  .route("/employees/:eid")
  .get(getEmployeesIdController)
  .put(putEmployeesIdController);

export default employeeRouter;
