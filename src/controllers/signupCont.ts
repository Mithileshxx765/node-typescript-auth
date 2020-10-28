import { Request, Response } from "express";
import userModel from "../models/UserModel";
import errorHandler from "../utils/errorHandler";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";

// Make the token

const makeToken = (id: string, email: string): string => {
  const token = sign({ id, email }, `${process.env.JWT_SECRET}`);
  return token;
};

// Signup Post controller

const signup_post = async (req: Request, res: Response): Promise<void> => {
  const user = await userModel.findOne({ email: req.body.email });

  const errors = errorHandler(req.body.email, req.body.password);

  if (user) {
    res.json({
      errors: {
        email: "Email already exists",
      },
    });
  } else if (errors) {
    res.json({
      errors,
    });
  } else {
    const hashedPassword = await hash(req.body.password, 12);

    try {
      const newUser = await userModel.create({
        email: req.body.email,
        password: hashedPassword,
      });

      if (newUser) {
        const token = makeToken(newUser._id, newUser.email);

        res.header({ token });

        res.json({
          user: {
            _id: newUser._id,
            email: newUser.email,
          },
        });
      } else {
        res.json({
          errors: {
            error: "Can't save user to DB",
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  }
};

export { signup_post };
