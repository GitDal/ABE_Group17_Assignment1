import express from "express";
import jwt from "express-jwt";
import db, { IUser } from "../models/user"
const secret = process.env.JWT_SECRET as string;

function authorize(claims: Array<string>) {
    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret: secret, algorithms: ['HS256'] }),

        // authorize based on user role
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            let requestUser = req.user as { email: string }; // Cast to object containing email as string

            try {
                let doc = await db.findOne({ email: requestUser.email });
                const user = doc?.toObject() as IUser;
                const authorized = claims.some(claim => user.claims?.includes(claim));

                if(!authorized){
                    return res.status(401).json({message: "Unauthorized"});
                }

            } catch (error) {
                return res.status(401).json({message: "Unauthorized"});
            }

            next();
        }
    ];
}

export default authorize;