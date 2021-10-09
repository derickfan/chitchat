import { Router } from "express";
import * as UserController from "../controllers/UserController";

const router = Router();

router.get("/", (req, res) => {
	res.status(200).json({ data: "User Router Online" });
});

router.post("signup", async (req, res, next) => {
	try {
		const user = await UserController.createUser(req.body);
		res.status(200).json({ data: user });
	} catch (error) {
		next(error);
	} 
});

export default router;