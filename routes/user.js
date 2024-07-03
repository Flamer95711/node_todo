import express from 'express'
import { register, login, getUser, logout } from '../controller/userController.js'
import { isAuthenticated } from '../middleware/auth.js'
const userRouter = express.Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.get('/detail', isAuthenticated, getUser)
userRouter.get('/logout',isAuthenticated,logout)

export default userRouter
