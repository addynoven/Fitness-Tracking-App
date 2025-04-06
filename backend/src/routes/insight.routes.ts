// routes/insightRoutes.ts
import express from "express";

import authMiddleware from "../middleware/authMiddleware";
import {
	getDailyCaloriesInsight,
	getMonthlyCaloriesInsight,
	getWeeklyCaloriesInsight,
	getYearlyCaloriesInsight,
} from "../controllers/insight/calories.controller";

import {
	getDailyWorkoutFrequency,
	getMonthlyWorkoutFrequency,
	getWeeklyWorkoutFrequency,
} from "../controllers/insight/frequency.controller";
import { getWorkoutTypeBreakdown } from "../controllers/insight/TypeBreakdown.controller";

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

router.get("/workout-frequency/day", authMiddleware, getDailyWorkoutFrequency);

router.get(
	"/workout-frequency/month",
	authMiddleware,
	getMonthlyWorkoutFrequency
);

router.get("/workout-type-breakdown", authMiddleware, getWorkoutTypeBreakdown);

export default router;
