const mongoose = require('mongoose');
const { CONNECTION_STRING } = require('./env');

exports.initDB = () => {
    try {
        mongoose.connection.on('open', () => console.log('DB is connected!'));
        return mongoose.connect(CONNECTION_STRING, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        
    } catch(err) {
        console.log(err.message);
        return process.exit(1);
    }
};