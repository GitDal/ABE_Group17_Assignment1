import express from "express"
import { Document } from "mongoose";
import hotelModel, {IHotel, IRoom} from "../models/hotel"


export async function getAllHotels(req: express.Request , res: express.Response, next: express.NextFunction) {
    const hotels: Document<IHotel>[] = await hotelModel.find();
    res.status(200).send(hotels);
}

export async function getHotel(req: express.Request , res: express.Response, next: express.NextFunction) {
    // Name "hotelId" in parameters should be defined in hotel router.
    const hotel = await hotelModel.findById({_id: req.params.hotelId}); 
    res.status(200).send(hotel);
}

export async function createHotel(req: express.Request , res: express.Response, next: express.NextFunction) {
    
    let hotel: IHotel = req.body
    const result = await hotelModel.create(hotel); 
    res.status(200).send(result);
}

export async function getAllRoomsInHotel(req: express.Request , res: express.Response, next: express.NextFunction) {
    // Name "hotelId" in parameters should be defined in hotel router.
    const rooms = await hotelModel.findById({_id: req.params.hotelId}); 
    res.status(200).send(rooms);
}

export async function getAvailableRooms(req: express.Request , res: express.Response, next: express.NextFunction) {
    // Name "hotelId" in parameters should be defined in hotel router.
    var filter = {'rooms.available': true}
    const availableRooms = await hotelModel.findById({_id: req.params.hotelId}).select(filter); 
    res.status(200).send(availableRooms);
}

export async function getRoom(req: express.Request , res: express.Response, next: express.NextFunction) {
    // Name "hotelId" and "roomNumber" in parameters should be defined in hotel router.
    const room = await hotelModel.findById({_id: req.params.hotelId}).select(req.params.roomNumber); 
    res.status(200).send(room);
}

export async function reserveRoom(req: express.Request , res: express.Response, next: express.NextFunction) {
    // Name "hotelId" in parameters should be defined in hotel router.

    try {
        const availableRooms = await hotelModel.updateOne(
            {_id: req.params.hotelId, "rooms.roomNumber" : req.params.roomNumber, "rooms.available": true},
            {$set: {"rooms.available" : false, "rooms.reservedByUserId" : req.body.reservedByUserId}});
            res.status(200).send(`Reserved room number ${req.params.roomNumber}!`);
    } catch (error) {
        res.status(401).send(error.message);
    }
}

export async function createRoom(req: express.Request , res: express.Response, next: express.NextFunction) {
    // Name "hotelId" and "roomNumber" in parameters should be defined in hotel router.
    let room: IRoom = req.body;


    try {
        const hotel = await hotelModel.updateOne(
            {_id: req.params.hotelId},
            {$push: {"rooms": room}}); 
        res.status(200).send(hotel);
    } catch (error) {
        res.status(401).send(error.message);
    }
}