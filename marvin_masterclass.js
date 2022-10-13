const https = require('https');
const sqlite3 = require('sqlite3');
const fs = require('fs');
const { config } = require('process');

console.log('Fetching Data ..................Kindly be patient............................')

let url = "https://www.datim.org/api/sqlViews/fgUtV6e9YIX/data.json";


let json;

https.get(url,(res) => {
    let body = "";

    res.on("data", (chunk) => {
        body += chunk;
    });

    res.on("end", () => {
        try {
            json = JSON.parse(body);
            console.log('Data recieved .............Parsing the data..................');
            

        } catch (error) {
            console.error(error.message);
        };
    });

}).on("error", (error) => {
    console.error(error.message);
});



setTimeout(() => {

    const myFirst = json.listGrid.headers
    console.log('A list of column names: ')

    //getting the columns names
    let columnNames = []
    for (let index = 0; index < myFirst.length; index++){
        // console.log(myFirst[index].name)
        columnNames.push(myFirst[index].name)
    } 
    console.log(columnNames)
    // console.log(Object.keys(myFirst))


    //getting the rows data
    console.log('Retrieving the rows data from thr json object.....')
    RowsData = json.listGrid.rows 


var db;

//create the database if it does not exist and populate it 
if (!fs.existsSync('myFirst.db')){
    db = new sqlite3.Database('./myFirst.db',(err) => {
        if (err){
            console.log(err)
        }else{
            console.log('Database created Successfully')
        }
    })
    
    setTimeout( () => {
        db.run(`create table masterclass (mechanism text, code text, uid text, partner text,  primeid text, agency text, ou text, startdate text, enddate text)`);
        console.log('Created the table successfully')
    }, 300);
    
    //waiting for the database table to be created before inserting data
    setTimeout( () => {

        for (let record = 0; record < RowsData.length; record++){
            db.run(`
            insert into masterclass (mechanism, code, uid, partner, primeid, agency, ou, startdate, enddate) values (?, ?, ?, ?, ?, ?, ?, ?, ?);`, 
                [RowsData[record][0],RowsData[record][1],RowsData[record][2]
                ,RowsData[record][3],RowsData[record][4],RowsData[record][5],
                RowsData[record][6],RowsData[record][7],RowsData[record][8]], 
            (err) => {
                    if (err){
                        console.log(err)
                    }else {
                        console.log('succesfully inserted')
                    }
                })
        }
    }, 1500);
    
}else{
    db = new sqlite3.Database('./myFirst.db',(err) => {
        if (err){
            console.log(err)
        }else{
            console.log('Database connected Successfully')
        }
    })
    console.log('The database already exist')
}

let queryData = []
setTimeout(() => {

    db.all('select * from masterclass',[], (err, rows) => {
        if (err){
            console.log(err);
        }else{
            rows.forEach((row) =>{
            queryData.push(row)
            // console.log(row)
            })
        }
    //console.log(queryData)
    })
}, 2000);



setTimeout(() => {
    console.log('The data below is from the database query .............')
    console.log(queryData)
    console.log('Total query item ' + queryData.length)
    console.log('End of data query data.............................')
}, 5000);

// setTimeout(() => {
//     db.close()
// }, 20000)



}, 95000);

