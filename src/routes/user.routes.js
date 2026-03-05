import { Router } from "express";
import userController from "../controllers/user.controller.js";

const userRoutes = Router();

userRoutes.get("/", userController.list);
userRoutes.post("/", userController.create);
userRoutes.put("/:id", userController.update);
userRoutes.delete("/:id", userController.remove);

export default userRoutes;
