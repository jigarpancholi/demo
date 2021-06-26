import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc      Featch all users
// @route     POST /api/auth
// @access    Public
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({ email })

    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user.id,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id)
        })
    } else {
        res.status(401)
        throw new Error('Invalid email or password')
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password,
        roles: ['ROLE_CLIENT']
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email,
            roles: user.roles,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

export { authUser, registerUser }
