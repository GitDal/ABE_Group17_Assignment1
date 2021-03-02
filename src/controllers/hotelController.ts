import express from "express"
import { Document } from "mongoose";
import hotelModel, {IHotel, IRoom} from "../models/hotel"


// GET /
export async function getAllHotels(req: express.Request , res: express.Response, next: express.NextFunction) {
    const hotels: Document<IHotel>[] = await hotelModel.find();
    res.status(200).send(hotels);
}

// POST /
export async function createHotel(req: express.Request , res: express.Response, next: express.NextFunction) {
    
    let hotel: IHotel = req.body

    try {
        const result = await hotelModel.create(hotel); 
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// GET /{hotelId}
export async function getHotel(req: express.Request , res: express.Response, next: express.NextFunction) {
    try {
        const hotel = await hotelModel.findById({_id: req.params.hotelId}); 
        res.status(200).send(hotel);
    } catch (error) {
        res.status(404).send(error.message)
    }
}

// GET /{hotelId}/room/
export async function getAllRoomsInHotel(req: express.Request , res: express.Response, next: express.NextFunction) {
    try {
        const rooms = await hotelModel.findById({_id: req.params.hotelId}).select("rooms"); 
        res.status(200).send(rooms);
    } catch (error) {
        res.status(404).send(error.message)
    }
}

// POST /room/{hotelId}
export async function createRoom(req: express.Request , res: express.Response, next: express.NextFunction) {
    

    let room: IRoom = req.body;

    try {
        const result = await hotelModel.updateOne(
            {_id: req.params.hotelId},
            {$push: {"rooms": room}}); 
        res.status(201).send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// GET /{hotelId}/room/{roomNumber}
export async function getRoom(req: express.Request , res: express.Response, next: express.NextFunction) {

    try {
        const room = await hotelModel.find({_id: req.params.hotelId}, {"rooms": { $elemMatch: { "roomNumber": req.params.roomNumber} } });
        res.status(200).send(room);
    } catch (error) {
        res.status(400).send(error.message)
    }
}

// PUT {hotelId}/room/{roomNumber}
export async function reserveRoom(req: express.Request , res: express.Response, next: express.NextFunction) {
    try {
        const availableRooms = await hotelModel.updateOne(
            {_id: req.params.hotelId, "rooms.roomNumber" : req.params.roomNumber, "rooms.available": true},
            {$set: {"rooms.available" : false, "rooms.reservedByUserId" : req.body.reservedByUserId}});
            res.status(200).send(`Reserved room number ${req.params.roomNumber}!`);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// GET /{hotelId}/room/available
export async function getAvailableRooms(req: express.Request , res: express.Response, next: express.NextFunction) {
    try {
        var filter = {'rooms.available': true}
        const availableRooms = await hotelModel.findById({_id: req.params.hotelId}).select(filter); 
        res.status(200).send(availableRooms);
    } catch (error) {
        res.status(404).send(error.message)
    }
}



