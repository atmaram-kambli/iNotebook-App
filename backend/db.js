const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook";
// const mongoURI = "mongodb+srv://user:user123@cluster0.g4hhwms.mongodb.net/inotebook?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);    
        console.log("Connected to Mongo Successfully");        
    } catch (error) {
        console.log(error, "cannot connet to database");        
    }
};

module.exports = connectToMongo;