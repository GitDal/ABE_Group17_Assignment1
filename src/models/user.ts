import mongoose from "mongoose";

const userModelName = "User";

export interface IUser {
    claims: string; // Might change type later - Array of claimstype
    email: string
    password: string;
}

const userSchema = new mongoose.Schema({
    claims: String,
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: String,
});

const userModel = mongoose.model(userModelName, userSchema);