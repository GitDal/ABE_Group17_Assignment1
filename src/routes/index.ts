import express from "express";
import * as indexController from "../controllers/indexController";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     UserCredentials:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           description: user email
 *           example: "admin@google.com"
 *         password:
 *           type: string
 *           description: user password.
 *           example: "password123"
*/

/**
 * @swagger
 * /login:
 *  post:
 *    summary: Login as a user for the service.
 *    description: If succesful login, a JWT is sent back, which the user can use with future calls to the service, that require authentication and authorization
 *    tags: [UserAccess]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserCredentials'
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: status message.
 *                  example: "Succesfully logged in"
 *                token:
 *                  type: string
 *                  description: JWT bearer token.
 *                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdvb2dsZS5jb20iLCJpYXQiOjE2MTQ3OTUwMTIsImV4cCI6MTYxNDc5ODYxMn0.vfXqqeoPl73f8Ko-CZfiM7sD-LSwoG6RDPaC6jP4cF0"
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: error message
 *                  example: "Incorrect email or password"
 *                
 */
router.post('/login', indexController.login);

/**
 * @swagger
 * /register:
 *  post:
 *    summary: Register as a user for the service.
 *    description: If succesful register (the email was not already registered), a JWT is sent back, which the user can use with future calls to the service, that require authentication and authorization
 *    tags: [UserAccess]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserCredentials'
 *    responses:
 *      201:
 *        description: Created
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: status message
 *                  example: "Succesfully registered"
 *                token:
 *                  type: string
 *                  description: JWT bearer token
 *                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGdvb2dsZS5jb20iLCJpYXQiOjE2MTQ3OTQ5ODYsImV4cCI6MTYxNDc5ODU4Nn0._lpC9LfC0yr486L7UfIKogCwzFZyE9N_t_a_xYscurg"
 *      400:
 *        description: Bad Request
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  description: error message
 *                  example: "Email already registered"
 *                
 */
router.post('/register', indexController.register);

export default router;