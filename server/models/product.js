const mongoose = require('mongoose');

var Product = mongoose.model('Product', {
    prodName: { type: String },
    sDesc: { type: String },
    dDesc: { type: String},
    cat: { type: String },
    startPrice: { type: Number },
    endDate: { type: Number },
    sellerFName: { type: String },
    sellerLName: { type: String },
    sellerAdd: { type: String },
    sellerCity: { type: String },
    sellerState: { type: String },
    sellerPhone: { type: String },
    sellerPin: { type: String },
    sellerEmail: { type: String },
},'products')

module.exports = { Product }