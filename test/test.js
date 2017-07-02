// const expect = require('chai').expect
const supertest = require('supertest')
const app = require('../server/server.js')
const request =  supertest(app);

console.log('T E S T   E N V', process.env, process.env.NODE_ENV)

//todo: before/ after cleanup hooks; increased specificity in expect behavior

describe('Server', () => {

  it('fetches the topFiveSites', (done) => {
    request
      .get('/top-sites')
      .expect(200)
      .end(function (err, res) {
        done();
      });
  })

  it('serves the static client', (done) => {
    request
      .get('/')
      .expect(200)
      .end(function (err, res) {
        done();
      });
  })

  it('does not check the db for a site failing a posted url', (done) => {
    request
      .post('/site')
      .expect(400)
      .end(function (err, res) {
        done();
      });
  })

  it('returns html for a site when provided a completed id', (done) => {
    request
    .get('/site?id=1')
    .expect(200)
    .end(function (err, res) {
      done();
    });
  })

  it('returns no-such-site message when provided an invalid id', (done) => {
    request
    .get('/site?id=10000000')
    .expect(200)
    .end(function (err, res) {
      done();
    });
  })

  it('does not check the db for a site failing an id query', (done) => {
    request
      .get('/site?id=')
      .expect(400)
      .end(function (err, res) {
        done();
      });
  })
})

describe('Site by URL', () => {
  before(function(done) {
    // remove database data here
    done()
  })

  it('adds a site & task to the db when posted a new url', (done) => {
    request
      .post('/site')
      .field('url', 'google.com')
      .expect(201)
      .end(function (err, res) {
        done();
      });
  })

  it('returns html for a url when available', (done) => {

  })

  it('returns msg & site_id if html as of yet unavailable', (done) => {

  })

  it('handles unexpected status codes', (done) => {

  })

  it('catches and returns error messages if needed', (done) => {

  })

})

describe('Site by id', () => {

})

describe('Task', () => {

})
