// routes/insightRoutes.ts
import express from "express";
import { getWeeklyCaloriesInsight } from "../controllers/insight.controller";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/calories", authMiddleware, getWeeklyCaloriesInsight);

export default router;
