import express from "express";
import * as hotelController from "../controllers/hotelController";
const router = express.Router();

/**
 * @swagger
 * /getAllHotels:
 *  get:
 *    summary: Get a every hotel document with all their rooms.
 *    description: Each hotel document contains an array of rooms.
*/
router.get('/', hotelController.getAllHotels)

/**
 * @swagger
 * /createHotel:
 *  post:
 *    summary: Add a new empty hotel document to the database.
 *    description: Add a new empty hotel document to the database.
*/
router.post('/', hotelController.createHotel)

/**
 * @swagger
 * /:hotelId:
 *  get:
 *    summary: Get a single specified hotel document.
 *    description: Document contains all of that hotels rooms and the hotel's manager's ID.
*/
router.get('/:hotelId', hotelController.getHotel);

/**
 * @swagger
 * /:hotelId/room:
 *  get:
 *    summary: Get an array of every room in a given hotel.
 *    description: Get an array of every room in a given hotel.
*/
router.get('/:hotelId/room', hotelController.getAllRoomsInHotel);

/**
 * @swagger
 * /:hotelId/room:
 *  post:
 *    summary: Insert a new room in the specified hotel document.
 *    description: Room should include roomNumber, availability and a reservedByUserId. 
*/
router.post('/:hotelId/room', hotelController.createRoom);

/**
 * @swagger
 * /:hotelId/room/:roomNumber:
 *  get:
 *    summary: Get a specified room in a specified hotel.
 *    description: Get a specified room in a specified hotel.
*/
router.get('/:hotelId/room/:roomNumber', hotelController.getRoom);

/**
 * @swagger
 * /:hotelId/room/:roomNumber:
 *  put:
 *    summary: Change the availability of a specified room in a specified hotel.
 *    description: Change the availability of a specified room in a specified hotel.
*/
router.put('/:hotelId/room/:roomNumber', hotelController.reserveRoom)

/**
 * @swagger
 * /:hotelId/room/available:
 *  get:
 *    summary: Get all available rooms in a specified hotel.
 *    description: Get all available rooms in a specified hotel.
*/
router.get('/:hotelId/room/available', hotelController.getAvailableRooms);

export default router;