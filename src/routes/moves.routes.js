import { Router } from "express";
import { movesController } from "../controllers/moves.js";

const movesRouter = Router();

movesRouter.get("/get/:id/:filter/:offset", movesController.getByAccountId);
movesRouter.get("/getByName/:id/:name/:offset", movesController.getByName);
movesRouter.post("/create", movesController.create);
movesRouter.put("/update/:id", movesController.update);
movesRouter.delete("/delete/:id", movesController.delete);

export default movesRouter;
