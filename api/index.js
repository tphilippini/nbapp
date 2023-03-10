"use strict";

import authRouter from "./src/auth/auth.route.js";
import bodyParser from "body-parser";
import cors from "cors";
import corsMidd from "./src/middlewares/cors.js";
import dotenv from "dotenv";
import express from "express";
import helmet from "helmet";
import matchRouter from "./src/matches/match.route.js";
import mongoose from "mongoose";
import otherMidd from "./src/middlewares/other.js";
import passport from "./src/config/passport.js";
import userRouter from "./src/users/user.route.js";
// import authErrorMidd from './src/middlewares/authError';

dotenv.config();

/**
 * Init
 */
const app = express();

// Global middlewares
app.use(helmet());
app.use(cors());

if (process.env.NODE_ENV == "production") {
  // CORS middleware
  app.use(corsMidd);

  // A simple middleware
  app.use(otherMidd);
}

// Parse input values in JSON format
app.use(bodyParser.json());
// Parse from x-www-form-urlencoded, which is the universal content type
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Password auth
app.use(passport.initialize());

// Auth middleware
// app.use(
//   expressJwt({
//     secret: process.env.API_ACCESS_TOKEN_SECRET,
//   }).unless({
//     path: [
//       {
//         url: `${process.env.API_VERSION}/users`,
//         methods: ['OPTIONS', 'POST'],
//       },
//       `${process.env.API_VERSION}/auth`,
//       `${process.env.API_VERSION}/auth/token`,
//       // `${process.env.API_VERSION}/auth/google/token`,
//       // `${process.env.API_VERSION}/auth/facebook/token`,
//       `${process.env.API_VERSION}/auth/forgot`,
//       `${process.env.API_VERSION}/auth/reset`,
//       `${process.env.API_VERSION}/auth/validate`,
//       // `${process.env.API_VERSION}/users/test`,
//     ],
//   })
// );

/**
 * Connecting database
 */
mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL);

const { connection } = mongoose;

connection.on("error", () => {
  console.log(`Connection error to the database ${process.env.DB_NAME}`);
});

connection.once("open", () => {
  console.log(`Connecting to the database ${process.env.DB_NAME}`);
});

/**
 * Bootstrap
 */
app.use("/users", userRouter);
app.use("/matches", matchRouter);
app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.status(200);
  res.json({ status: 200, message: "ok" });
});

app.use((req, res) => {
  res.status(404).json({ status: 404, code: "not_found", error: "Not Found" });
});

/**
 * Listen
 */
const PORT = process.env.PORT || 1337;
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
