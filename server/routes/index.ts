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
	});
	await MessageController.createMessage({
		content: "Hello world",
		conversationId: conversation.id,
		username: user1.username
	});
	await MessageController.createMessage({
		content: "Goodbye world",
		conversationId: conversation.id,
		username: user2.username
	});
	await MessageController.createMessage({
		content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Odio ut sem nulla pharetra diam sit amet. Egestas egestas fringilla phasellus faucibus scelerisque eleifend donec pretium vulputate. Volutpat blandit aliquam etiam erat velit scelerisque in dictum. Accumsan lacus vel facilisis volutpat est velit egestas dui. Augue eget arcu dictum varius duis at consectetur. Ut consequat semper viverra nam libero justo laoreet sit. Proin sed libero enim sed faucibus turpis in eu mi. In massa tempor nec feugiat. Erat pellentesque adipiscing commodo elit at imperdiet dui accumsan. Consectetur purus ut faucibus pulvinar elementum integer enim neque. Tellus in hac habitasse platea dictumst vestibulum rhoncus. Volutpat blandit aliquam etiam erat velit scelerisque in dictum. Diam quam nulla porttitor massa. Tempus iaculis urna id volutpat lacus laoreet non curabitur. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum fusce. Nisi scelerisque eu ultrices vitae. Quis eleifend quam adipiscing vitae proin sagittis nisl. Rutrum tellus pellentesque eu tincidunt tortor aliquam.",
		conversationId: conversation.id,
		username: user2.username
	});
	await MessageController.createMessage({
		content: "Facilisis sed odio morbi quis commodo odio aenean sed. Ac auctor augue mauris augue. Diam phasellus vestibulum lorem sed risus ultricies tristique. Hac habitasse platea dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Placerat in egestas erat imperdiet sed. Faucibus vitae aliquet nec ullamcorper. At in tellus integer feugiat scelerisque. Posuere sollicitudin aliquam ultrices sagittis orci a scelerisque. Orci dapibus ultrices in iaculis. Tristique senectus et netus et. Mattis rhoncus urna neque viverra justo. Tellus orci ac auctor augue mauris augue. Et ligula ullamcorper malesuada proin libero nunc consequat. Magna fermentum iaculis eu non diam phasellus vestibulum.",
		conversationId: conversation.id,
		username: user1.username
	});
	await MessageController.createMessage({
		content: "Proin nibh nisl condimentum id venenatis a condimentum vitae sapien.",
		conversationId: conversation.id,
		username: user1.username
	});
	
	res.status(201).send("Successfully created test data");	
});

router.use("/user", UserRouter);
router.use("/conversation", ConversationRouter);

export default router;