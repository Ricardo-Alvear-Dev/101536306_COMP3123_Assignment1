import zod from "zod";
import userModel from "../../models/user/user.model";

const userInputValidation = zod.object({
  email: zod.email().min(3).trim().toLowerCase(),
  password: zod.string().min(3).trim().toLowerCase(),
});

export const postSignUpUserService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  if (!email || !password) throw new Error("Invalid email or password");

  const validInput = userInputValidation.parse({ email, password });

  if (!validInput) throw new Error("Invalid email or password");

  return await userModel.create({ email, password });
};

export const postLoginUserService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  if (!email || !password) throw new Error("Invalid email or password");

  const validInput = userInputValidation.parse({ email, password });

  if (!validInput) throw new Error("Invalid email or password");

  return await userModel.find({ email, password });
};
