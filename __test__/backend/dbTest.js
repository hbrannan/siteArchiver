const supertest = require('supertest')
const app = require('../../server/server.js')
const request =  supertest(app)
const db = require('../../database/connection')
const queue = require('../../jobQueue/queue')
const init = require('./initTestDatabase')
const { pullFromQueue } = require('../../server/workerUtils')
const { expect } = require('chai')

/*  T O C
  -SiteAdd by URL
  -SiteReq by Id
  -Task Dequeue
*/

before(done => {
  init()
  .then(()=> done())
  .catch(err => done(err))
})

after(done => {
  db.sequelize.sync({force:true})
  .then(() =>  {
    done()
  })
  .catch(error =>  {
    done(error)
  })

  queue.sequelize.sync({force:true})
  .then(() =>  {
    done()
  })
  .catch(error =>  {
    done(error)
  })
})

describe('Site by URL', () => {

  it('adds a site & task to the db when posted a new url', (done) => {
    request
      .post('/site')
      .send({ url: 'github.com' })
      .expect(201, {
        id: 7,
        msg:'Check back soon! Archiving site! Your archive_job_id is 7'
      })
      .end(function (err, res) {
        if (err) return done(err)
        done()
      })
  })

  it('returns html for a url when html available', (done) => {
    request
      .post('/site')
      .send({ url: 'google.com' })
      .expect(200)
      .expect(res => {
        if (!res.length === 5) {
          throw new Error('Missing sites from top 5 list')
        }
      })
      .end(function (err, res) {
        if (err) return done(err)
        done()
      });
  })

  it('returns msg & id if html not yet unavailable', (done) => {
    request
      .post('/site')
      .send({ url: 'massdrop.com' })
      .expect(200, {
        msg: 'Check back soon! Archiving site! Your archive_job_id is 2',
        id: 2
      })
      .end(function (err, res) {
        if (err) return done(err)
        done()
      });
  })
})

describe('Site by id', () => {

  it('returns html for a task_id when available', (done) => {
    request
      .get('/site')
      .query({ id: 3 })
      .expect(200, {
        html: '%3Chtml%3E%3Cbody%3E%3Cdiv%3EHello%20World%3C/div%3E%3C/body%3E%3C/html%3E'
      })
      .end(function (err, res) {
        if (err) return done(err)
        done()
      })
  })

  it('returns msg and id if html not yet available', (done) => {
    request
      .get('/site')
      .query({ id: 2 })
      .expect(200, {
        msg: 'Check back soon! We are not yet done archiving your site with job_id 2',
        id: 2
      })
      .end(function (err, res) {
        if (err) return done(err)
        done()
      })
  })

  it('returns msg site does not exist in the system', (done) => {
    request
      .get('/site')
      .query({ id: 200 })
      .expect(200, {
        msg: 'We have no site with archive_job_id 200. Perhaps try resubmitting the site name.'
      })
      .end(function (err, res) {
        if (err) return done(err)
        done()
      })
  })

})

describe('Task', () => {
  it('should dequeue on call', (done) => {
    pullFromQueue()
    .then(res => {
      expect(res).to.equal(1);
      done()
    })
    .catch(err => done(err))
  })
})


/*

Todos:
- inc. hit count,
- html becomes queryable for site after dq
- appropriate handling of non-200 status codes

*/

