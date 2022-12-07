let chai = require("chai")
let chaiHttp = require("chai-http")
let server = require("../index.js")
let expect = chai.expect
//Assertion style chai.should
chai.should()

chai.use(chaiHttp)

describe('E-Auction API', () => {
    /*
    Test adding a product
    */
   describe("POST /seller/add-product", () => {
    it ("It should POST the product", (done) => {
        let test_product = {
            prodName: "This is a test",
            sDesc: "test",
            dDesc: "test",
            cat: "Painting",
            startPrice: 1.00,
            endDate: 1672427804000,
            sellerFName: "Johnn",
            sellerLName: "Smith",
            sellerAdd: "124 Freedom Ln",
            sellerCity: "Concord",
            sellerState: "NH",
            sellerPhone: 1234567890,
            sellerPin: 1234,
            sellerEmail: "test21@test.com"
        }
        chai.request('http://localhost:3000')
            .post("/e-auction/api/v1/seller/add-product")
            .send(test_product)
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('Product added!')
                res.body.product.should.have.property('prodName')
                res.body.product.should.have.property('sDesc')
                res.body.product.should.have.property('dDesc')
                res.body.product.should.have.property('cat')
                res.body.product.should.have.property('startPrice')
                res.body.product.should.have.property('endDate')
                res.body.product.should.have.property('sellerFName')
                res.body.product.should.have.property('sellerLName')
                res.body.product.should.have.property('sellerAdd')
                res.body.product.should.have.property('sellerCity')
                res.body.product.should.have.property('sellerState')
                res.body.product.should.have.property('sellerPhone')
                res.body.product.should.have.property('sellerPin')
                res.body.product.should.have.property('sellerEmail')
             done()
            })
    })
    it ('It should not POST the product', (done) => {
        let test_product = {
            prodName: "This is a test",
            sDesc: "test",
            dDesc: "test",
            cat: "Painting",
            startPrice: 1.00,
            endDate: 1672427804000,
            sellerFName: "John",
            sellerLName: "Smith",
            sellerAdd: "124 Freedom Ln",
            sellerCity: "Concord",
            sellerState: "NH",
            sellerPhone: 1234567890,
            sellerPin: 1234,
            sellerEmail: "test@test.com"
        }
        chai.request('http://localhost:3000')
            .post("/e-auction/api/v1/seller/add-product")
            .send(test_product)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.property('message').eql("Invalid first name. First name must not be null and must have a minimum of 5 characters and a max of 30.")
             done()
            })
    })
   })

   /*
   Test deleting a prodcut
   */
  describe('DELETE seller/product', () => {
    it ('It should DELETE the product', (done) => {
        chai.request('http://localhost:3000')
            .delete("/e-auction/api/v1/seller/delete/638e6e3c998cdc7dfec1c2d5")
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('Product deleted!')
             done()
            })
    })
  })


   /*
   Test adding bids
   */
   describe("POST /buyer/place-bid", () => {
    it ("It should POST the bid", (done) => {
        const rand = Math.random().toString().substr(2, 8); 
        let test_bid = {
            buyerFName: "Guyyy",
            buyerLName: "McGee",
            buyerAdd: "111 Something rd",
            buyerCity: "Somewhere",
            buyerState: "State",
            buyerPhone: 1111111111,
            buyerPin: 1234,
            buyerEmail: rand + "@bids.com",
            prodId: "6387b76860047ba1978f4b74",
            bidAmount: 15.72,
        }
        chai.request('http://localhost:3000')
            .post('/e-auction/api/v1/buyer/palce-bid')
            .send(test_bid)
            .end((err, res) => {
                res.should.have.status(201)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('Bid added for user: ' + rand + '@bids.com')
                res.body.bid.should.have.property('buyerFName')
                res.body.bid.should.have.property('buyerLName')
                res.body.bid.should.have.property('buyerAdd')
                res.body.bid.should.have.property('buyerCity')
                res.body.bid.should.have.property('buyerState')
                res.body.bid.should.have.property('buyerPhone')
                res.body.bid.should.have.property('buyerPin')
                res.body.bid.should.have.property('buyerEmail')
                res.body.bid.should.have.property('prodId')
                res.body.bid.should.have.property('bidAmount')
                res.body.bid.buyerEmail.should.eql(test_bid.buyerEmail)
                done()
            })

    })
   })

   describe("POST /buyer/place-bid", () => {
    it ("It should not POST the bid", (done) => {
         
        let test_bid = {
            buyerFName: "Guyyy",
            buyerLName: "McGee",
            buyerAdd: "111 Something rd",
            buyerCity: "Somewhere",
            buyerState: "State",
            buyerPhone: 1111111111,
            buyerPin: 1234,
            buyerEmail: "buyer22@bids.com",
            prodId: "6387b76860047ba1978f4b74",
            bidAmount: 15.72,
        }
        chai.request('http://localhost:3000')
            .post('/e-auction/api/v1/buyer/palce-bid')
            .send(test_bid)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('A bid for this email already exists.')
                done()
            })

    })
   })

   /*
   Getting bids
   */
   describe("GET /seller/show-bids", () => {
    it ("It should get all of the bids for product 638a1f87dfbb926a9232aafd", (done) => {
        chai.request('http://localhost:3000')
            .get('/e-auction/api/v1/seller/show-bids/638a1f87dfbb926a9232aafd')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('Bids retrieved!')
                expect(res.body.docs).to.have.lengthOf(9)
                done()
            })

    })
   })

   /*
   Getting producs
    */
   describe("GET /seller/products/test@test.com", () => {
    it ("It should get all of the products for user test@test.com", (done) => {
        chai.request('http://localhost:3000')
            .get('/e-auction/api/v1/seller/products/test@test.com')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('Products retrieved!')
                expect(res.body.docs).to.have.lengthOf(55)
                done()
            })

    })
   })
   /*
   Patching bid
   */
   describe("Patch /buyer/update-bid/6387b76860047ba1978f4b74/29753849@bids.com/$$$", () => {
    it ("It should update bid for user 29753849@bids.com", (done) => {
        chai.request('http://localhost:3000')
            .patch('/e-auction/api/v1/buyer/update-bid/6387b76860047ba1978f4b74/29753849@bids.com/98.32')
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('message').eql('Bid updated!')
                done()
            })

    })
   })


})