const { dateError, deletionError } = require('../exceptions')
// fucntion to verify product
function addProd(product) {

    let regExp = /^(\$?(:?\d+,?)+(?:.?\d+)?)$/
    let d = new Date()

    if (!product.prodName || product.prodName.length < 5 || product.prodName.length > 30)
        return 'Invalid product name. Product name must not be null and must have a minimum of 5 characters and a max of 30.'
    else if (!product.sellerFName || product.sellerFName.length < 5 || product.sellerFName.length > 30)
        return 'Invalid first name. First name must not be null and must have a minimum of 5 characters and a max of 30.'
    else if (!product.sellerLName || product.sellerLName.length < 5 || product.sellerLName.length > 25)
        return 'Invalid last name. Last name must not be null and must have a minimum of 5 characters and a max of 25.'
    else if (!product.sellerEmail || !product.sellerEmail.includes('@') || (product.sellerEmail.match(/@/g)||[]).length > 1)
        return 'Please enter a valid email.'
    else if (!product.sellerPhone || !regExp.test(product.sellerPhone) || product.sellerPhone.length != 10)
        return 'Phone number must have exactly 10 numbers.'
    else if (!regExp.test(product.startPrice))
        return 'Starting price must be a number.'
    else if (product.endDate <= d.getTime())
        throw new dateError('The end date must be in the future.')
    else
        return 1
}

// function to verify delete request
function delProduct(product, doc) {
    
    let d = new Date()

    if (product.endDate < d.getTime())
        throw new dateError('The bid has already ended.')
    else if (doc.length > 0)
        throw new deletionError('There are bids on this product.')
    else
        return 1
}

module.exports = { addProduct: addProd, delProduct: delProduct }