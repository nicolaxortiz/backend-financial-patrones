import { Router } from "express";
import { codesController } from "../controllers/codes.js";

const codesRouter = Router();

codesRouter.post("/create", codesController.create);
codesRouter.post("/get", codesController.get);

export default codesRouter;
