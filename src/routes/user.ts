import express from "express";
import * as userController from "../controllers/userController";
import authorize from "./authorize";
import CLAIMS from "../constants";
const router = express.Router();

// router.post('/giveClaims', userController.giveClaims);
router.post('/giveClaims', authorize([CLAIMS.ADMIN]), userController.giveClaims);

export default router;