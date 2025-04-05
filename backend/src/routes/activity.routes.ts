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

router.use(authMiddleware);

router.route("/").post(createActivity).get(getAllActivities);

router
	.route("/:id")
	.get(getActivityById)
	.put(updateActivity)
	.delete(deleteActivity);

export default router;
