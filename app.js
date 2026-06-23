import {PORT} from "./config/env.js"
import express from "express"
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";

const app = express()
app.use(express.json())
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)
app.use('/api/v1/subscriptions', subscriptionRoutes)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

app.get('/', (req, res) => {
    res.send('Welcome to subscription tracker API!')
})

