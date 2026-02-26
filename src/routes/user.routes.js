import { Router } from "express";
import userController from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/", userController.list);

export default userRoutes;
