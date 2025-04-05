// routes/insightRoutes.ts
import express from "express";
import { getCaloriesInsight } from "../controllers/insight.controller";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/calories", authMiddleware, getCaloriesInsight);

export default router;
