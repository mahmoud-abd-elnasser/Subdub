import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {JWT_SECRET, JWT_EXPIRES_IN} from "../config/env.js";


export const signUp = async (req, res, next ) => {
    let session;
    try {
        const { name, email, password, role } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" })
        }

        session = await mongoose.startSession();
        session.startTransaction();

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create([{
            role,
            name,
            email,
            password: hashedPassword
        }], { session })

        const token = jwt.sign({ userId: newUser[0]._id, tokenVersion: newUser[0].tokenVersion }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

        await session.commitTransaction()

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
            token,
            user: {
                role,
                name,
                email,
                _id: newUser[0]._id
            }
            },
        })
    } catch (e) {
        if (session?.inTransaction()) await session.abortTransaction()
        next(e)
    } finally {
        await session?.endSession()
    }
}


export const signIn = async (req, res, next ) => {
    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (!existingUser) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }
        const isPasswordMatched = await bcrypt.compare(password, existingUser.password)
        if (!isPasswordMatched) {
            return res.status(401).json({
                success: false,
                message: "Invalid Email or Password"
            })
        }
        const token = jwt.sign({ userId: existingUser._id, tokenVersion: existingUser.tokenVersion }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                token,
                user: {
                    role: existingUser.role,
                    name: existingUser.name,
                    email: existingUser.email,
                    _id: existingUser._id
                }
            }
        })
    } catch (e) {
        next(e)
    }

}


export const signOut = async (req, res, next) => {
    try {
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized"
            });
        }

        await User.findByIdAndUpdate(req.user._id, { $inc: { tokenVersion: 1 } });

        res.clearCookie('token');
        return res.status(200).json({
            success: true,
            message: "User signed out successfully",
        });
    } catch (e) {
        next(e);
    }
}