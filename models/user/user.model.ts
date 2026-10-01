import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { unique: true, type: String, required: true, trim: true },
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
    password: {
      type: String,
      minLength: [5, "Please create a password longer than the length of 5"],
      required: true,
      trim: true,
      select: false,
    },
  },
  { timestamps: true },
);

const userModel = mongoose.model("userSchema", userSchema);
export default userModel;
