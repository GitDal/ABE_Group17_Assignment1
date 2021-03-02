import mongoose from "mongoose";

const Schema = mongoose.Schema;
const hotelModelName = "Hotel";

export interface IRoom{
    roomNumber: Number
    available: boolean;
    reservedByUserId: String; //Email
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
        required: true
    },
    available: {
        type: Boolean,
        'default': true,
    },
    reservedByUserId: String //Email
});

const hotelSchema = new Schema({
    hotelManagerId: Number,
    name: String,
    address: String,
    rooms: [roomSchema]
});

export default mongoose.model(hotelModelName, hotelSchema);