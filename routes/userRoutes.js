import express from "express";
import { logIn, signUp, getUserList } from "../controllers/authController.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/login", logIn);

router.get("/list", getUserList);

export default router;
