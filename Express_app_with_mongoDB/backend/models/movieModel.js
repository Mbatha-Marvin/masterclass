const mongoose = require('mongoose')

const movieSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'User',
    },
    movie: {
        type: String,
        required: [true, 'Add the movie value'],
        unique: true
    }
},
{
    timestamps: true,
})

module.exports = mongoose.model('Movie', movieSchema)