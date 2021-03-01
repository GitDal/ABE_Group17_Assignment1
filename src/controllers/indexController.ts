import express from "express"
import { Document } from "mongoose";
import db, { IUser } from "../models/user"

export async function index(req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(200).send("HEJ HEJ");
}

export async function login(req: express.Request, res: express.Response, next: express.NextFunction) {
    let userInfo: IUser = req.body;

}

export async function register(req: express.Request, res: express.Response, next: express.NextFunction) {
    let userInfo: IUser = req.body;

    let registeredUser = await db.create(userInfo, () => console.error(`User with email ${userInfo.email} could not be registered`));
    

    // let doc = await db.create<IUser>(students);
    // return doc;
}