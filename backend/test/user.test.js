const db = require('../models')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

const should = chai.should()

chai.use(chaiHttp)
const user = {
  firstname: 'John',
  lastname: 'Doe',
  username: 'jdoee',
  password: 'password',
}
describe('User', () => {
  before(async () => {
    await db.sequelize.sync()
  })
  describe('/PUT create user', () => {
    const url = '/api/user/signup'
    it('create user', done => {
      chai
        .request(app)
        .post(url)
        .send({ data: user })
        .end((err, res) => {
          console.log(res)
          res.should.have.status(200)
          done()
        })
    })

    it('missing fields error', done => {
      chai
        .request(app)
        .post(url)
        .send({ data: {} })
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })

    it('user already exist error', done => {
      chai
        .request(app)
        .post(url)
        .send({ data: user })
        .end((err, res) => {
          chai
            .request(app)
            .post(url)
            .send({})
            .end((err, res) => {
              res.should.have.status(400)
              done()
            })
        })
    })
  })

  describe('/put signin', () => {
    // create user
    before(async () => {
      await chai.request(app).post('/api/user/signup').send({ data: user })
    })
    it('login successfully', done => {
      chai
        .request(app)
        .post('/api/user/signin')
        .send(user)
        .end((err, res) => {
          res.should.have.status(200)
          done()
        })
    })

    it('login fail with wrong password', done => {
      chai
        .request(app)
        .post('/api/user/signin')
        .send({ username: user.username, password: 'wrong' })
        .end((err, res) => {
          res.should.have.status(400)
          done()
        })
    })

    it('login fail with wrong email', done => {
      chai
        .request(app)
        .post('/api/user/signin')
        .send({ username: 'wrong', password: user.password })
        .end((err, res) => {
          res.should.have.status(404)
          done()
        })
    })
  })
})
