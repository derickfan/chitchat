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
    this._router.get('/', (_, res) => {
      res.status(200).json(this._controller.defaultMethod());
    })
  }

}

export = new UserRouter().router;