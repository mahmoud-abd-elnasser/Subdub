import express from "express"
import cookieParser from "cookie-parser";

import {PORT} from "./config/env.js"
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import connectToDB from "./db/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import arcjetMiddleware from "./middlewares/arcjet.middleware.js";

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(arcjetMiddleware)

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRoutes)

app.use(errorMiddleware)


app.get('/', (req, res) => {
    res.send('Welcome to subscription tracker API!')
})
const startServer = async () => {
    await connectToDB();
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

startServer();
