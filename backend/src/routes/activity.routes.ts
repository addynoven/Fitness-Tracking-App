import express from "express";
import {
	createActivity,
	getAllActivities,
	getActivityById,
	updateActivity,
	deleteActivity,
} from "../controllers/activity.controller";
import authMiddleware from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authMiddleware, getAllActivities);
router.post("/", authMiddleware, createActivity);

router.get("/:id", authMiddleware, getActivityById);
router.put("/:id", authMiddleware, updateActivity);
router.delete("/:id", authMiddleware, deleteActivity);

export default router;
