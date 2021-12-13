/* eslint-disable @typescript-eslint/no-namespace */
import { Router } from "express";
import * as UserController from "../controllers/UserController";
import passport from "../middlewares/authentication";

const router = Router();

declare global {
	namespace Express {
		interface User {
			id: string;
		}
	}
}

router.get("/", (req, res) => {
	res.status(200).json({ data: "User Router Online" });
});

router.get("/all", async (req, res) => {
	try {
		const users = req.user
			? await UserController.getAllOtherUsers(req.user.id) 
			: await UserController.getAllUsers();
		res.status(200).json({ data: users });
	} catch (error) {
		res.status(401).json({ error: error });
	}
});

router.post("/login", passport.authenticate("local"), (req, res) => {
	try {
		res.json(req.user);
	} catch (err) {
		res.status(401).json({ error: err });
	}
});

router.post("/logout", (req, res) => {
	try {
		req.logout();
		res.status(200).json("Successfully logged out");
	} catch (error) {
		res.status(404).json({ error });
	}
});

router.post("/signup", async (req, res, next) => {
	try {
		const user = await UserController.createUser(req.body);
		res.status(200).json({ data: user });
	} catch (error) {
		next(error);
	} 
});

router.get("/check", (req, res) => {
	if (req.user) {
		res.status(200).json(req.user);
	} else {
		res.status(400).json({ error: "Not authenticated" });
	}
});

export default router;