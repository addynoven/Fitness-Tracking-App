import type { Request } from "express";

export const baseUrlMaker = (req: Request) => {
	return `${req.protocol}://${req.get("host")}`;
};
