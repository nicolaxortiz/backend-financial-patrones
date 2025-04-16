import express from "express";
import cors from "cors";
import userRouter from "./src/routes/users.routes.js";
import accountRouter from "./src/routes/accounts.routes.js";
import movesRouter from "./src/routes/moves.routes.js";
import codesRouter from "./src/routes/codes.routes.js";

const app = express();

const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors(corsOptions));
app.use("/api/users", userRouter);
app.use("/api/accounts", accountRouter);
app.use("/api/moves", movesRouter);
app.use("/api/codes", codesRouter);

app.listen(3000);
console.log("server on port ", 3000);
