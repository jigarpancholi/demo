import asyncHandler from 'express-async-handler'
import Job from '../models/jobModel.js'
import JobNote from '../models/jobNoteModel.js'
import User from '../models/userModel.js'

// @desc      Create job
// @route     POST /api/job-notes
// @access    Private/Recruiter
const createJobNote = asyncHandler(async (req, res) => {
    const { comment, job_id } = req.body

    const user = await User.findById(req.user._id)

    const jobNote = await JobNote.create({
        comment,
        job: job_id,
        user: user._id
    })

    if (jobNote) {
        res.status(201).json({
            _id: jobNote.id,
            title: jobNote.comment
        })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

// @desc      Featch all jobs
// @route     GET /api/jobs
// @access    Private/Client
// const getJobs = asyncHandler(async (req, res) => {
//     const jobs = await Job.find({})

//     res.json(jobs)
// })

export { 
    createJobNote,
    // getJobs
}
