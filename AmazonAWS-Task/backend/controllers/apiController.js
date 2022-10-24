const asyncHandler = require('express-async-handler')
const MongoClient = require('mongodb').MongoClient
// const House = require('../models/houseModel')

const uri = "mongodb://localhost:27017/HouseDatabase"
const client = new MongoClient(uri)

// @desc Get disclosure_date by query
// @route GET /api/disclosure_date?date=dd/mm/yyyy
//@access Private
const getDisclosureByQuery = asyncHandler(async (req, res) => {
    if(!req.query.date){
        res.status(400)
        throw new Error("Add the date to your request")
    }

    const database = client.db("HouseDatabase")
    const house = database.collection('House')

    console.log(`Mongodb connected ${house.collectionName}, and searching for ${req.query.date}`)

    const list = await house.find({disclosure_date: req.query.date})

    if (!list){
        res.status(400)
        throw new Error('No value with specified date was found')
    }
    var arrList = await list.toArray()

    console.log(`Found ${arrList.length}`)
    res.status(200).json(arrList)

})

// @desc Get disclosure_date by date
// @route GET /api/disclosure_date/:date
//@access Private
const getDisclosureByParam = asyncHandler(async (req, res) => {
    if(!req.params.date){
        res.status(400)
        throw new Error('The date parameter was not provided')
    }

    const database = client.db('HouseDatabase')
    const house = database.collection('House')

    console.log(`Connected to ${house.dbName}.${house.collectionName} and looking for records matching ${req.params.date} disclosure date`)

    const list = await house.find({disclosure_date: req.params.date})

    if (!list){
        res.status(400)
        throw new Error(`No record matching diclosure date ${req.params.date}`)
    }

    var arrList = await list.toArray()

    console.log(`Found ${arrList.length}`)

    res.status(200).json(arrList)
})

// @desc Get transaction_date by query
// @route GET /api/transaction_date?date=dd/mm/yyyy
//@access Private
const getTransactionByQuery = asyncHandler(async (req, res) => {
    if(!req.query.date){
        res.status(400)
        throw new Error("Add the date to your request")
    }

    const database = client.db("HouseDatabase")
    const house = database.collection('House')

    console.log(`Mongodb connected ${house.collectionName}, and searching for ${req.query.date}`)

    const list = await house.find({transaction_date: req.query.date})

    if (!list){
        res.status(400)
        throw new Error('No value with specified date was found')
    }
    var arrList = await list.toArray()

    console.log(`Found ${arrList.length}`)
    res.status(200).json(arrList)
})

// @desc Get disclosure_date by date
// @route GET /api/disclosure_date/:date
//@access Private
const getTransactionByParam = asyncHandler(async (req, res) => {
    if(!req.params.date){
        res.status(400)
        throw new Error('The date parameter was not provided')
    }

    const database = client.db('HouseDatabase')
    const house = database.collection('House')

    console.log(`Connected to ${house.dbName}.${house.collectionName} and looking for records matching ${req.params.date} disclosure date`)

    const list = await house.find({disclosure_date: req.params.date})

    if (!list){
        res.status(400)
        throw new Error(`No record matching transaction date ${req.params.date}`)
    }

    var arrList = await list.toArray()

    console.log(`Found ${arrList.length}`)

    res.status(200).json(arrList)
})


module.exports = {
    getDisclosureByQuery, 
    getTransactionByQuery,
    getDisclosureByParam, 
    getTransactionByParam
}