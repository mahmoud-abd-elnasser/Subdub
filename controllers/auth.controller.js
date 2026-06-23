import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {JWT_SECRET, JWT_EXPIRES_IN} from "../config/env.js";


export const signUp = async (req, res, next ) => {
    let session;
    try {
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" })
        }

        session = await mongoose.startSession();
        session.startTransaction();

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create([{
            name,
            email,
            password: hashedPassword
        }], { session })

        const token = jwt.sign({ userId: newUser[0]._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })

        await session.commitTransaction()

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: {
            token,
            user: {
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
        const token = jwt.sign({ userId: existingUser._id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN })
        res.status(200).json({
            success: true,
            message: "User signed in successfully",
            data: {
                token,
                user: {
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


export const signOut = async (req, res, next ) => {
    //NOT IMPLEMENTED
}