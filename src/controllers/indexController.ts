import express from "express"
import bcrypt from "bcrypt";
import { MongoError } from "mongodb";
import db, { IUser } from "../models/user"
import { Document } from "mongoose";

const saltRounds = 10;

export async function index(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(200).send("You're beautiful!");
}

export async function login(req: express.Request, res: express.Response, next: express.NextFunction) {
    let userInfo: IUser = req.body;

    try {
        let result = await db.findOne({ email: userInfo.email }); //handle null
        let userFromDb = result?.toObject() as IUser; //Possibly null

        let correctPassword = await bcrypt.compare(userInfo.password, userFromDb.password);

        if (correctPassword) {
            
            //Return jwt

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
            claims: userInfo.claims
        };

        await db.create<IUser>(hashedUserInfo);
        res.status(201);
        res.send("Succesfully registered");
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