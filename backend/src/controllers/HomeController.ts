import type { NextFunction, Request, Response } from "express";
import asyncHandler from "../middleware/asyncHandler";
import { getHomeMessage } from "../services/home.service";

export const homeController = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		console.log("homeController called");
		const message = await getHomeMessage();
		res.json({ message });
	}
);
