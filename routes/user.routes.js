import {Router} from "express";
import { deleteUser, getAllUsers, getUserById, updateUser} from "../controllers/user.controller.js";
import {authorize, authorizeAdmin} from "../middlewares/auth.middleware.js";


const userRouter = Router()

userRouter.get('/', authorizeAdmin , getAllUsers)
userRouter.get('/:id', authorize, getUserById)
userRouter.put('/:id', authorize, updateUser)
userRouter.delete('/:id', authorize, deleteUser)

export default userRouter