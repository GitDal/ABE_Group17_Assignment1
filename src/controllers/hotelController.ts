import express from "express"
import { Document, Query } from "mongoose";
import hotelModel, {IHotel, IRoom} from "../models/hotel"


// GET /
export async function getAllHotels(req: express.Request , res: express.Response, next: express.NextFunction) {
    const hotels: Document<IHotel>[] = await hotelModel.find();
    res.status(200).send(hotels);
}

// POST /
export async function createHotel(req: express.Request , res: express.Response, next: express.NextFunction) {
    
    const hotel: IHotel = req.body

    try {
        const result = await hotelModel.create(hotel); 
        res.status(201).send(result);
    } catch (error) {
        printError("createHotel", error)
        res.status(400).send(error.message)
    }
}

// GET /{hotelId}
export async function getHotel(req: express.Request , res: express.Response, next: express.NextFunction) {
    try {
        const hotel = await hotelModel.findById({_id: req.params.hotelId}); 
        res.status(200).send(hotel);
    } catch (error) {
        printError("getHotel", error)
        res.status(404).send(error.message)
    }
}

// GET /{hotelId}/room/
export async function getAllRoomsInHotel(req: express.Request , res: express.Response, next: express.NextFunction) {
    try {
        const rooms = await hotelModel.findById({_id: req.params.hotelId}).select("rooms"); 
        res.status(200).send(rooms);
    } catch (error) {
        printError("getAllRoomsInHotel", error)
        res.status(404).send(error.message)
    }
}

// POST /room/{hotelId}
export async function createRoom(req: express.Request , res: express.Response, next: express.NextFunction) {
    
    const hotelId = req.params.hotelId;
    const room: IRoom = req.body;

    try {
        const result = await hotelModel.updateOne(
            {_id: req.params.hotelId, 'rooms.roomNumber': {$ne: room.roomNumber}}, //roomNumber has to be unique in hotel (but not in all hotels)
            {$push: {"rooms": room}}); 

        if(result.nModified === 0){
            res.status(200).send(`Room with roomNumber=${room.roomNumber} couldn't be created... \nInfo: Maybe it already exists or the hotel with id=${hotelId} doesn't exist`)
        } else {
            res.status(201).send(result);
        }
    } catch (error) {
        printError("createRoom", error)
        res.status(400).send(error.message);
    }
}

// GET /{hotelId}/room/{roomNumber}
export async function getRoom(req: express.Request , res: express.Response, next: express.NextFunction) {

    // params
    const hotelId = req.params.hotelId;
    const roomNumber = req.params.roomNumber;

    try {
        let result = await hotelModel.findOne({_id: hotelId}, {"rooms": { $elemMatch: { "roomNumber": roomNumber}}});
        
        let roomResult = result?.toObject() as IHotel;
        if(!roomResult) {
            res.status(404).send(`The hotel with id=${hotelId} doesn't exist`)
        }

        let room = roomResult.rooms[0];
        if(!room) {
            res.status(404).send(`The room with roomNumber=${roomNumber} doesn't exist`)
        }

        res.status(200).send(room);
    } catch (error) {
        printError("getRoom", error)
        res.status(400).send(error.message)
    }
}

// PUT {hotelId}/room/{roomNumber}
export async function reserveRoom(req: express.Request , res: express.Response, next: express.NextFunction) {
    
    //params
    const hotelId = req.params.hotelId;
    const roomNumber = req.params.roomNumber;

    //body
    const reservedByUserId = req.body.reservedByUserId;
    
    try {
        let result = await hotelModel.updateOne(
            {_id: hotelId, "rooms": { $elemMatch: { "roomNumber": roomNumber, "available": true}}},
            {$set: {"rooms.$.available" : false, "rooms.$.reservedByUserId" : reservedByUserId}});

        if(result.nModified === 0){
            res.status(200).send(`Room with roomNumber=${roomNumber} couldn't be reserved (maybe its already reserved)`)
        } else {
            res.status(200).send(`Reserved room with roomNumber ${roomNumber}!`);
        }
        
    } catch (error) {
        printError("reserveRoom", error)
        res.status(400).send(error.message);
    }
}

// GET /{hotelId}/room/available
export async function getAvailableRooms(req: express.Request , res: express.Response, next: express.NextFunction) {
    
    //params
    const hotelId = req.params.hotelId;

    try {
        const result = await hotelModel.findById({_id: hotelId}).select("rooms");

        const hotelWithRooms = result?.toObject() as IHotel;
        if(!hotelWithRooms || hotelWithRooms == undefined) {
            res.status(404).send(`The hotel with id=${hotelId} doesn't exist`)
        }

        const availableRooms = hotelWithRooms.rooms.filter(r => r.available == true);

        res.status(200).send(availableRooms);
    } catch (error) {
        printError("getAvailableRooms", error)
        res.status(404).send(error.message)
    }
}

function printError(functionName: string, error: any) {
    console.log(`** Error from function ${functionName}:`)
    console.log(error);
}



