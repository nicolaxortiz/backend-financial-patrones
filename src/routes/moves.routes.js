import { Router } from "express";
import { movesController } from "../controllers/moves.js";

const movesRouter = Router();

movesRouter.get("/get/:id/:filter", movesController.getByAccountId);
movesRouter.post("/create", movesController.create);

export default movesRouter;
