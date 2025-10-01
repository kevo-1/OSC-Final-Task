const mongoose = require('mongoose');
require('dotenv').config();

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.Mongo_URL);
        console.log("Connected to Database successfully");
    } catch(error) {
        console.log("Failed to connect to Database");
    }
}
module.exports = {connectDb}