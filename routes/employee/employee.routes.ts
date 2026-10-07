import express from "express";

const employeeRouter = express.Router();

employeeRouter.route("/employees").get();
employeeRouter.route("/employees").post();
employeeRouter.route("/employees/:eid").get();
employeeRouter.route("/employees/:eid").put();
employeeRouter.route("/employees").delete();

export default employeeRouter;
