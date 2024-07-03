import jwt from 'jsonwebtoken'
export const sendCookie = (user, res, statuscode, message) => {
  if (user) {
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SIGN)
    res
      .status(statuscode)
      .cookie('token', token, {
        httpOnly: true,
        maxAge: 500 * 1000,
        sameSite: process.env.MODE_ENV == 'DEV' ? 'lax' : 'none',
        secure: process.env.MODE_ENV == 'DEV' ? false : true,
      })
      .json({
        success: true,
        message: message,
      })
  } else {
    console.log('hello from logout')
    //const token = null
    res
      .status(statuscode)

      .cookie('token', '', {
        // Empty string to clear the cookie
        httpOnly: true,
        expires: new Date(Date.now()), // Correctly set the expires to a Date object
        sameSite: process.env.MODE_ENV == 'DEV' ? 'lax' : 'none',
        secure: process.env.MODE_ENV == 'DEV' ? false : true,
      })
      .json({
        success: true,
        message: message, // Fixing the typo from message to message if that was the intent
      })
  }
  //console.log(users)
}
