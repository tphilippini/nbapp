"use strict";

import authErrorMidd from "./_src/middlewares/authError.js";
import authRouter from "./_src/auth/auth.route.js";
import bodyParser from "body-parser";
import cors from "cors";
import corsMidd from "./_src/middlewares/cors.js";
import dotenv from "dotenv";
import express from "express";
import expressJwt from "express-jwt";
import helmet from "helmet";
import matchRouter from "./_src/matches/match.route.js";
import mongoose from "mongoose";
import otherMidd from "./_src/middlewares/other.js";
import passport from "./_src/config/passport.js";
import userRouter from "./_src/users/user.route.js";

dotenv.config();

/**
 * Init
 */
const app = express();

// Global middlewares
app.use(helmet());
app.use(cors());

// CORS middleware
app.use(corsMidd);

// A simple middleware
app.use(otherMidd);

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
//         url: `api/users`,
//         methods: ["OPTIONS", "POST"],
//       },
//       `api`,
//       `api/auth`,
//       `api/auth/token`,
//       // `api/auth/google/token`,
//       // `api/auth/facebook/token`,
//       `api/auth/forgot`,
//       `api/auth/reset`,
//       `api/auth/confirm`,
//       `api/auth/validate`,
//       // `api/users/test`,
//     ],
//   })
// );

// Middleware to handle error from authentication
// app.use(authErrorMidd);

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
app.use("/api/users", userRouter);
app.use("/api/matches", matchRouter);
app.use("/api/auth", authRouter);

app.get("/api", (req, res) => {
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

export default app;
