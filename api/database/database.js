const mongoose = require('mongoose');
require('dotenv').config()

const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
};

module.exports = function(){
    mongoose.connect(process.env.DB_URI, options)
        .then(() => console.log('Connected to MongoDB...'))
}