import "dotenv/config";
import express from "express";
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoose from "mongoose";
import employeeRouter from "./routes/employee/employee.routes.ts";
import healthRouter from "./routes/health/health.routes.ts";
import userRouter from "./routes/user/user.routes.ts";

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  message: "Too many requests received",
});

const server = express();

server.use(express.json());
server.use(helmet() as unknown as express.RequestHandler);
server.use(limiter);

server.use("/api/v1/user", userRouter);
server.use("/api/v1/emp", employeeRouter);
server.use("/health", healthRouter);

const setUpServer = async () => {
  try {
    const dbConnection = await mongoose.connect(
      process.env.MONGODB_URI as string,
    );

    const serverConnection = server.listen(process.env.PORT || 3000);

    dbConnection
      ? console.log("Connected to mongodb")
      : new Error("Something went wrong with the database connection");

    serverConnection
      ? console.log(
          `The server has connected to PORT: ${process.env.PORT || 3000}`,
        )
      : new Error("Something went wrong with the server connection");
  } catch (error) {
    if (error instanceof Error) return console.error(error);
  }
};
setUpServer();
