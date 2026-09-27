import express from 'express'
import { loginAdmin } from '../controllers/authController.js'

const authRoute = express.Router()

authRoute.post('/admin-login', loginAdmin)

export default authRoute