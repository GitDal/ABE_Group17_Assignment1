import express from "express";
import * as userController from "../controllers/userController";
import authorize from "./authorize";
import claims from "../claims";
const router = express.Router();

// router.post('/giveClaims', userController.giveClaims);
router.post('/giveClaims', authorize([claims.ADMIN]), userController.giveClaims);

export default router;