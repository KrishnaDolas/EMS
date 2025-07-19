import express from 'express'
import AuthMiddleware from '../Middleware/AuthMiddleware.js'
import { addDepartment,getDepartments } from '../Controllers/departmentController.js'

const router =  express.Router()

router.get('/', AuthMiddleware,getDepartments)
router.post('/add', AuthMiddleware,addDepartment)

export default router