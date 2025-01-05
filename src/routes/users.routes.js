import { Router } from "express";
import { usersController } from "../controllers/users.js";

const userRouter = Router();

userRouter.get("/getAll", usersController.get);
userRouter.post("/login", usersController.getbyEmailAndPassword);
userRouter.post("/forgot", usersController.getbyEmail)
userRouter.post("/create", usersController.create);
userRouter.put("/updateStatus", usersController.updateStatus);

export default userRouter;
