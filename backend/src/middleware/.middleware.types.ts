import type { NextFunction, Request, Response } from "express";

interface User {
	id: string;
	name: string;
	email: string;
}

type AsyncRequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<any>;

export type { AsyncRequestHandler };
