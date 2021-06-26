import mongoose from 'mongoose'

const jobNoteSchema = mongoose.Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'Job'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'User'
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const JobNote = mongoose.model('JobNote', jobNoteSchema)

export default JobNote
