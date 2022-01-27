import express from "express";
import path from "path";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import db from "./models/index";
import router from "./routes";
import * as ConversationController from "./controllers/ConversationController";
import * as MessageController from "./controllers/MessageController";
import expressSession from "express-session";
import passport from "./middlewares/authentication";

db.sync({
	force: true
}).then(async () => {
	console.log("Connected to the database");
});

const PORT = process.env.PORT || 5000;

const app = express();

const http = createServer(app);

const io = new Server(http, {
	cors: {
		origin: "http://localhost:3000",
	},
});

const clients = {};

io.on("connection", (socket: Socket) => {
	socket.on("login", async (username) => {
		clients[socket.id] = { username: username, socket: socket };
		const conversations =
			await ConversationController.getUserConversationsByUsername(
				username
			);
		conversations.forEach((conversation) => {
			socket.join(conversation.id);
		});
	});

	socket.on(
		"createConversation",
		async (conversationData: {
			name: string;
			creatorId: string;
			usernames: string[];
		}) => {
			const newConversation =
				await ConversationController.createConveration(
					conversationData
				);
			const users = await newConversation.getUsers();
			const usernames = users.map((user) => user.username);
			Object.keys(clients).forEach(socketID => {
				if (usernames.includes(clients[socketID].username)) {
					clients[socketID].socket.join(newConversation.id);
					io.to(socketID).emit("newConversation");
				}
			});
		}
	);

	socket.on("message", async (message) => {
		const newMessage = await MessageController.createMessage(message);
		io.to(message.conversationId).emit("message", newMessage);
	});

	socket.on("logout", () => {
		delete clients[socket.id];
	});

	socket.on("disconnect", () => {
		delete clients[socket.id];
	});
});

// setInterval(() => {
// 	console.log("==================================================");
// 	console.log(
// 		Object.keys(clients).length > 0 ? clients : "No users connected"
// 	);
// 	console.log("==================================================");
// }, 5000);

app.use(
	expressSession({
		secret: "SECRET",
		resave: false,
		saveUninitialized: false,
		cookie: {
			secure: false,
			maxAge: 1000 * 60 * 60,
		},
	})
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("dist/client"));

app.use(express.json());
app.use("/api", router);

http.listen(PORT, () => {
	console.log(`Server listening on PORT:${PORT}`);
});

app.get("/", (req, res) => {
	res.sendFile(path.resolve(__dirname, "client", "index.html"));
});
