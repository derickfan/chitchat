import { Router } from "express";
import UserRouter from "./UserRouter";
import ConversationRouter from "./ConversationRouter";

const router = Router();

router.get("/", (req, res) => {
	res.status(200).json({ data: "API Endpoint Online" });
});

router.use("/user", UserRouter);
router.use("/conversation", ConversationRouter);

export default router;