// controllers/weeklyInsightController.ts
import asyncHandler from "../middleware/asyncHandler";
import type { Request, Response } from "express";
import {
	getWeeklyCaloriesInsightService,
	getDailyCaloriesInsightService,
	getYearlyCaloriesInsightService,
	getMonthlyCaloriesInsightService,
} from "../services/insight.service";

export const getWeeklyCaloriesInsight = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user!.id as string;
		const insight = await getWeeklyCaloriesInsightService(userId);
		res.json(insight);
	}
);

export const getDailyCaloriesInsight = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user!.id as string;
		const insight = await getDailyCaloriesInsightService(userId);
		res.json(insight);
	}
);

export const getMonthlyCaloriesInsight = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user!.id as string;
		const result = await getMonthlyCaloriesInsightService(userId);
		res.json(result);
	}
);

export const getYearlyCaloriesInsight = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user!.id as string;
		const result = await getYearlyCaloriesInsightService(userId);
		res.json(result);
	}
);
