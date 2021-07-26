import dotenv from "dotenv";
import express from "express";
import Logger from "./middleware/Logger";
import MainRouter from "./router/MainRouter";

dotenv.config({
	path: ".env",
});

const PORT = process.env.APP_PORT || 5000;

const app = express();
const router = MainRouter;

app.use(Logger);
app.use("/api", router);

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
