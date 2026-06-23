import {Router} from "express";


const subRouter = Router()

subRouter.get('/', (req,res)=>{
    res.status(200).json({
        message: "Subscriptions fetched successfully"
    })
})
subRouter.get('/:id', (req,res)=>{
    res.status(200).json({
        message: `Subscription with id => ${req.params.id} fetched successfully`
    })
})
subRouter.post('/', (req,res)=>{
    res.status(201).json({
        message: `Subscription created successfully`
    })
})
subRouter.put('/:id', (req,res)=>{
    res.status(200).json({
        message: `Subscription updated successfully`
    })
})
subRouter.delete('/:id', (req,res)=>{
    res.status(200).json({
        message: `Subscription deleted successfully`
    })
})
subRouter.get('/user/:id', (req,res)=>{
    res.status(200).json({
        message: `User Subscriptions fetched successfully`
    })
})
subRouter.put('/:id/cancel', (req,res)=>{
    res.status(200).json({
        message: `Subscription cancelled successfully`
    })
})
subRouter.get('/upcoming-renewals', (req,res)=>{
    res.status(200).json({
        message: `Upcoming renewals fetched successfully`
    })
})

export default subRouter