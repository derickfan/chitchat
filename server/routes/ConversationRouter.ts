import { Router } from "express";
import * as ConversationController from "../controllers/ConversationController";

const router = Router();

router.get("/", (req, res) => {
	res.status(200).json({ data: "User Router Online" });
});

router.get("/all", async (req, res, next) => {
	try {
		const conversations =
			await ConversationController.getAllConversations();
		res.status(200).json({ data: conversations });
	} catch (error) {
		next(error);
	}
});

router.post("/create", async (req, res, next) => {
	try {
		const conversation = await ConversationController.createConveration(
			req.body
		);
		res.status(201).json({ data: conversation });
	} catch (error) {
		next(error);
	}
});

router.post("/getUser", async (req, res, next) => {
	try {
		const conversations = await ConversationController.getUserConversations(
			req.body.userId
		);
		res.status(200).json({ data: conversations });
	} catch (error) {
		next(error);
	}
});

export default router;
