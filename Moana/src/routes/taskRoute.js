import express from "express";
import { taskController } from "../controller/authController.js";

const router = express.Router();

router.get("/tasklist", tasklist);

export default router;