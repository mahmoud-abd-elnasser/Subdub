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

        if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You do not have permission to view this resource."
            });
        }

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
        if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You do not have permission to update this resource."
            });
        }

        const { name, email, password } = req.body;
        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: req.params.id },
            updateData,
            { new: true, runValidators: true }
        ).select('-password');

        if (!updatedUser) return res.status(404).json({
            success: false,
            message: "User not found"
        });

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
            if (req.user.role !== 'admin' && req.user._id.toString() !== req.params.id) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden: You do not have permission to delete this resource."
                });
            }

            const deletedUser = await User.findOneAndDelete({ _id: req.params.id })

            if (!deletedUser) return res.status(404).json({
                success: false,
                message: "User not found"
            });

            res.status(200).json({
                success: true,
                message: "User deleted successfully"
            })
        } catch (e) {
        next(e)
        }
}

