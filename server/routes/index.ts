import { Router } from "express";
import UserRouter from "./UserRouter";
import ConversationRouter from "./ConversationRouter";
import * as UserController from "../controllers/UserController";
import * as ConversationController from "../controllers/ConversationController";
import * as MessageController from "../controllers/MessageController";

const router = Router();

router.get("/", (req, res) => {
	res.status(200).json({ data: "API Endpoint Online" });
});

router.post("/test", async (req, res) => {
	const user1 = await UserController.createUser({
		email: "derickfan@gmail.com",
		password: "password",
		username: "derickfan"
	});
	const user2 = await UserController.createUser({
		email: "johndoe@gmail.com",
		username: "johndoe",
		password: "password"
	});
	const conversation = await ConversationController.createConveration({
		creatorId: user1.id,
		usernames: [user2.username]
	})
	const message1 = await MessageController.createMessage({
		content: "Hello world",
		conversationId: conversation.id,
		username: user1.username
	});
	const message2 = await MessageController.createMessage({
		content: "Goodbye world",
		conversationId: conversation.id,
		username: user2.username
	});
	res.status(201).send("Successfully created test data");	
});

router.use("/user", UserRouter);
router.use("/conversation", ConversationRouter);

export default router;