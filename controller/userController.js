import User from '../modals/userModals.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendCookie } from '../utils/features.js'
import errHandler from '../middleware/error.js'
const saltRound = 10

const hashing = async (password) => {
  const hashPasskey = await bcrypt.hash(password, saltRound)
  return hashPasskey
}

const comparing = async (password, hashPasskey) => {
  const compare = await bcrypt.compare(password, hashPasskey)
  return compare
}
const register = async (req, res,next) => {
 try {
   const { name, email, password } = req.body
   const existingUser = await User.findOne({ email: email })
   //console.log(existingUser);
   if (existingUser) {
     return next(new errHandler('users is already exist', 400))
   }
   const hashPasskey = await hashing(password)
   const user = await User.create({
     name: name,
     email: email,
     password: hashPasskey,
   })

   sendCookie(user, res, 201, 'ho gya panjikaran')
 } catch (error) {
  next(error)  
 }
}

const login = async (req, res,next) => {
 try {
   const { email, password } = req.body
   const userFound = await User.findOne({ email: email }).select('+password')

   if (!userFound) {
     return next(errHandler('Email or Password incorrect', 400))
   }
   // console.log(userFound)

   const compare = await comparing(password, userFound.password)
   if (compare) {
     return sendCookie(userFound, res, 201, `Welcome ${userFound.name} !!`)
   } else {
     return next(errHandler('Email or Password incorrect', 400))
   }
 } catch (error) {
  next(error)
 }
}

const getUser = async (req, res,next) => {
 try {
    const { user } = req
    if (user) {
      return res.status(201).json({
        user,
      })
    } else {
      return next(errHandler('User not found', 400))
    }
 } catch (error) {
  next(error)
 }
}

const logout = async (req, res,next) => {
try {
    const { user } = req
    const removeUser = await User.deleteOne({ _id: user._id })
    //console.log(removeUser)
    return sendCookie('', res, 201, 'Account has been remove')
} catch (error) {
  next(error)
}
}

export { register, login, getUser, logout }
