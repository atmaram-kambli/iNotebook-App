require('dotenv').config();

const mongoose = require('mongoose');
// const mongoURI = "mongodb://localhost:27017/inotebook";
const mongoURI = process.env.MONGO_DB_CLOUD;

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);    
        console.log("Connected to Mongo Successfully");        
    } catch (error) {
        console.log(error, "cannot connet to database");        
    }
};

module.exports = connectToMongo;