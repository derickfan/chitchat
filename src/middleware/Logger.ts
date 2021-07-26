import { Request, Response, NextFunction } from "express";

const Logger = (req: Request, res: Response, next: NextFunction) => {
	console.log(
		`[${getformattedDate()}] ${req.method}:${req.url} ${res.statusCode}`
	);
	next();
};

const getformattedDate = () => {
	const now = new Date();
	const formattedDate = now.toISOString().replace(/.\d+Z$/g, "Z");
	return formattedDate;
};

export default Logger;
