import type { NextFunction, Request, Response } from "express";

// Extend the Request interface to include the 'user' property
declare global {
	namespace Express {
		interface Request {
			user?: any;
		}
	}
}
import { auth } from "../utils/auth";
import asyncHandler from "./asyncHandler";

const authMiddleware = asyncHandler(
	async (req: Request, res: Response, next: NextFunction) => {
		try {
			const headers = convertIncomingToHeaders(req.headers);
			const session = await auth.api.getSession({ headers });

			if (!session || !session.user) {
				return res.status(401).json({ error: "Unauthorized" });
			}

			req.user = session.user;
			next();
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : "Unknown error";
			res
				.status(500)
				.json({ error: "Internal Server Error", details: errorMessage });
		}
	}
);

function convertIncomingToHeaders(
	incoming: Record<string, string | string[] | undefined>
): Headers {
	const headers = new Headers();
	Object.entries(incoming).forEach(([key, value]) => {
		if (value) {
			headers.append(key, Array.isArray(value) ? value.join(",") : value);
		}
	});
	return headers;
}
export default authMiddleware;
