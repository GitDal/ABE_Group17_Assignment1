import express from "express"

export async function giveClaims(req: express.Request, res: express.Response, next: express.NextFunction) {
    let body: Array<string> = req.body;
    console.log(req.user);

}