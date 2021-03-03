import express from "express"
import db, {IUserDoc} from "../models/user";

export async function giveClaims(req: express.Request, res: express.Response, next: express.NextFunction) {
    let userEmail: string = req.body.user;
    let newClaims: Array<string> = req.body.claims;
    try {
        let doc = await db.findOne({ email: userEmail });
        const user = doc as IUserDoc;
        newClaims.forEach(claim => user.claims?.push(claim));
        await user.save();
        res.status(200).json({message: "User claims updated"});
    } catch (error) {
        return res.status(400).json({message: "User not found"});
    }
}