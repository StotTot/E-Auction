const { dateError, emailError } = require('../../exceptions')

// function to add a bid
function addBid(bid, product) {

    let regExp = /^(\$?(:?\d+,?)+(?:.?\d+)?)$/
    let d = new Date()

    if (!bid.buyerFName || bid.buyerFName.length < 5 || bid.buyerFName.length > 30) 
        return 'Invalid first name. First name must not be null and must have a minimum of 5 characters and a max of 30.'
    else if (!bid.buyerLName || bid.buyerLName.length < 5 || bid.buyerLName.length > 25)
        return 'Invalid last name. Last name must not be null and must have a minimum of 5 characters and a max of 25.'
    else if (!bid.buyerEmail || !bid.buyerEmail.includes('@') || (bid.buyerEmail.match(/@/g)||[]).length > 1)
        return 'Please enter a valid email.'
    else if (!bid.buyerPhone || !regExp.test(bid.buyerPhone) || bid.buyerPhone.length != 10)
        return 'Phone number must have exactly 10 numbers.'
    else if (product.endDate <= d.getTime())
        throw new dateError('The bid is over.')
    else
        return 1
}

// fucntion to check if bid for email already exists
function checkEmail(doc) {
    
    if (doc.length > 0)
        throw new emailError('A bid for this email already exists.')
    else
        return 1
}

// fucntion to check if the update is proper
function checkBidUpdate(newAmount, bid, product) {

    let d = new Date()

    if (product.endDate <= d.getTime())
        throw new dateError('The bid is over.')
    else if (bid.bidAmount > newAmount)
        return 'Provided amount is lower than your current bid.'
    else
        return 1
}

module.exports = { addBid: addBid, checkEmail: checkEmail, checkBidUpdate: checkBidUpdate }