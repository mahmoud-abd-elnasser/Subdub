import {Router} from "express";


const authRouter = Router()

authRouter.post('/sign-up', ( req, res )=>{
    res.status(201).json({
        message: "User created successfully"
    })
})
authRouter.post('/sign-in', ( req, res )=>{
    res.status(200).json({
        message: "Logged-in successfully"
    })
})
authRouter.post('/sign-out', ( req, res )=>{
    res.status(200).json({
        message: "Logged-out successfully"
    })
})

export default authRouter
