import express, { Request, Response } from "express";
import { config } from "dotenv";
import authRoutes from "./routes/authRoutes";
import { connect } from "mongoose";

config();

const PORT = process.env.PORT || 3000;

// Connect to DB

connect(
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@rest.fbfz2.mongodb.net/${process.env.DB_DATABASE}?retryWrites=true&w=majority`,
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: true }
)
  .then(() => {
    console.log("Connected to DB");
    app.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  })
  .catch((err: Error): void => {
    console.log(err);
  });

// Initializing express

const app = express();

// Middlewares

app.use(express.json());

app.use(authRoutes);
