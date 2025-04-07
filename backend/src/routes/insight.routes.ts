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
import { getWorkoutTypeBreakdown } from "../controllers/insight/typeBreakdown.controller";
import { getGoalProgressTracker } from "../controllers/insight/progressTracker.controller";
import { getBestDay } from "../controllers/insight/bestDay.controller";
import { workoutDurationBreakdown } from "../controllers/insight/workoutDurationBreakdown.controller";
import { streakInsight } from "../controllers/insight/streakInsight.controller";
import { getMonthlyComparison } from "../controllers/insight/monthlyComparison.controller";
import { weightTrend } from "../controllers/insight/weightTrend.controller";

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

router.get("/goal-progress", authMiddleware, getGoalProgressTracker);

router.get("/best-day", authMiddleware, getBestDay);

router.get(
	"/workout-duration-breakdown",
	authMiddleware,
	workoutDurationBreakdown
);

router.get(
	"/workout-duration-breakdown",
	authMiddleware,
	workoutDurationBreakdown
);

router.get("/streak", authMiddleware, streakInsight);

router.get("/compare/month", authMiddleware, getMonthlyComparison);
router.get("/Analytics/WeightTrend", authMiddleware, weightTrend);

export default router;
