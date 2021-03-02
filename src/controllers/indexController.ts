import express from "express"
import { MongoError } from "mongodb";
import db, { IUser } from "../models/user"

export async function index(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(200).send("HEJ HEJ");
}

export async function login(req: express.Request, res: express.Response, next: express.NextFunction) {
    let userInfo: IUser = req.body;

}

export async function register(req: express.Request, res: express.Response, next: express.NextFunction) {
    let userInfo: IUser = req.body;

    try {
        let result = await db.create(userInfo);
        res.status(201);
        res.json(result.id);
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