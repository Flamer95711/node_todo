import mongoose from 'mongoose'
const userSchema = mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  details: {
    type: String,
    require: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: 'API',
  },
  isCompleted: {
    type: Boolean,
    default:false,
  },
  endDate: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
})
const Task = mongoose.model('task', userSchema)

export default Task
