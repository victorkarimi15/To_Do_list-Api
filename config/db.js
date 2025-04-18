const mongoose = require('mongoose');

const connectDB = async () => {

    try {
        await mongoose.connect('mongodb://127.0.0.1/to_do_list');

        // console.log('connected to Database!');
    } catch(err) {
        console.error('Error connecting to DB...' + err)
    }

    // connection event
    mongoose.connection.on('connected', () => console.log('Connected to Database!'));
    mongoose.connection.on('disconnected', () => {
        console.log('Connection Interrupted !! \n Connect to database again!');

        process.exit(1);
    });
}

module.exports = connectDB;