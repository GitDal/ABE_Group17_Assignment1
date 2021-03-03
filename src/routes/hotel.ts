import express from "express";
import * as hotelController from "../controllers/hotelController";
import authorize from "./authorize";
import claims from "../claims";

const router = express.Router();

// TAGS :
/**
 * @swagger
 * tags:
 *   name: Hotels
 *   description: API endpoints to manage hotels
*/

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: API endpoints to manage rooms in a hotel
*/

// SCHEMAS :
/**
 * @swagger
 * components:
 *   schemas:
 *     Hotel:
 *       type: object
 *       required:
 *         - name
 *         - address
 *       properties:
 *         _id:
 *           type: ObjectId
 *           description: The auto-generated id of the hotel.
 *         hotelManagerId:
 *           type: string
 *           description: Hotel manager identifier.
 *           example: "MaryManyMoney@Chardonne.com"
 *         name:
 *           type: string
 *           description: The name of the hotel.
 *           example: "Chardonne Five Star Hotel"
 *         address:
 *           type: string
 *           description: The address of the hotel.
 *           example: "Fisherstreet 420, London, UK"
 *         rooms:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Room'
 *     Room:
 *       type: object
 *       required:
 *         - roomNumber
 *       properties:
 *         roomNumber:
 *           type: integer
 *           description: The number of the room, must be unique.
 *           example: 69
 *         available:
 *           type: boolean
 *           description: Whether or not a room is available to reserve.
 *           example: false
 *         reservedByUserId:
 *           type: string
 *           description: ID of user who has reserved the room, empty if not reserved.
 *           example: "mikkeljeppe@gmail.com"
*/

/**
 * @swagger
 * /hotel/:
 *  get:
 *    summary: Get every hotel document with all their rooms.
 *    tags: [Hotels]
 *    description: Each hotel document contains an array of rooms.
 *    responses:
 *      200:
 *        description: The list of hotels
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Hotel'
 *  post:
 *    summary: Add a new hotel document to the database.
 *    tags: [Hotels]
 *    description: Add a new hotel document to the database.
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Hotel'
 *    responses:
 *      201:
 *        description: The created hotel
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Hotel'
 *      400:
 *        description: Bad Request
*/
router.route('/')
    .get(authorize([claims.USER]), hotelController.getAllHotels)
    .post(authorize([claims.HOTEL_MANAGER]), hotelController.createHotel);

/**
 * @swagger
 * /hotel/:hotelId:
 *  get:
 *    summary: Get a single specified hotel document.
 *    tags: [Hotels]
 *    description: Document contains all of that hotels rooms and the hotel's manager's ID.
 *    parameters:
 *      - in: path
 *        name: hotelId
 *        schema:
 *          type: ObjectId
 *          required: true
 *          description: The hotel id
 *    responses:
 *      200:
 *        description: A hotel document.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Hotel'
 *      404:
 *        description: Hotel not Found
 */
router.get('/:hotelId', authorize([claims.USER]), hotelController.getHotel);

/**
 * @swagger
 * /hotel/:hotelId/room:
 *  get:
 *    summary: Get an array of every room in a given hotel.
 *    tags: [Rooms]
 *    description: Get an array of every room in a given hotel.
 *    parameters:
 *      - in: path
 *        name: hotelId
 *        schema:
 *          type: ObjectId
 *          required: true
 *          description: The hotel id
 *    responses:
 *      200:
 *        description: The list of rooms in the given hotel
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Room'
 *      404:
 *        description: Hotel not found, therefore no rooms are displayed
 *  post:
 *    summary: Insert a new room in the specified hotel document.
 *    tags: [Rooms]
 *    description: Room should include roomNumber, availability and a reservedByUserId.
 *    parameters:
 *      - in: path
 *        name: hotelId
 *        schema:
 *          type: ObjectId
 *          required: true
 *          description: The hotel id
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Room'
 *    responses:
 *      201:
 *        description: The room was created
 *      400:
 *        description: Bad Request
 *      403:
 *        description: Forbidden (The user wasn't the hotelManager for the given hotel)
 *      500:
 *        description: The room couldn't be created
*/
router.route('/:hotelId/room')
    .get(authorize([claims.USER]), hotelController.getAllRoomsInHotel)
    .post(authorize([claims.HOTEL_MANAGER]), hotelController.createRoom);

/**
 * @swagger
 * /hotel/:hotelId/room/:roomNumber:
 *  get:
 *    summary: Get a specified room in a specified hotel.
 *    tags: [Rooms]
 *    description: Get a specified room in a specified hotel.
 *    parameters:
 *      - in: path
 *        name: hotelId
 *        schema:
 *          type: ObjectId
 *          required: true
 *          description: The hotel id
 *      - in: path
 *        name: roomNumber
 *        schema:
 *          type: integer
 *          required: true
 *          description: The room number
 *    responses:
 *      200:
 *        description: A room document.
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/Room'
 *      400:
 *        description: Bad Request
 *      404:
 *        description: Room not Found
 *  put:
 *    summary: Reserve the specified room in a specified hotel.
 *    tags: [Rooms]
 *    description: Reserve the specified room in a specified hotel.
 *    parameters:
 *      - in: path
 *        name: hotelId
 *        schema:
 *          type: ObjectId
 *          required: true
 *          description: The hotel id
 *      - in: path
 *        name: roomNumber
 *        schema:
 *          type: integer
 *          required: true
 *          description: The room number
 *    responses:
 *      200:
 *        description: The room was reserved (updated)
 *      400:
 *        description: Bad Request
 *      500:
 *        description: The room couldn't be reserved (updated)
 * 
*/
router.route('/:hotelId/room/:roomNumber')
    .get(authorize([claims.USER]), hotelController.getRoom)
    .put(authorize([claims.USER]), hotelController.reserveRoom);

/**
 * @swagger
 * /hotel/:hotelId/available:
 *  get:
 *    summary: Get all available rooms in a specified hotel.
 *    tags: [Rooms]
 *    description: Get all available rooms in a specified hotel.
 *    parameters:
 *      - in: path
 *        name: hotelId
 *        schema:
 *          type: ObjectId
 *          required: true
 *          description: The hotel id
 *    responses:
 *      200:
 *        description: The list of available rooms in the given hotel
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/Room'
 *      400:
 *        description: Bad Request
 *      500:
 *        description: Internal server error (hotel couldn't be found)
 * 
 * 
*/
router.get('/:hotelId/available', authorize([claims.USER]), hotelController.getAvailableRooms);

export default router;