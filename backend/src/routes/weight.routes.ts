// routes/weight.routes.ts
import express from "express";
import {
	addWeightEntry,
	getWeightHistory,
} from "../controllers/weight.controller";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.post("/", authMiddleware, addWeightEntry);
router.get("/history", authMiddleware, getWeightHistory);

export default router;
