import express from "express"
import { PORT } from './config/env.js'


const app = express()
app.use(express.json())

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))

app.get('/', (req, res) => {
    res.send('Hello World!')
})

