import { compare } from "bcrypt";
import userModel from "../models/UserModel";

interface CheckErrors {
  email: string;
  password: string;
}

const checkErrors = async (
  email: string,
  password: string
): Promise<CheckErrors | null> => {
  let errors = {
    email: "",
    password: "",
  };

  const user = await userModel.findOne({ email });
  if (user) {
    const isSuccess = await compare(password, user.password);
    if (!isSuccess) {
      errors.password = "Password did not match";
      return errors;
    } else {
      return null;
    }
  } else {
    errors.email = "No user exist with this email";
    return errors;
  }
};

export default checkErrors;
