import { ObjectId } from "mongodb";
import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    first_name: { type: String, required: true, trim: true },
    last_name: { type: String, required: true, trim: true },
    email: {
      unique: true,
      type: String,
      required: true,
      trim: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    position: { type: String, required: true, trim: true },
    salary: { type: Number, required: true, trim: true },
    date_of_joining: { type: Date },
    department: { type: String, required: true, trim: true },
    user: { type: ObjectId, required: true },
  },
  { timestamps: true },
);

const employeeModel = mongoose.model("employeeSchema", employeeSchema);
export default employeeModel;
