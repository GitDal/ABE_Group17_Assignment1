import express from "express"

export async function giveClaim(req: express.Request, res: express.Response, next: express.NextFunction) {
    let body: string = req.body;


    res.status(200).send("HEJ HEJ");
}

export async function giveClaims(req: express.Request, res: express.Response, next: express.NextFunction) {
    let body: Array<string> = req.body;

    res.status(200).send("HEJ HEJ");
}