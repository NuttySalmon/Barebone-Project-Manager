const db = require('../models')
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

const should = chai.should()
// const requrester = chai.request(app).keepOpen()
chai.use(chaiHttp)
let header = {}

describe('Story', () => {
  // create user and login
  before(async () => {
    await db.sequelize.sync()
    const user = {
      firstname: 'John',
      lastname: 'Doe',
      username: 'jdoe',
      password: 'password',
    }
    await chai.request(app).post('/api/user/signup').send(user)
    result = await chai.request(app).post('/api/user/signin').send(user)
    header.Authorization = `Bearer ${result.body.token}`
  })
  describe('/GET story', () => {
    it('Get all users', done => {
      chai
        .request(app)
        .get('/api/story/all')
        .set(header)
        .end((_err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('array')
          done()
        })
    })
  })

  describe('/POST story', () => {
    it('Add story', done => {
      const story = {
        name: 'test story',
      }
      chai
        .request(app)
        .post('/api/story/create')
        .send(story)
        .set(header)
        .end((_err, res) => {
          res.should.have.status(200)
          res.body.should.be.a('object')
          const data = res.body
          data.should.have.property('id')
          data.should.have.property('status')
          data.should.have.property('name').eq(story.name)
          data.should.have.property('status')
          done()
        })
    })
    it('return 400', done => {
      chai
        .request(app)
        .post('/api/story/create')
        .set(header)
        .send({})
        .end((_err, res) => {
          res.should.have.status(400)
          done()
        })
    })
  })

  describe('/PUT update story status', () => {
    const url = '/api/story/status-update'
    it('update story status', async () => {
      const story = {
        name: 'test story',
      }
      // create story first
      let res = await chai
        .request(app)
        .post('/api/story/create')
        .set(header)
        .send(story)
      const { id } = res.body
      res = await chai
        .request(app)
        .put(url)
        .set(header)
        .send({ id: id, status: 2 })
      res.should.have.status(200)
      res.body.should.have.property('affectedRows').be.a('number').eq(1)
    })
  })
})
