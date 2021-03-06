const supertest = require('supertest')
const app = require('../../server/server.js')
const request =  supertest(app);
const db = require('../../database/connection');

describe('API', () => {

  it('fetches the topFiveSites', (done) => {
    request
      .get('/top-sites')
      .expect(200)
      .expect(res => {
        if (!res.body.sites.length === 5){
          throw new Error('should return 5 sites')
        }
      })
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
      .expect(400, {
        msg: 'Bad request'
      })
      .end(function (err, res) {
        done();
      });
  })

  it('returns html for a site when provided a completed id', (done) => {
    request
    .get('/site?id=1')
    .expect(200)
    .expect (res => {
      if (!res.body.html){
        throw new Error('must contain html when provided completed id')
      }
    })
    .end((err, res) => {
      if (err) return done(err)
      done()
    })
  })

  it('returns no-such-site message when provided an invalid id', (done) => {
    request
    .get('/site?id=10000000')
    .expect(200)
    .expect({
      msg:'We have no site with archive_job_id 10000000. Perhaps try resubmitting the site name.'
    })
    .end((err, res) => {
      if (err) return done(err)
      done()
    })
  })

  it('does not check the db for a site failing an id query', (done) => {
    request
    .get('/site?id=')
    .expect(400)
    .end((err, res) => {
      if (err) return done(err)
      done()
    })
  })
})
