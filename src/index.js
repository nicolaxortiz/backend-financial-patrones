import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import userRouter from "./routes/users.routes.js";
import accountRouter from "./routes/accounts.routes.js";
import movesRouter from "./routes/moves.routes.js";

const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));
app.use("/api/users", userRouter);
app.use("/api/accounts", accountRouter);
app.use("/api/moves", movesRouter);

app.listen(3000);
console.log("server on port ", 3000);
