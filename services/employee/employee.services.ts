import zod from "zod";
import employeeModel from "../../models/employee/employee.model";

const employeeInputValidation = zod.object({
  first_name: zod.string().trim(),
  last_name: zod.string().trim(),
  email: zod
    .email()
    .regex(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
    .trim(),
  position: zod.string().trim(),
  salary: zod.number().nonnegative(),
  date_of_joining: zod.date(),
  department: zod.string().trim(),
  user: zod.number(),
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

export const getEmployeesIdService = async (id: Number) => {
  if (!id) throw new Error("Invalid id");
  return await employeeModel.findById({ id });
};

export const putEmployeesIdService = async ({
  id,
  first_name,
  last_name,
  email,
  position,
  salary,
  date_of_joining,
  department,
  user,
}: {
  id?: number;
  first_name?: string;
  last_name?: string;
  email?: string;
  position?: string;
  salary?: number;
  date_of_joining?: Date;
  department?: string;
  user?: string;
}) => {
  if (!id) throw new Error("Invalid id");

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

  return await employeeModel.findByIdAndUpdate(
    { id },
    {
      first_name,
      last_name,
      email,
      position,
      salary,
      date_of_joining,
      department,
      user,
    },
  );
};

export const deleteEmployeesIdService = async (eid: Number) => {
  if (!eid) throw new Error("Invalid id");
  return await employeeModel.findByIdAndDelete({ eid });
};
