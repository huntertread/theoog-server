import chai from 'chai'
import chaiHttp from 'chai-http'
import app from '../server/index'

chai.use(chaiHttp)
chai.should()

describe("Users", () => {
  describe("GET /", () => {
    it ("should get a specific user record", (done) => {
      const un = 'anon'
      chai.request(app)
        .get(`/user/${un}`)
        .end((err, res) => {
          res.should.have.status(200)
          res.body[0].should.be.a('object')
          done()
        });
    });
    it ("should fail to get a user that does not exist", (done) => {
      const un = 'xjz9'
      chai.request(app)
        .get(`/user/${un}`)
        .end((err, res) => {
          res.should.have.status(404)
          done()
        });
    });
  })
})