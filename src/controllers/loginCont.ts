import { Request, Response } from "express";
import errorHandler from "../utils/errorHandler";
import { sign } from "jsonwebtoken";
import checkErrors from "../utils/authErrorHandler";
import userModel from "../models/UserModel";

// Make the token

const makeToken = (id: string, email: string): string => {
  const token = sign({ id, email }, `${process.env.JWT_SECRET}`);
  return token;
};

const login_post = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // User validation error checking

  const errors = errorHandler(email, password);

  if (errors) {
    res.json({
      errors,
    });
  } else {
    // Auth error checking

    const authErrors = await checkErrors(email, password);

    if (authErrors) {
      res.json({
        errors: authErrors,
      });
    } else {
      const userInDb = await userModel.findOne({ email });

      if (userInDb) {
        const token = makeToken(userInDb._id, userInDb.email);

        res.header({ token });

        res.json({
          user: {
            _id: userInDb?._id,
            email: userInDb?.email,
          },
        });
      }
    }
  }
};

export { login_post };
