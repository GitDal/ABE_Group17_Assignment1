import express from "express";
import * as indexController from "../controllers/indexController";

const router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *    summary: Home-page.
 *    description: see homepage... 
*/
router.get('/', indexController.index);

/**
 * @swagger
 * /login:
 *  post:
 *    summary: User Login.
 *    description: login... 
*/
router.post('/login', indexController.login);

/**
 * @swagger
 * /register:
 *  post:
 *    summary: Register a new User.
 *    description: register... 
*/
router.post('/register', indexController.register);

export default router;