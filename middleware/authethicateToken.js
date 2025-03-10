import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { UnauthorizedError} from '../error/index.js';
import { ForbiddenError } from '../error/index.js';
dotenv.config()
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            console.error("JWT Verification Error:", err);
            return res.status(403).json({ message: "Invalid or expired token" });
        }

        req.user = decoded; // Attach user data to the request
        next();
    });
};


export const authorize = (role) => {
    return (req, res, next) => {
        if (req.user.role !== "admin") {
            return next(new ForbiddenError('You do not have permission to perform this action'));
        }
        next();
    };
};

