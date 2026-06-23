import {Router} from "express";


const userRouter = Router()

userRouter.get('/', (req, res)=>{
    res.status(200).json({
        message: "Users fetched successfully"
    })
})
userRouter.get('/:id', (req, res)=>{
    res.status(200).json({
        message: "User fetched successfully"
    })
})
userRouter.post('/', (req, res)=>{
    res.status(201).json({
        message: "User Created successfully"
    })
})
userRouter.put('/:id', (req, res)=>{
    res.status(200).json({
        message: "User Updated successfully"
    })
})
userRouter.delete('/:id', (req, res)=>{
    res.status(200).json({
        message: "User Deleted successfully"
    })
})

export default userRouter