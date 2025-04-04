import { Router } from "express";
import userRoutes from "./user.routes";

// Initialize routes
const router = Router();

// User routes
router.use("/user", userRoutes);

export default router;
