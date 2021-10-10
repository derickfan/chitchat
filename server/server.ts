import express from "express";
import path from "path";
import { createServer } from "http";
import { Server } from "../node_modules/socket.io/dist";
import db from "./models/index";
import User from "./models/User";
import Conversation from "./models/Conversation";
import Message from "./models/Message";
import router from "./routes";

db.sync().then(() => {
	console.log("Connected to the database");
});

User.sync();
Conversation.sync();
Message.sync();


const PORT = process.env.PORT || 5000;

const app = express();

const http = createServer(app);

const io = new Server(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

app.use(express.static("../client/build"));

app.use("/api", router);

http.listen(PORT, () => {
	console.log(`Server listening on PORT:${PORT}`);
});

app.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
});