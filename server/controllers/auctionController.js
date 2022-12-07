const express = require('express')
const { dateError, emailError } = require('../exceptions')
const router = express.Router()

const { Bid } = require('../models/bid')
const { Product } = require('../models/product')
const verifyProduct = require('../services/productService')
const verifyBid = require('../services/bidService')

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
    try {
        let valid = verifyProduct.addProduct(product)
        if (valid == 1) {
            product.save((err, doc) => {
                if (!err) { res.status(201).json({ message: 'Product added!', product}) }
                else { console.log('Error in saving product: ' + JSON.stringify(err, undefined, 2)) }
            })
        }
        else
            res.status(400).json({ message: valid })
    } catch (dateError) {
        res.status(400).json({ message: dateError.message })
    }
})

// Delete product localhost:3000/e-auction/api/v1/seller/delete/{productId}
router.delete('/seller/delete/:productId', (req, res) => {
    

    Product.findById(req.params.productId, (err, product) => {
        if (!err && product != null) {
            try {
                
                Bid.find({ prodId: req.params.productId }, (err, doc) => {
                    try {
                        let valid = verifyProduct.delProduct(product, doc)
                        if (valid == 1) {
                            Product.findByIdAndDelete(req.params.productId, (err, doc) => {
                                if (!err) { res.status(200).json({ message: 'Product deleted!'}) }
                                else { console.log('Error in deleting product: ' + JSON.stringify(err, undefined, 2)) }
                            })
                        }
                        else
                            res.status(400).json({ message: "Error in deleting product." })
                    } catch (deletionError) {
                        res.status(400).json({ message: deletionError.message })
                    }
                })

            } catch (e) {
                res.status(400).json({ message: dateError.message })
            }
        }
        else { 
            console.log('Error in retriving product for deletion: ' + JSON.stringify(err, undefined, 2))
            res.status(404).json({ message: 'Cannot find product.' })
         }
    });

})

// Post localhost:3000/e-auction/api/v1/buyer/palce-bid
router.post('/buyer/palce-bid', (req, res) => {
    let bid = new Bid ({
        buyerFName: req.body.buyerFName,
        buyerLName: req.body.buyerLName,
        buyerAdd: req.body.buyerAdd,
        buyerCity: req.body.buyerCity,
        buyerState: req.body.buyerState,
        buyerPhone: req.body.buyerPhone,
        buyerPin: req.body.buyerPin,
        buyerEmail: req.body.buyerEmail,
        prodId: req.body.prodId,
        bidAmount: req.body.bidAmount
    })
    Product.findById(req.body.prodId, (err, product) => {
        if (!err && product != null) {

            try {
                // check if bid for email already exists
                Bid.findOne({ buyerEmail: req.body.buyerEmail, prodId: req.body.prodId }, (err, doc) => {
                    try {
                        verifyBid.checkEmail(doc, req.body.buyerEmail)
                        let valid = verifyBid.addBid(bid, product)

                        if (valid == 1) {
                            bid.save((err, doc) => {
                                if (!err) { res.status(201).json({ message: 'Bid added for user: ' + bid.buyerEmail, bid }) }
                                else { console.log('Error in adding bid: ' + JSON.stringify(err, undefined, 2)) }
                            })
                        }
                        else
                            res.status(404).json({ message: valid })
                    } catch (emailError) {
                        res.status(400).json({ message: emailError.message })
                    }
                })

            } catch (dateError) {
                res.status(400).json({ message: dateError.message })                   
            }
        }
        else { 
            console.log('Error in retriving product for bid: ' + JSON.stringify(err, undefined, 2))
            res.status(404).json({ message: 'Cannot find product.' })
         }
    });

})

// Patch for updating bid
router.patch('/buyer/update-bid/:productId/:buyerEmail/:newBid', (req, res) => {
    Bid.findOne({ buyerEmail: req.params.buyerEmail, prodId: req.params.productId }, (err, doc) => {
        if (!err && doc != null) {
                try {
                    Product.findById(req.params.productId, (err, product) => {
                        let valid = verifyBid.checkBidUpdate(req.params.newBid, doc, product)
                        if (valid == 1) {
                            Bid.updateOne({ buyerEmail: req.params.buyerEmail, prodId: req.params.productId }, { bidAmount: req.params.newBid }, (err, newBid) => {
                                if (!err) { res.status(200).json({ message: 'Bid updated!' }) }
                                else { console.log('Error in updating bid: ' + JSON.stringify(err, undefined, 2)) }
                            })
                        }
                        else
                            res.status(400).json({ message: valid })
                    })
                } catch (dateError) {
                    res.status(400).json({ message: dateError.message })
                }

        }
        else {
            console.log('Error in retriving bid for patch: ' + JSON.stringify(err, undefined, 2))
            res.status(404).json({ message: 'Cannot find bid.' })
        }

    })
})

// Get bids for product
router.get('/seller/show-bids/:productId', (req, res) => {
    Bid.find({ prodId: req.params.productId }, (err, docs) => {
        if (!err) { res.status(200).json({ message: 'Bids retrieved!', docs }) }
        else { console.log('Error in retreiving bids: ' + JSON.stringify(err, undefined, 2)) }
    })
})

// Get all products for seller
router.get ('/seller/products/:sellerEmail', (req, res) => {
    Product.find({ sellerEmail: req.params.sellerEmail }, (err, docs) => {
        if (!err) { res.status(200).json({ message: 'Products retrieved!', docs }) }
        else { console.log('Error in retreiving products: ' + JSON.stringify(err, undefined, 2)) }
    })
})

module.exports = router