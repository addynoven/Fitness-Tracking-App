import { Router } from "express";
import userRoutes from "./user.routes";
import activityRoutes from "./activity.routes";
import coreRoutes from "./core.routes";
import insightRoutes from "./insight.routes";
// Initialize routes
const router = Router();

// User routes
router.use("/", coreRoutes);
router.use("/user", userRoutes);
router.use("/activity", activityRoutes);
router.use("/insight", insightRoutes);

export default router;
