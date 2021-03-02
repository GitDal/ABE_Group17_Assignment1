import express from "express";
import jwt from "express-jwt";
import db from "../models/user"
import * as userController from "../controllers/userController"
import CLAIMS from "../constants";
const router = express.Router();
const secret = process.env.JWT_SECRET as string;

router.post('/giveClaims', authorize([CLAIMS.ADMIN]), userController.giveClaims);


function authorize(roles: Array<string>) {
    // roles param can be a single role string (e.g. Role.User or 'User') 
    // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
    console.log(roles);

    return [
        // authenticate JWT token and attach user to request object (req.user)
        jwt({ secret, algorithms: [] }),

        // authorize based on user role
        async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log(req.user);
            // const user = await db.findOne(req.user.id);

            // if (!user || (roles.length && !roles.includes(user.role))) {
            //     // user no longer exists or role not authorized
            //     return res.status(401).json({ message: 'Unauthorized' });
            // }

            // // authentication and authorization successful
            // req.user.role = user.role;
            // const refreshTokens = await db.RefreshToken.find({ user: user.id });
            // req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);
            next();
        }
    ];
}

export default router;