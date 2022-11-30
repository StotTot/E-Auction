let chai = require("chai")
let chaiHttp = require("chai-http")
let server = require("../index.js")

//Assertion style chai.should
chai.should()

chai.use(chaiHttp)

describe('E-Auction API', () => {
    /*
    Test Post operation
    */
   describe("POST /seller/add-product", () => {
    it("It should POST the product", (done) => {
        let product = {
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
            sellerPin: 0000,
            sellerEmail: "test@test.com"
        }
        chai.request('http://localhost:3000')
            .post("/e-auction/api/v1/seller/add-product")
            .send(product)
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
    it('It should not POST the product', (done) => {
        let product = {
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
            sellerPin: 0000,
            sellerEmail: "test@test.com"
        }
        chai.request('http://localhost:3000')
            .post("/e-auction/api/v1/seller/add-product")
            .send(product)
            .end((err, res) => {
                res.should.have.status(400)
                res.body.should.be.a('object')
                res.body.should.property('message').eql("Invalid first name. First name must not be null and must have a minimum of 5 characters and a max of 30.")
             done()
            })
    })
   })
})