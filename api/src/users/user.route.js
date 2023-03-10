"use strict";

import { Router } from "express";
import { regex } from "../helpers/validator.js";
import userController from "./user.controller.js";
import userGuardMidd from "../middlewares/userGuard.js";

const userRouter = Router();

// Middlewares dedicated to these routes here
userRouter.post("/", userController.post);
// userRouter.patch(`/:uuid(${regex.uuid})`, userGuardMidd, userController.patch);
// userRouter.get("/current", userGuardMidd, userController.getCurrent);
// userRouter.post("/:method/link", userGuardMidd, userController.linkAccount);
// userRouter.post("/:method/unlink", userGuardMidd, userController.unlinkAccount);
// userRouter.get('/', userGuardMidd, userController.getAll);
// userRouter.get("/test", userController.getAll);

export default userRouter;
