import jwt from "jsonwebtoken";
import {JWT_SECRET} from "../config/env.js";
import User from "../models/user.model.js";


export const authorize = async (req, res, next) => {
    try {
    let token;

    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) return res.status(401).json({
        success: false,
        message: "Unauthorized"
    })
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findOne({ _id: decoded.userId })

    if (!user || user.tokenVersion !== decoded.tokenVersion) return res.status(401).json({
        success: false,
        message: "Unauthorized"
    })
        req.user = user

        next()
    } catch (e) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: e.message
        })
    }
}


export const authorizeAdmin = async (req, res, next) => {
    try {
    let token;

    if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token) return res.status(401).json({
        success: false,
        message: "Unauthorized"
    })
    const decoded = jwt.verify(token, JWT_SECRET)
    const user = await User.findOne({ _id: decoded.userId })

    if (!user || user.tokenVersion !== decoded.tokenVersion) return res.status(401).json({
        success: false,
        message: "Unauthorized"
    })
        req.user = user

        const isAdmin = user.role === 'admin';
        if (!isAdmin) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You do not have permission to view this resource."
            });
        }

        next()
    } catch (e) {
        res.status(401).json({
            success: false,
            message: "Unauthorized",
            error: e.message
        })
    }
}

