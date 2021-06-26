import express from 'express'
const router = express.Router()
import { createJob, getJobs } from '../controllers/jobController.js'
import { client, protect } from '../middleware/authMiddleware.js'
 
router
    .route('/')
    .post(protect, client, createJob)
    .get(protect, client, getJobs)

export default router
