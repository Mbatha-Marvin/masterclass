const express = require('express')
const router = express.Router()

const {getAllUsers, getAllMovies} = require('../controllers/adminController')

router.get('/users', getAllUsers)
router.get('/movies', getAllMovies)

module.exports = router