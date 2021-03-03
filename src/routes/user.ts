import express from "express";
import * as userController from "../controllers/userController";
import authorize from "./authorize";
import claims from "../claims";
const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     ClaimsDetails:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: user email
 *           example: "admin@google.com"
 *         claims:
 *           type: array
 *           description: list of claims to give user
 *           items:
 *             type: string
 *           example:
 *             - "ADMIN"
 *             - "HOTEL_MANAGER"
*/

/**
 * @swagger
 * /giveClaims:
 *  post:
 *    summary: Add a list of claims to a specified user.
 *    description: An admin user can give other users, registered in the system, any number of claims
 *    tags: [Claims]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/ClaimsDetails'
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
 *                  example: "User claims updated"
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
 *                  example: "User not found"
 *                
 */
router.post('/giveClaims', authorize([claims.ADMIN]), userController.giveClaims);

export default router;