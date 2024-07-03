import express from 'express'
import { isAuthenticated } from '../middleware/auth.js'
import { allTask, deleteTask, newTask, updateTask } from '../controller/taskController.js'

const taskRouter = express.Router()

taskRouter.post('/add', isAuthenticated, newTask)
taskRouter.get('/allTasks',isAuthenticated,allTask)
taskRouter.route('/:id').put(updateTask).delete(deleteTask)
//taskRouter.post('/delete',isAuthenticated,deleteTask)

export default taskRouter
