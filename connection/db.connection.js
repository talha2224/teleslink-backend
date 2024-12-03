const mongoose = require("mongoose")
require("dotenv").config()

const dbConnection = ()=>{
    let connection = mongoose.connect(process.env.DBURL)
    if(connection){
        console.log('DB CONNECTED')
    }
    else{
        console.log('Db Not Connected')
    }
}


module.exports= {dbConnection}