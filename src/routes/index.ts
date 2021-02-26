import express from "express";
import * as indexController from "../controllers/indexController";

const router = express.Router();

router.get('/', indexController.index);
// router.get('/login', indexController.login);

export default router;