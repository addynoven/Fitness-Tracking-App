import type { NextFunction, Request, Response } from "express";
import asyncHandler from "./asyncHandler";
import { AppError } from "../utils/error";

const notFound = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		next(new AppError(`Not Found - ${req.originalUrl}`, 404, true));
	}
);

export default notFound;
