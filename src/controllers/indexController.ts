import express from "express"
import bcrypt from "bcrypt";
import { MongoError } from "mongodb";
import db, { IUser } from "../models/user";
import jwt from "jsonwebtoken";

const saltRounds = 10;
const secret = process.env.JWT_SECRET as string;

export async function login(req: express.Request, res: express.Response, next: express.NextFunction) {
    let userInfo: IUser = req.body;

    try {
        let result = await db.findOne({ email: userInfo.email }); //handle null
        let userFromDb = result?.toObject() as IUser; //Possibly null

        let correctPassword = await bcrypt.compare(userInfo.password, userFromDb.password);

        if (correctPassword) {
            let token = jwt.sign({email: userInfo.email}, secret, {
                expiresIn: "1h"
            });
    
            res.status(200).json({
                message: "Succesfully logged in",
                token: token
            });
        } else {
            res.status(400);
            res.send("Incorrect email or password");
        }

    } catch (error) {
        res.status(400);
        res.send("Incorrect email or password");
    }

}

export async function register(req: express.Request, res: express.Response, next: express.NextFunction) {
    let userInfo: IUser = req.body;

    try {
        const hashedPassword = await bcrypt.hash(userInfo.password, saltRounds);

        const hashedUserInfo: IUser = {
            email: userInfo.email,
            password: hashedPassword,
            claims: []
        };

        await db.create<IUser>(hashedUserInfo);
        
        let token = jwt.sign({email: hashedUserInfo.email}, secret, {
            expiresIn: "1h"
        });

        res.status(201).json({
            message: "Succesfully registered",
            token: token
        });
    } catch (error) {
        let err = error as MongoError
        res.status(400);
        if (err.code == 11000) { // Email duplication error
            res.send("Email already registered");
        } else {
            res.send(err.message);
        }
    }
}