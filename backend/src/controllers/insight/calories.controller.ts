// controllers/insight/calories.controller.ts
import asyncHandler from "../../middleware/asyncHandler";
import type { Request, Response } from "express";
import {
	getWeeklyCaloriesInsightService,
	getDailyCaloriesInsightService,
	getYearlyCaloriesInsightService,
	getMonthlyCaloriesInsightService,
} from "../../services/insight.service";

export const getWeeklyCaloriesInsight = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user!.id as string;
		const date = req.query.date
			? new Date(req.query.date as string)
			: new Date();
		const insight = await getWeeklyCaloriesInsightService(userId, date);
		res.json(insight);
	}
);

export const getDailyCaloriesInsight = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user!.id as string;
		const date = req.query.date
			? new Date(req.query.date as string)
			: new Date();
		const insight = await getDailyCaloriesInsightService(userId, date);
		res.json(insight);
	}
);

export const getMonthlyCaloriesInsight = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user!.id as string;
		const date = req.query.date
			? new Date(req.query.date as string)
			: new Date();
		const result = await getMonthlyCaloriesInsightService(userId, date);
		res.json(result);
	}
);

export const getYearlyCaloriesInsight = asyncHandler(
	async (req: Request, res: Response) => {
		const userId = req.user!.id as string;
		const date = req.query.date
			? new Date(req.query.date as string)
			: new Date();
		const result = await getYearlyCaloriesInsightService(userId, date);
		res.json(result);
	}
);
