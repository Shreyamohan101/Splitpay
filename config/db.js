require('dotenv').config()
const mongoose = require('mongoose');
const url = process.env.Url;

const connectDB = async()=>{
    try{
        await mongoose.connect(url,{
            dbName: "splitpay",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("connected");
    }
    catch(err)
    {
        console.error("Could not connectDB to MongoDB:", err);
        throw new Error("Could not connectDB")
    }
};

module.exports = connectDB;