const express = require('express')
var router = express.Router()

const { Product } = require('../models/product')
const verifyProduct = require('../services/productService')

// Post localhost:3000/e-auction/api/v1/seller/add-product
router.post('/seller/add-product', (req, res) => {
    let product = new Product ({
        prodName: req.body.prodName,
        sDesc: req.body.sDesc,
        dDesc: req.body.dDesc,
        cat: req.body.cat,
        startPrice: req.body.startPrice,
        endDate: req.body.endDate,
        sellerFName: req.body.sellerFName,
        sellerLName: req.body.sellerLName,
        sellerAdd: req.body.sellerAdd,
        sellerCity: req.body.sellerCity,
        sellerState: req.body.sellerState,
        sellerPhone: req.body.sellerPhone,
        sellerPin: req.body.sellerPin,
        sellerEmail: req.body.sellerEmail,
    })
    let valid = verifyProduct.verifyProduct(product)
    if (valid == 1) {
        product.save((err, doc) => {
            if (!err) { res.status(201).json({ message: "Product added!", product}) }
            else { console.log('Error in saving product: ' + JSON.stringify(err, undefined, 2)) }
        })
    }
    else
        res.status(400).json({ message: valid })
})

module.exports = router