const expect = require('chai').expect
const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const supertest = require('supertest')
const app = require('../server/server.js')
const request =  supertest(app);

//Customize cors middleware
const allowCrossDomain = (req, res, next) => {
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-method', '*');
  res.header('access-control-allow-headers', 'Content-Type');
  res.header('Content-Type','application/json'); //todo: answer : [if]_when/how set multiple header types
  if (req.method == 'OPTIONS') {
    res.status(200).send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname + '/../client')));

describe('Server', () => {
  it('serves the static client', (done) => {
    request
      .get('/')
      .expect(200)
      .end(function (err, res) {
        done();
      });
  })

  it('checks the db for a site when posted a url', ()=> {

  })

  it('does not check the db failing a posted url', ()=> {

  })

  it('checks the db for a site when provided an id query', ()=> {

  })

  it('does not check the db for a site failing an id query', ()=> {

  })

  it('fetches the topFiveSites', ()=> {

  })
})

describe('Site Fetch Possibilities', ()=> {

})
