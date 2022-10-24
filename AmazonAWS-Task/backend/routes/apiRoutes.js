const express = require('express')
const router = express.Router()

const {
    getDisclosureByQuery, 
    getTransactionByQuery, 
    getDisclosureByParam,
    getTransactionByParam} = require('../controllers/apiController')

router.route('/disclosure_date').get(getDisclosureByQuery)
router.route('/disclosure_date/:date').get(getDisclosureByParam)
router.route('/transaction_date').get(getTransactionByQuery)
router.route('/transaction_date/:date').get(getTransactionByParam)

module.exports = router