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
        if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
            return res.status(403).json({
                success: false,
                message: "You are not the owner of this subscription"
            })
        }
        const subs = await Subscription.find({ user: req.params.id })
        if(!subs) return res.status(404).json({
            success: false,
            message: "No subscriptions found"
        })
        return res.status(200).json({
            success: true,
            data: subs
        })
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
        next(e)
    }
}

export const getSubscriptionById = async (req, res, next) => {
    try {
        const sub = await Subscription.findById(req.params.id)

        if (!sub) return res.status(404).json({
            success: false,
            message: "Subscription not found"
        })

        if (req.user.role !== 'admin' && sub.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You do not have permission to view this resource."
            });
        }

        res.status(200).json({
            success: true,
            data: sub
        })
    } catch (e) {
        next(e)
    }
}

export const updateSubscription = async (req, res, next) => {
    try {
        const sub = await Subscription.findById(req.params.id)

        if (!sub) return res.status(404).json({
            success: false,
            message: "Subscription not found"
        })

        if (req.user.role !== 'admin' && sub.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You do not have permission to update this resource."
            });
        }

        Object.assign(sub, req.body);
        await sub.save();

        res.status(200).json({
            success: true,
            data: sub
        })
    } catch (e) {
        next(e)
    }
}

export const deleteSubscription = async (req, res, next) => {
    try {
        const sub = await Subscription.findById(req.params.id)

        if (!sub) return res.status(404).json({
            success: false,
            message: "Subscription not found"
        })

        if (req.user.role !== 'admin' && sub.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You do not have permission to delete this resource."
            });
        }

        await sub.deleteOne();

        res.status(200).json({
            success: true,
            message: "Subscription deleted successfully"
        })
    } catch (e) {
        next(e)
    }
}