// server/app.js (or server/index.js)

const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config(); // Load environment variables from .env file

// 1. Construct the Connection String
// There are several ways to construct the MongoDB connection string, depending on your setup:

// A. Standard Connection String (for local development or MongoDB Atlas):
const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/your_database_name"; // Replace with your MongoDB URI

// B. Connection String with Username and Password (for MongoDB Atlas or self-hosted):
// const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

// C. Connection String for MongoDB Compass (if you're using it):
// (Usually looks similar to the standard connection string)

// 2. Connect to MongoDB using Mongoose
mongoose.connect(mongoURI, {
    useNewUrlParser: true, // Required for new connection string format
    useUnifiedTopology: true, // Required for new connection string format
    // useCreateIndex: true, // (Optional) For indexing - might not be needed in newer versions
    // useFindAndModify: false, // (Optional) For deprecation warnings - might not be needed
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

const PORT = process.env.PORT || 5000; // Define your port
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});