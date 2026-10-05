import express from "express";
import { healthStatusController } from "../../controllers/health/health.controller";

const healthRouter = express.Router();

healthRouter.route("/").get(healthStatusController);

export default healthRouter;
