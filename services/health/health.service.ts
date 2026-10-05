import "dotenv/config";
import express from "express";
import mongoose from "mongoose";

const server = express();

export const healthStatusService = async () => {
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
};
