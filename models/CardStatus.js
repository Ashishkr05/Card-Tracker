const mongoose = require('mongoose');

const CardStatusSchema = new mongoose.Schema({
    cardID: String,
    userMobile: String,
    timestamp: Date,
    status: String,
    comment: String,
});

const CardStatus = mongoose.model('CardStatus', CardStatusSchema);
module.exports = CardStatus;