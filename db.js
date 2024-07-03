import mongoose from 'mongoose'
const connectDb=async()=>{
    const connect= await mongoose
  .connect(process.env.MONGO_URI, {
    dbName: 'API',
  })
  .then(() => {
    console.log('Database connected')
  })
  .catch((e) => {
    console.log(e)
  })
}

export default connectDb;
