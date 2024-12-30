import { Router } from "express";
import { accountsController } from "../controllers/accounts.js";

const accountRouter = Router();

accountRouter.get("/get/:id", accountsController.getById);
accountRouter.post("/create", accountsController.create);
accountRouter.put("/update/:id", accountsController.update);
accountRouter.delete("/delete/:id", accountsController.delete);

export default accountRouter;
