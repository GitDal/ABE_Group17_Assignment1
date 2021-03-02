import mongoose from "mongoose";

const userModelName = "User";

export interface IUser {
    claims?: Array<string>;
    email: string
    password: string;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        index: true
    },
    password: String,
    claims: [String]
});


const userModel = mongoose.model(userModelName, userSchema);
export default userModel;