const mongoose = require('mongoose')

const houseSchema = mongoose.Schema({
    disclosure_year: {type:String},
    disclosure_date: {type: String},
    transaction_date: {type:String},
    owner: {type: String},
    ticker: {type:String},
    asset_description: {type: String},
    type: {type: String},
    amount: {type: String},
    representative: {type: String},
    district: {type:String},
    ptr_link:{type: String},
    cap_gains_over_200_usd: {type:Boolean}

})

module.exports = mongoose.model('House', houseSchema)