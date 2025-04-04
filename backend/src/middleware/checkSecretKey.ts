import { NextFunction, Request, Response } from "express";
import config from "../config/config";

const SECRET_KEY = config.SECRET_KEY;

export const checkSecretKey = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const secretKey = req.headers["x-secret-key"];
  if (secretKey === SECRET_KEY) {
    next();
  } else {
    res.status(403).send("Forbidden");
  }
};
