const asyncHandler = require('express-async-handler')

const Movie = require('../models/movieModel')
const User = require('../models/userModel')

// @desc Get user credentials
// @route GET /api/users/admin/users
//@access Private
const getAllUsers = asyncHandler( async (req, res) => {
    const allUsers = await User.find()

    res.json(allUsers)
})

const getAllMovies = asyncHandler( async (req, res) => {
    const allMovies = await Movie.find()

    res.json(allMovies)
})

module.exports = {
    getAllUsers,
    getAllMovies,
}