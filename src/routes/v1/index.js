import express from "express";
import { HealthCheckController } from "../../controllers/index.js";
import storyRoutes from "./story.routes.js";
import userRoutes from "./user.routes.js";

const router = express.Router();

router.use("/user", userRoutes);
router.use("/story", storyRoutes);
router.get("/healthcheck", HealthCheckController.healthcheck);

export default router;
