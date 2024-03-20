const mongoose = require('mongoose');

const connect = async () => {
    try {
        console.log('Connecting to the database...');
        const uri = process.env.uri;
        await mongoose.connect(uri);
        console.log('Connected to the database successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
};

module.exports = connect;
