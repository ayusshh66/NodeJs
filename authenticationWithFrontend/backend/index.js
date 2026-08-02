import express from 'express'
import userRouter from './routes/user.router.js'
import cors from 'cors'
const PORT = process.env.PORT ?? 8000;

const app = express()

app.use(cors({
    origin : 'http://localhost:5173',
    credentials : true,
}))

app.use(express.json())

app.get('/', (req,res) => {
    res.status(200).end(`everything is fine`)
})

app.use('/user', userRouter)

app.listen(PORT, () => {
    console.log(`server is up and running at ${PORT}`)
})

