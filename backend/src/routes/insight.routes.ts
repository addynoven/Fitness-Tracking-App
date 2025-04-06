// routes/insightRoutes.ts
import express from "express";

import authMiddleware from "../middleware/authMiddleware";
import {
	getDailyCaloriesInsight,
	getMonthlyCaloriesInsight,
	getWeeklyCaloriesInsight,
	getYearlyCaloriesInsight,
} from "../controllers/insight/calories.controller";

import { getWeeklyWorkoutFrequency } from "../controllers/insight/workoutFrequency.controller";

const router = express.Router();

router.get("/calories/day", authMiddleware, getDailyCaloriesInsight);
router.get("/calories/week", authMiddleware, getWeeklyCaloriesInsight);
router.get("/calories/month", authMiddleware, getMonthlyCaloriesInsight);
router.get("/calories/year", authMiddleware, getYearlyCaloriesInsight);

router.get(
	"/workout-frequency/week",
	authMiddleware,
	getWeeklyWorkoutFrequency
);
export default router;
