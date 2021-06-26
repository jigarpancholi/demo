import express from 'express'
const router = express.Router()
import { getUsers, getUserById, getUserProfile, deleteUser, updateUser, createUser } from '../controllers/userController.js'
import { admin, protect } from '../middleware/authMiddleware.js'
 
router
    .route('/')
    .get(protect, admin, getUsers)
    .post(protect, admin, createUser)
router.route('/profile').get(protect, getUserProfile)
router
    .route('/:id')
    .get(protect, admin, getUserById)
    .delete(protect, admin, deleteUser)
    .put(protect, admin, updateUser)

export default router
