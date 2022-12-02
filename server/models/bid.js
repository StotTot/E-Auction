const mongoose = require('mongoose');

var Bid = mongoose.model('Bid', {
    buyerFName: { type: String },
    buyerLName: { type: String },
    buyerAdd: { type: String },
    buyerCity: { type: String },
    buyerState: { type: String },
    buyerPhone: { type: String },
    buyerPin: { type: String },
    buyerEmail: { type: String },
    prodId: { type: String },
    bidAmount: { type: Number }
},'bids')

module.exports = { Bid }