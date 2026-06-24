import User from "../models/user.model.js";


export const getAllUsers = async (req, res, next) => {
    try{
    const users = await User.find()
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
        const user = await User.findOne({ _id: req.params.id }).select('-password')
        res.status(200).json({
            success: true,
            message: "User fetched successfully",
            data: user
        })
    } catch (e) {
        next(e)
    }
}

export const createUser = async (req, res, next) => {
    try{
    const { name, email, password } = req.body
    } catch (e) {
        next(e)
    }
}
export const updateUser = async (req, res, next) => {}
export const deleteUser = async (req, res, next) => {}