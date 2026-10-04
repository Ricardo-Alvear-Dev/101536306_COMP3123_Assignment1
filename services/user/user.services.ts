import userModel from "../../models/user/user.model";

export const postSignUpUserService = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  return await userModel.create({ username, email, password });
};

export const postLoginUserService = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  return await userModel.find({ username, email, password });
};
