const asyncHandler = require('express-async-handler')

const Movie = require('../models/movieModel')

// @desc Get movies
// @route GET /api/movies
//@access Private
const getMovies = asyncHandler(async(req, res) => {
    const movies = await Movie.find()
    res.status(200).json(movies)
})


// @desc Post movies
// @route POST /api/movies
// @access private
const setMovie = asyncHandler(async(req, res) => {
    if (!req.body.movie){
        res.status(400)
        throw new Error("Add the Movie to your request")
    }

    const movie = await Movie.create({
        movie: req.body.movie
    })

    res.status(200).json(movie)
})

// @desc Update movies
// @route PUT /api/movies
// @access private
const updateMovie = asyncHandler(async(req, res) => {

    const movie = await Movie.findById(req.params.id)

    if(!movie){
        res.status(400)
        throw new Error('Goal not found')
    }

    const updatedMovie = await Movie.findByIdAndUpdate(req.params.id,req.body,[{
        new: true
    }])

    res.status(200).json(updatedMovie)
})

// @desc Delete movies
// @route DELETE /api/movies
// @access private
const deleteMovie = asyncHandler(async (req, res) => {

    const movie = await Movie.findById(req.params.id)

    if(!movie){
        res.status(400)
        throw new Error('Goal not found')
    }

    await movie.remove()

    res.status(200).json({ id: req.params.id})
})

module.exports = {
    getMovies, setMovie, updateMovie, deleteMovie
}