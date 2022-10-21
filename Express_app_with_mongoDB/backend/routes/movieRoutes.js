const express = require('express')
const router = express.Router()
const {
    getMovie,
    getMovies, 
    setMovie, 
    updateMovie, 
    deleteMovie } = require('../controllers/movieController.js')


router.route('/').get(getMovies).post(setMovie)
// router.get('/', getMovies)
router.route('/movie').get(getMovie)
// router.post('/', setMovie)

router.route('/:id').put(updateMovie).delete(deleteMovie)
// router.put('/:id', updateMovie)

// router.delete('/:id', deleteMovie)


module.exports = router