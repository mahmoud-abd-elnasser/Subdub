import {Router} from "express";
import {authorize, authorizeAdmin} from "../middlewares/auth.middleware.js";
import {
    createSubscription, deleteSubscription,
    getAllSubscriptions,
    getSubscriptionById,
    getUserSubscriptions, updateSubscription
} from "../controllers/subscripion.controller.js";


const subRouter = Router()

subRouter.get('/', authorizeAdmin, getAllSubscriptions)
// subRouter.get('/upcoming-renewals', (req,res)=>{
//     res.status(200).json({
//         message: `Upcoming renewals fetched successfully`
//     })
// })
subRouter.get('/:id', authorize, getSubscriptionById)
subRouter.post('/', authorize, createSubscription)

subRouter.put('/:id', authorize, updateSubscription)
subRouter.delete('/:id', authorize, deleteSubscription)
subRouter.get('/user/:id', authorize, getUserSubscriptions)

// subRouter.put('/:id/cancel', authorize, cancelSubscription)


export default subRouter