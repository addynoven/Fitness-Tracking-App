import type { NextFunction, Request, Response } from "express";

type AsyncRequestHandler = (
	req: Request,
	res: Response,
	next: NextFunction
) => Promise<any>;

export type { AsyncRequestHandler };
