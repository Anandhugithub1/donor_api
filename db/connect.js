const mongoose = require('mongoose');
const uri = 'mongodb+srv://anandhu2a2256:anandhu123@cluster0.vuqaskm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';


const connect = async () => {
    try {
        console.log('Connecting to the database...');
        await mongoose.connect(uri);
        console.log('Connected to the database successfully!');
    } catch (error) {
        console.error('Error connecting to the database:', error.message);
    }
};

module.exports = connect;
