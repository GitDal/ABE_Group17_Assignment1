import express from "express";
import * as indexController from "../controllers/indexController";

const router = express.Router();

/**
 * @swagger
 * /login:
 *  post:
 *    summary: User Login.
 *    description: Login with user credentials.
*/
router.post('/login', indexController.login);

/**
 * @swagger
 * /register:
 *  post:
 *    summary: Register a new User.
 *    description: Register a new user with email and password. 
*/
router.post('/register', indexController.register);

export default router;