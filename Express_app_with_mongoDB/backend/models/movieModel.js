const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    movie: {
        type: String,
        required: [true, 'Add the movie value']
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Movie', movieSchema)