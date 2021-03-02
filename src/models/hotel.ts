import mongoose from "mongoose";

const Schema = mongoose.Schema;
const hotelModelName = "Hotel";

export interface IRoom{
    roomNumber: Number
    available: boolean;
    reservedByUserId: String; //user.Email
}

export interface IHotel {
    hotelManagerId: String; //user.Email
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
    reservedByUserId: String //user.Email
});

const hotelSchema = new Schema({
    hotelManagerId: String,
    name: String,
    address: String,
    rooms: [roomSchema]
});

export default mongoose.model(hotelModelName, hotelSchema);