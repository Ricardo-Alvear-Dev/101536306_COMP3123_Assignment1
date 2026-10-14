import zod from "zod";
import employeeModel from "../../models/employee/employee.model";

const employeeInputValidation = zod.object({
  first_name: zod.string().trim(),
  last_name: zod.string().trim(),
  email: zod.string().email().trim(),
  position: zod.string().trim(),
  salary: zod.number().nonnegative(),
  date_of_joining: zod.coerce.date(),
  department: zod.string().trim(),
  user: zod.string().trim(),
});

export const getAllEmployeesService = async () => {
  return await employeeModel.find();
};

export const postAllEmployeesService = async ({
  first_name,
  last_name,
  email,
  position,
  salary,
  date_of_joining,
  department,
  user,
}: {
  first_name: string;
  last_name: string;
  email: string;
  position: string;
  salary: number;
  date_of_joining: Date;
  department: string;
  user: string;
}) => {
  if (
    !first_name ||
    !last_name ||
    !email ||
    !position ||
    !salary ||
    !date_of_joining ||
    !department ||
    !user
  )
    throw new Error("Invalid format");

  const validInput = employeeInputValidation.parse({
    first_name,
    last_name,
    email,
    position,
    salary,
    date_of_joining,
    department,
    user,
  });

  if (!validInput) throw new Error("Zod failure: Invalid employee data");

  return await employeeModel.create({
    first_name,
    last_name,
    email,
    position,
    salary,
    date_of_joining,
    department,
    user,
  });
};

export const getEmployeesIdService = async (eid: string) => {
  if (!eid) throw new Error("Invalid id");
  return await employeeModel.findById(eid);
};

const employeeUpdateInputValidation = employeeInputValidation.partial();

export const putEmployeesIdService = async ({
  eid,
  first_name,
  last_name,
  email,
  position,
  salary,
  date_of_joining,
  department,
  user,
}: {
  eid?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  position?: string;
  salary?: number;
  date_of_joining?: Date;
  department?: string;
  user?: string;
}) => {
  if (!eid) throw new Error("Invalid id");

  const cleanId = eid.startsWith(":") ? eid.slice(1) : eid;

  const validInput = employeeUpdateInputValidation.parse({
    first_name,
    last_name,
    email,
    position,
    salary,
    date_of_joining,
    department,
    user,
  });

  if (!validInput) throw new Error("Zod failure: Invalid employee data");

  // Filter out any fields that came back as undefined so they don't overwrite MongoDB
  const filteredInput = Object.fromEntries(
    Object.entries(validInput).filter(([_, v]) => v !== undefined),
  );

  return await employeeModel.findByIdAndUpdate(
    cleanId,
    { $set: filteredInput },
    { new: true, runValidators: true },
  );
};

export const deleteEmployeesIdService = async (eid: string) => {
  if (!eid) throw new Error("Invalid id");
  return await employeeModel.findByIdAndDelete(eid);
};
