import { Router } from "express";
import userRoutes from "./user.routes";
import activityRoutes from "./activity.routes";
import coreRoutes from "./core.routes";
import insightRoutes from "./insight.routes";
import goalRoutes from "./goal.routes";
import weightRoutes from "./weight.routes";
// Initialize routes
const router = Router();

// User routes
router.use("/", coreRoutes);
router.use("/user", userRoutes);
router.use("/activity", activityRoutes);
router.use("/insight", insightRoutes);
router.use("/goals", goalRoutes);
router.use("/weight", weightRoutes);

export default router;
