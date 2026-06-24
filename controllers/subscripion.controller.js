import Subscription from "../models/subscription.model.js";


export const createSubscription = async (req, res, next) => {
    try {
    const subscription = await Subscription.create({
        ...req.body,
        user: req.user._id
    })
        res.status(201).json({
            success: true,
            message: "Subscription created successfully",
            data: subscription
        })
    } catch (e) {
        next(e)
    }
}

export const getUserSubscriptions = async (req, res, next) => {
    try {
        if(req.user.role === 'admin' || req.user.id === req.params.id) {
            const subs = await Subscription.find({user: req.params.id})
            res.status(200).json({
                success: true,
                data: subs
            })
        }
    if (req.user.id !== req.params.id) {
        return res.status(401).json({
            success: false,
            message: "You are not the owner of this subscription"
        })
    }
    } catch (e) {
        next(e)
    }
}

export const getAllSubscriptions = async (req, res, next) => {
    try {
            const subs = await Subscription.find()
            res.status(200).json({
                success: true,
                data: subs
            })
    } catch (e) {
        res.status(401).json({
            success: false,
            message: "You are not the owner of this subscription"
        })
        next(e)
    }
}

export const getSubscriptionById = async (req, res, next) => {
    try {
            const sub = await Subscription.findOne({ _id: req.params.id })
            res.status(200).json({
                success: true,
                data: sub
            })
    } catch (e) {
        res.status(401).json({
            success: false,
            message: "Failed to get subscription"
        })
        next(e)
    }
}

export const updateSubscription = async (req, res, next) => {
    try {
            const sub = await Subscription.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
            res.status(200).json({
                success: true,
                data: sub
            })
    } catch (e) {
        res.status(401).json({
            success: false,
            message: "Failed to update subscription"
        })
        next(e)
    }
}

export const deleteSubscription = async (req, res, next) => {
    try {
            await Subscription.deleteOne({ _id: req.params.id })
            res.status(200).json({
                success: true,
                message: "Subscription deleted successfully"
            })
    } catch (e) {
        res.status(401).json({
            success: false,
            message: "Failed to delete subscription"
        })
        next(e)
    }
}