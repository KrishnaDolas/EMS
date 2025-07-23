import express from 'express'
import AuthMiddleware from '../Middleware/AuthMiddleware.js'
import { addEmployee,upload,getEmployees,getEmployee } from '../Controllers/employeeController.js'
// ,getDepartments,getDepartment,updateDepartment,deleteDepartment

const router =  express.Router()

router.get('/', AuthMiddleware,getEmployees)
router.post('/add', AuthMiddleware,upload.single('image'),addEmployee)
router.get('/:id', AuthMiddleware,getEmployee)
// router.put('/:id', AuthMiddleware,updateDepartment)
// router.delete('/:id', AuthMiddleware,deleteDepartment)

export default router