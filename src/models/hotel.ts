import mongoose from "mongoose";

const Schema = mongoose.Schema;
const hotelModelName = "Hotel";

export interface IRoom{
    hotelId: number;
    available: boolean;
    reservedByUserId: number;
}

export interface IHotel {
    hotelManagerId: number;
    name: string;
    address: string;
    rooms: Array<IRoom>
}

const roomSchema = new Schema({
    roomNumber: {
        type: Number,
        required: true,
        unique: true
    },
    available: {
        type: Boolean,
        'default': true,
    },
    reservedByUserId: Number
});

const hotelSchema = new Schema({
    hotelManagerId: Number,
    name: String,
    address: String,
    rooms: [roomSchema]
});


export default mongoose.model(hotelModelName, hotelSchema);