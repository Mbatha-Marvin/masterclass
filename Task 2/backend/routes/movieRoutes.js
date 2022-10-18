const express = require('express')
const router = express.Router()
const {
    getMovies, 
    setMovie, 
    updateMovie, 
    deleteMovie } = require('../controllers/movieController.js')


router.route('/').get(getMovies).post(setMovie)
// router.get('/', getMovies)

// router.post('/', setMovie)

router.route('/:id').put(updateMovie).delete(deleteMovie)
// router.put('/:id', updateMovie)

// router.delete('/:id', deleteMovie)


module.exports = router