import type { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/error";
import config from "../config/config";

const errorHandler = (
	err: any,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const statusCode: number =
		err instanceof AppError ? Number(err.statusCode) : 500;
	const message =
		err instanceof AppError ? err.message : "Internal Server Error";

	if (config.NODE_ENV !== "production") {
		console.error("Error:", err);
	}

	res.status(statusCode).json({
		message,
		stack: config.NODE_ENV === "production" ? null : err.stack,
	});
};

export default errorHandler;
