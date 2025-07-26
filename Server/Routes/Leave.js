import express from 'express'
import AuthMiddleware from '../Middleware/AuthMiddleware.js'
import { addLeave } from '../Controllers/LeaveController.js'


const router = express.Router()

router.post('/add', AuthMiddleware, addLeave)

export default router