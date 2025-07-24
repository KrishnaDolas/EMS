import express from 'express'
import AuthMiddleware from '../Middleware/AuthMiddleware.js'
import { addEmployee,upload,getEmployees,getEmployee,updateEmployee } from '../Controllers/EmployeeController.js'

const router =  express.Router()

router.get('/', AuthMiddleware,getEmployees)
router.post('/add', AuthMiddleware,upload.single('image'),addEmployee)
router.get('/:id', AuthMiddleware,getEmployee)
router.put('/:id', AuthMiddleware,updateEmployee)
// router.delete('/:id', AuthMiddleware,deleteDepartment)

export default router