const request = require('request')
const MongoClient = require('mongodb').MongoClient

const url = "https://house-stock-watcher-data.s3-us-west-2.amazonaws.com/data/all_transactions.json"

//fetch the data and create a database
async function run(){
    let json =[]
    request.get(url, async (err, res, body) => {
        json = await JSON.parse(body)
        console.log(json.length)
        console.log(typeof(json))
        console.log(json[json.length-1].transaction_date)

        console.log('started editing the files')
        for (let i = 0; i < json.length; i++){
            let splitDate = json[i].disclosure_date.split('/')
            json[i].disclosure_date = `${splitDate[0]}-${splitDate[1]}-${splitDate[2]}`
            let splitDate2 = json[i].transaction_date.split('-')
            json[i].transaction_date = `${splitDate2[2]}-${splitDate2[1]}-${splitDate2[0]}`
    
        }
        console.log('Done Editing the dates')
        console.log(json[json.length-1].transaction_date)

        const uri = "mongodb://localhost:27017"
        const client = new MongoClient(uri)
        const database = client.db("HouseDatabase")
        const house = database.collection('House')

        const options = {ordered: true}

        const result = await house.insertMany(json, options)

        console.log(`${result.insertedCount} documents were inserted`)

        await client.close()
        console.log("connection closed")
    })
}

run().catch(console.dir);