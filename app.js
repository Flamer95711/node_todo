import express from 'express'
import mongoose, { connect } from 'mongoose'
import connectDb from './db.js'
import userSchema from './modals/userModals.js'
import userRouter from './routes/user.js'
import taskRouter from './routes/task.js'
import { config } from 'dotenv'
import cookieParser from 'cookie-parser'
import { errorHandling } from './middleware/error.js'
import cors from 'cors'

config({
  path: 'config.env',
})

const app = express()
//using middleware
connectDb()
app.use(express.json())
app.use(cookieParser())
app.use(
  cors({
    origin: [process.env.FRONTEND_URI],
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    credentials: true,
  })
)
app.use('/users', userRouter)
app.use('/task', taskRouter)

app.get('/', async (req, res) => {
  res.send('hello')
})
//console.log(process.env.PORT)
app.listen(process.env.PORT, () => {
  console.log(
    `Server is working :${process.env.PORT} in ${process.env.MODE_ENV} mode `
  )
})
//error handling
app.use(errorHandling)
