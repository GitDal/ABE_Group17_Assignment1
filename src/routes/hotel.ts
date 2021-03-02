import express from "express";
import * as hotelController from "../controllers/hotelController";
const router = express.Router();

router.route('/')
    .get(hotelController.getAllHotels)
    .post(hotelController.createHotel);

router.get('/:hotelId', hotelController.getHotel);

router.route('/:hotelId/room')
    .get(hotelController.getAllRoomsInHotel)
    .post(hotelController.createRoom);

router.route('/:hotelId/room/:roomNumber')
    .get(hotelController.getRoom)
    .put(hotelController.reserveRoom);

router.get('/:hotelId/available', hotelController.getAvailableRooms);

export default router;