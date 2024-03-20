const mongoose = require('mongoose');


const connect = async (uri) => {
    try {
        console.log('Connecting to the database...');
        await mongoose.connect(uri);
        console.log('Connected to the database successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
};

module.exports = connect;
