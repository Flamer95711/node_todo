import jwt from 'jsonwebtoken'
import User from '../modals/userModals.js'
export const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies
  //console.log(token)
  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'User not found',
    })
  }
  const decodedData = jwt.verify(token, process.env.JWT_SIGN)
  //console.log(decodedData)
  req.user = await User.findOne({ _id: decodedData._id })
  //console.log(req.user)
  next()
}
