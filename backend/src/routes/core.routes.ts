import { Router } from "express";
import { homeController } from "../controllers/Home.controller";

const router = Router();

router.get("/", homeController);

export default router;
