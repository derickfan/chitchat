import { Router } from "express";
import UserRouter from "./UserRouter";

const router = Router();

router.get("/", (req, res) => {
	res.status(200).json({ data: "API Endpoint Online" });
});

router.use("/user", UserRouter);

export default router;