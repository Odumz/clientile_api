/**
 *  Create a connection function for mongodb
 *  Start a local mongodb server connection
 *  Test for database connection or disconnection
 */

const mongoose = require("mongoose"),
   dotenv = require("dotenv");

// Config Env   
dotenv.config();

const { MONGO_URI } = process.env;

// create the connection function
const connectDB = async () => {
try {
   await mongoose.connect(MONGO_URI, {
       useNewUrlParser: true,
       useUnifiedTopology: true
   });

   console.log("MongoDB connection successful");

   // seed data
} catch (error) {
   console.error(error.message)
   console.log("MongoDB connection fail");
   process.exit(1);
}
}

module.exports = connectDB;