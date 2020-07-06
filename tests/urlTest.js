import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../server/index'

chai.use(chaiHttp)
chai.should()

describe("Urls", () => {
    describe("GET /", () => {
      it ("should retieve a specific url", (done) => {
        const id = 1
        chai.request(app)
          .get(`/url/${id}`)
          .end((err, res) => {
            res.should.have.status(200)
            res.body[0].should.be.a('object')
            done()
          });
      });
      it ("should fail to get a url that does not exist", (done) => {
        const id = 99999
        chai.request(app)
          .get(`/url/${id}`)
          .end((err, res) => {
            res.should.have.status(404)
            done()
          });
      });
      it ("should get a list of all urls associated with a sepcific user", (done) => {
        const un = "anon"
        const id = 1
        chai.request(app)
          .get(`/user/${un}/url/${id}`)
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.be.a('array')
            res.body[0].should.be.a('object')
            res.body[0].owner.should.deep.equal('1')
            done()
          })
      })
      it ("should fail to get a list of urls associated with a non-existing user", (done) => {
        const un = "xrj9"
        const id = 99999
        chai.request(app)
          .get(`/user/${un}/url/${id}`)
          .end((err, res) => {
            res.should.have.status(404)
            done()
          });
      });
    })
  })