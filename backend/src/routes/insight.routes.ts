// routes/insightRoutes.ts
import express from "express";

import authMiddleware from "../middleware/authMiddleware";
import {
	getDailyCaloriesInsight,
	getMonthlyCaloriesInsight,
	getWeeklyCaloriesInsight,
	getYearlyCaloriesInsight,
} from "../controllers/insight.controller";

const router = express.Router();

router.get("/calories/day", authMiddleware, getDailyCaloriesInsight);
router.get("/calories/week", authMiddleware, getWeeklyCaloriesInsight);
router.get("/calories/month", authMiddleware, getMonthlyCaloriesInsight);
router.get("/calories/year", authMiddleware, getYearlyCaloriesInsight);

export default router;
