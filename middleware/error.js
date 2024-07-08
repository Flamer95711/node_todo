class errHandler extends Error{
    constructor(message,statusCode){
        super(message)
        this.statusCode=statusCode;
    }
}

export const errorHandling = (err, req, res, next) => {
  //console.log(err.message)
  err.message=err.message||"internal server error"
  err.statusCode=err.statusCode||500
  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  })
}

export default errHandler
