import express from "express";
import { setOrUpdateGoal } from "../controllers/goal.controller";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.put("/", authMiddleware, setOrUpdateGoal);

export default router;
