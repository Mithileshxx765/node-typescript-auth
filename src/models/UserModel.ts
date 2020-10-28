import { Schema, model, Model, Document } from "mongoose";

const userSchema = new Schema({
  email: String,
  password: String,
});

interface User extends Document {
  email: string;
  password: string;
}

const userModel: Model<User> = model("user", userSchema);

export default userModel;
