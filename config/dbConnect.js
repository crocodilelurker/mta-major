const mongoose = require('mongoose')

const connectDb = async () =>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Db Connected");
    } catch (error) {
        console.error("Error in DB Connection",error);
    }
    finally{
        console.log("dbConnect.js file is executed");
    }
}

module.exports = connectDb;