import { Router } from "express";
import UserController from "../controllers/UserController";

class UserRouter {
	private _router = Router();
	private _controller = UserController;

	get router() {
		return this._router;
	}

	constructor() {
		this._configure();
	}

	private _configure() {
		this._router.get("/", async (_, res) => {
      const users = await this._controller.getUser();
			res.status(200).json(users);
		});

		this._router.post("/login", async (req, res) => {
			res.send("Login Successful");
		});

		this._router.post("/logout", (req, res) => {
			res.send("Logout Successful");
		});

		this._router.post("/signup", (req, res) => {
			const result = this._controller.createUser(req.body);
      res.send(result);
		});
	}
}

export = new UserRouter().router;
