import express from 'express'
const router = express.Router()
import { createJobNote } from '../controllers/jobNoteController.js'
import { recruiter, protect } from '../middleware/authMiddleware.js'
 
router
    .route('/')
    .post(protect, recruiter, createJobNote)

export default router
