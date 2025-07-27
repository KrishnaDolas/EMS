import express from 'express'
import AuthMiddleware from '../Middleware/AuthMiddleware.js'
import { addLeave,getLeave } from '../Controllers/LeaveController.js'


const router = express.Router()

router.post('/add', AuthMiddleware, addLeave)
router.get('/:id', AuthMiddleware, getLeave)

export default router