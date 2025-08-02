const mongoose = require('mongoose');
require('dotenv').config();


const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`✅MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error(`❌Error: ${err.message}`);
        throw err;
        //process.exit(1); 
    }
};

// __mocks__/config/db.js
module.exports = jest.fn().mockResolvedValue(true); // Mock successful connection

module.exports = connectDB;