import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


export const getAllUsers = async (req, res, next) => {
    try{
    const users = await User.find().select('-password')
        res.status(200).json({
            success: true,
            message: "Users fetched successfully",
            data: users
        })
    }catch (e) {
        next(e)
    }
}

export const getUserById = async (req, res, next) => {
    try {
        const user = await User.findOne({_id: req.params.id}).select('-password')
        if (!user) return res.status(404).json({
            success: false,
            message: "User not found"
        })
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        })
    } catch (e) {
        next(e)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = await bcrypt.hash(req.body.password, salt)
            req.body.password = hashedPassword
        }
    const updatedUser = await User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).select('-password')
        res.status(200).json({
            success: true,
            message: "User updated successfully",
            data: updatedUser
        })
    } catch (e) {
        next(e)
    }
}

export const deleteUser = async (req, res, next) => {
        try {
            await User.findOneAndDelete({ _id: req.params.id })
            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            })
        } catch (e) {
        next(e)
        }
}

