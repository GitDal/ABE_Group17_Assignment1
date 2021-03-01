import express from "express";
import * as indexController from "../controllers/indexController";

const router = express.Router();

router.get('/', indexController.index);
router.post('/login', indexController.login);
router.post('/register', indexController.register);

export default router;