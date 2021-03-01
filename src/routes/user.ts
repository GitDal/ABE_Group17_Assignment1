import express from "express";
import * as userController from "../controllers/userController"
const router = express.Router();

router.get('/giveClaim:userId', userController.giveClaim);
router.get('/giveClaims:userId', userController.giveClaims);

export default router;