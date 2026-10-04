import employeeModel from "../../models/employee/employee.model";

export const getAllEmployeesService = async () => {
  return await employeeModel.find();
};

export const postAllEmployeesService = () => {};

export const getEmployeesIdService = async (id: Number) => {
  return await employeeModel.findById({ id });
};

export const putEmployeesIdService = () => {};

export const deleteEmployeesIdService = async (id: Number) => {
  return await employeeModel.findByIdAndDelete({ id });
};
