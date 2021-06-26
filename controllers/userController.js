import asyncHandler from 'express-async-handler'
import User from '../models/userModel.js'

// @desc      Featch all users
// @route     GET /api/users
// @access    Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})

    res.json(users)
})

// @desc      Featch single user
// @route     GET /api/users/:id
// @access    Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id).select('-password')

    if (user) {
        res.json(user)
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc      Delete user
// @route     DELETE /api/users/:id
// @access    Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: 'User removed' })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc      Update user
// @route     GET /api/users/:id
// @access    Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.roles = req.body.roles || user.roles

        const updatesUser = await user.save()

        res.json({
            _id: updatesUser.id,
            name: updatesUser.name,
            email: updatesUser.email,
            roles: updatesUser.roles,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

// @desc      Get user profile
// @route     GET /api/users/profile
// @access    Private/Admin
const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }
})

const createUser = asyncHandler(async (req, res) => {
    const { name, email, password, roles } = req.body

    const userExist = await User.findOne({ email })

    if (userExist) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
        password,
        roles
    })

    if (user) {
        res.status(201).json({
            _id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles
        })
    } else {
        res.status(400)
        throw new Error('Invalid data')
    }
})

export { 
    getUsers, 
    getUserById, 
    getUserProfile, 
    updateUser, 
    deleteUser, 
    createUser 
}
