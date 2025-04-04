import type { Request, Response, NextFunction } from "express";
import asyncHandler from "./asyncHandler";
import { AppError } from "../utils/error";
import { verifyToken } from "../utils/auth";

export const isGuest = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		const accessToken = req.cookies["accessToken"];

		if (accessToken) {
			const { isValid } = await verifyToken(accessToken);
			if (isValid) throw new AppError("You are already logged in", 403, true);
		}

		next();
	}
);
