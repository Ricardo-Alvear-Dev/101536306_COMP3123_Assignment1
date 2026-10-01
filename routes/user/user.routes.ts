import express from "express";

const userRouter = express.Router();

userRouter.route("/signup").post();
userRouter.route("/login").post();

export default userRouter;
