import express from "express"

export async function index(req: express.Request , res: express.Response, next: express.NextFunction) {
    res.status(200).send("HEJ HEJ");
}