import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
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
  email = email.toLowerCase().trim();
  password = password.toLowerCase().trim();

  const validInput = userInputValidation.parse({ email, password });

  const hashedPassword = await bcrypt.hash(password, 10);

  if (!hashedPassword) throw new Error("Failed to hash password");

  if (!validInput) throw new Error("Invalid email or password");

  const findEmail = await userModel.find({ email });

  if (findEmail) throw new Error("Email already taken");

  const jwtToken = jwt.sign(
    { email, hashedPassword },
    process.env.JWT as string,
    {
      expiresIn: "1d",
    },
  );

  await userModel.create({ email, hashedPassword });

  return jwtToken;
};

export const postLoginUserService = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  email = email.toLowerCase().trim();
  password = password.toLowerCase().trim();

  const validInput = userInputValidation.parse({ email, password });

  if (!validInput) throw new Error("Invalid email or password");

  const user = await userModel.findOne({ email });

  if (!user) throw new Error("Cannot find user");

  const comparePassword = await bcrypt.compare(password, user.hashedPassword);

  if (!comparePassword) throw new Error("Failed to verify password");

  return user;
};
