import express from "express";
import * as hotelController from "../controllers/hotelController";
const router = express.Router();

router.get('/:hotelId', hotelController.getHotel);

router.get('/room/available/:hotelId', hotelController.getAvailableRooms);


router.route('/room/:hotelId')
.get(hotelController.getAllRoomsInHotel)
.post(hotelController.createRoom);


router.route('/')
    .get(hotelController.getAllHotels)
    .post(hotelController.createHotel);

router.route('/room/:hotelId/:roomNumber')
    .get(hotelController.getRoom)
    .put(hotelController.reserveRoom);


export default router;