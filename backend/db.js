const mongoose = require('mongoose');
const mongoURI = "mongodb://localhost:27017/inotebook?directConnection=true&tls=false";

const connectToMongo = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("Connected to Mongo successfully");
    } catch (err) {
        console.error("Error connecting to Mongo:", err);
    }
};

module.exports = connectToMongo;
