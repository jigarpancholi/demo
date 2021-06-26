import express from 'express'
const router = express.Router()
import { authUser, registerUser } from '../controllers/securityController.js'
 
router.post('/login', authUser)
router.post('/register', registerUser)

export default router
