import express from "express";
import {
  postLoginUserController,
  postSignUpUserController,
} from "../../controllers/user/user.controller";
import { JWTTokenCreation } from "../../utils/JWTTokenCreation";
import { JWTTokenVerification } from "../../utils/JWTTokenVerification";

const userRouter = express.Router();

userRouter.route("/signup").post(JWTTokenCreation, postSignUpUserController);
userRouter.route("/login").post(JWTTokenVerification, postLoginUserController);

export default userRouter;
