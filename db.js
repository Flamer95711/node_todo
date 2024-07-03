import mongoose from 'mongoose'
const connectDb=async()=>{
    const connect= await mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'API',
  })
  .then((c) => {
    console.log(`database connected with ${c.connection.host}`)
  })
  .catch((e) => {
    console.log(e)
  })
}

export default connectDb;
