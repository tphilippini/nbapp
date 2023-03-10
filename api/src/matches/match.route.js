"use strict";

import { Router } from "express";
import matchController from "./match.controller.js";
import { regex } from "../helpers/validator.js";

const matchRouter = Router();

matchRouter.get(
  `/:startDate(${regex.date.yyyymmdd})`,
  matchController.matchByDate
);

export default matchRouter;
