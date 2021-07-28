import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Logger from "./middleware/Logger";
import MainRouter from "./router/MainRouter";

const db = require("./models");

dotenv.config({
	path: ".env",
});

db.sequelize.sync({ force: true });

const PORT = process.env.APP_PORT || 5000;

const app = express();
const router = MainRouter;

const options: cors.CorsOptions = {
  origin: "http://localhost:3000"
};

app.use(Logger);
app.use(cors(options));
app.use(express.json());
app.use("/api", router);

app.listen(PORT, () => console.log(`Server is running on PORT:${PORT}`));
