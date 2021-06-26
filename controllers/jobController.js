import asyncHandler from 'express-async-handler'
import Job from '../models/jobModel.js'
import User from '../models/userModel.js'

// @desc      Create job
// @route     POST /api/jobs
// @access    Private/Client
const createJob = asyncHandler(async (req, res) => {
    const { title, description } = req.body

    const user = await User.findById(req.user._id)

    const job = await Job.create({
        title,
        description,
        user: user._id
    })

    if (job) {
        res.status(201).json({
            _id: job.id,
            title: job.title,
            description: job.description
        })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

// @desc      Featch all jobs
// @route     GET /api/jobs
// @access    Private/Client
const getJobs = asyncHandler(async (req, res) => {
    const jobs = await Job.find({})

    res.json(jobs)
})

export { 
    createJob,
    getJobs
}
