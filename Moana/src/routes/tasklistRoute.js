import express from "express";
import { register, login } from "../controller/authController.js";

const router = express.Router();

router.get("/tasklist", tasklist);

export default router;