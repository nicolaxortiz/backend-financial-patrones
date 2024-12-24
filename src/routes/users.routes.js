import { Router } from "express";
import { usersController } from "../controllers/users.js";

const userRouter = Router();

userRouter.get("/getAll", usersController.get);
userRouter.post("/login", usersController.getbyEmailAndPassword);
userRouter.post("/create", usersController.create);

export default userRouter;
