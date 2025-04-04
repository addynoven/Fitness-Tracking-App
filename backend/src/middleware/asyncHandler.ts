import type { RequestHandler } from "express";
import type { AsyncRequestHandler } from "./.middleware.types";

const asyncHandler = (fn: AsyncRequestHandler): RequestHandler => {
	return (req, res, next) => {
		Promise.resolve(fn(req, res, next)).catch(next);
	};
};

export default asyncHandler;
