const db = require('../models')
const { Story } = db
const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

const should = chai.should()

async function dbTest() {
  await db.sequelize.sync()
}
dbTest()

chai.use(chaiHttp)
describe('/GET story', () => {
  it('should Get all users', done => {
    chai
      .request(app)
      .get('/api/story/all')
      .end((_err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        done()
      })
  })
})

describe('/CREATE story', () => {
  it('should add story', done => {
    const story = {
      name: 'test story',
    }
    chai
      .request(app)
      .post('/api/story/create')
      .send({ data: story })
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
  it('should return 400', done => {
    chai
      .request(app)
      .post('/api/story/create')
      .send({ data: {} })
      .end((_err, res) => {
        res.should.have.status(400)
        done()
      })
  })
})

describe('/PUT update story status', () => {
  const url = '/api/story/status-update'
  it('should update story status', done => {
    const story = {
      name: 'test story',
    }
    chai
      .request(app)
      .post('/api/story/create')
      .send({ data: story })
      .end((err, res) => {
        const { id } = res.body
        chai
          .request(app)
          .put(url)
          .send({ data: { id: id, status: 2 } })
          .end((err, res) => {
            res.should.have.status(200)
            res.body.should.have.property('affectedRows').be.a('number').eq(1)
            done()
          })
      })
  })
})
