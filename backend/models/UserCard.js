const mongoose = require('mongoose');

const userCardSchema = new mongoose.Schema({
    card : {
        title: String,
        content : String,
        createdby : String,
    },
    date : {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('UserCard', userCardSchema);