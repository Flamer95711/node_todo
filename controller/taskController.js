import errHandler from '../middleware/error.js'
import Task from '../modals/taskModal.js'

const newTask = async (req, res,next) => {
 try {
    const { title, details } = req.body
    await Task.create({
      title,
      details,
      user: req.user,
    })
    res.status(201).json({
      success: true,
      message: 'task added 👍🏼',
    })
 } catch (error) {
  next(error)
 }
}

const allTask = async (req, res,next) => {
try {
    const id = req.user._id
    //console.log(req.user)
    //console.log(id)
    const task = await Task.find({ user: id })
    res.status(201).json({
      success: true,
      task,
    })
} catch (error) {
  next(error)
}
}

const updateTask = async (req, res,next) => {
 try {
   const { _id } = req.body
   const updatedTask = await Task.findOne({ _id: _id })
   if (!updateTask) {
     return next(new errHandler('update,task not found', 404))
   }
   //console.log(updatedTask.isCompleted);
   await Task.updateOne(
     { _id: _id },
     {
       isCompleted: !updatedTask.isCompleted,
     }
   )
   res.status(201).json({
     success: true,
     message: 'task updated successfully',
   })
 } catch (error) {
  next(error)
 }
}

const deleteTask = async (req, res,next) => {
 try {
    const { _id } = req.body
    const updatedTask = await Task.findOne({ _id: _id })
    if (!updateTask) {
      return next(new errHandler('delete,task not found', 404))
    }
    const deleteTask = await Task.deleteOne({ _id: _id })
    res.status(201).json({
      success: true,
      message: 'task deleted successfully',
    })
 } catch (error) {
  next(error)
 }
}

export { newTask, allTask, updateTask, deleteTask }
