const express = require('express')
const app = express()
const utils = require('./utils')
const workerJobs = require('./workers')
const { getTopFiveSites } = require('./workerUtils')

//middleware
const path = require('path');
const bodyParser = require('body-parser');

//Customize cors middleware
const allowCrossDomain = (req, res, next) => {
  res.header('access-control-allow-origin', '*')
  res.header('access-control-allow-method', '*')
  res.header('access-control-allow-headers', 'Content-Type')
  res.header('Content-Type','application/json')
  if (req.method == 'OPTIONS') {
    res.status(200).send(200)
  } else {
    next()
  }
};

app.use(allowCrossDomain)
app.use(bodyParser.json())
app.use(express.static(path.resolve(__dirname + '/../client')))

//R O U T E S

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + '/../client/index.html'))
})

//POST to /site
// params: url(STRING) -- should include .domin, should NOT include http://
// S U C C :
//    -> site & HTML exist: increaseHitCount(site.id)   return  {}.html = ENCODED HTML STRING  200
//    -> site exists, !HTML: increaseHitCount(site.id)  return  {}.id[INT], {}.msg:STRING      200
//    -> site !exists addSite(url)                      return  {}.id[INT], {}.msg:STRING      200
//    -> params invalid or !params                      return  {}.msg:STRING                  400
// F A I L :
//    ->                                                return  {}.error                       500
app.post('/site', (req, res) => {
  if(req.body.url){
    utils.checkForSite(req.body.url)
    .then((site) => {
      let shouldAddSite = false;
      if (!site) {
        shouldAddSite = true;
      } else if (site && site.html) {
        res.status(200).send({html: site.html});
      } else {
        res.status(200).send({msg:`Check back soon! Archiving site! Your archive_job_id is ${site.id}`, id: site.id});
      }
      return shouldAddSite;
    })
    .then((shouldAddSite) => {
      if (shouldAddSite){
        return utils.addNewSite(req.body.url)
        .then(siteId => res.status(201).send({msg:`Check back soon! Archiving site! Your archive_job_id is ${siteId}`, id: siteId}))
        .catch(err => res.status(500).send({error: err}))
      }
    })
    .catch ( err => res.send({error: err}) );
  } else {
    res.status(400).send({msg:'Bad request'});
  }
})

//GET to /site
// params: id(INT), stringified Number OK
// S U C C :
//    -> site & HTML exist: increaseHitCount(site.id)   return  {}.html = ENCODED HTML STRING  200
//    -> site exists, !HTML: increaseHitCount(site.id)  return  {}.id[INT], {}.msg:STRING      200
//    -> site !exists                                   return  {}.id[INT], {}.msg:STRING      200
//    -> params invalid or !params                      return  {}.msg:STRING                  400
// F A I L :
//    ->                                                return  {}.error                       500
app.get('/site', (req, res) => {
  if (req.query.id) {
    utils.checkForSiteById(req.query.id)
    .then((site) => {
      if (site && site.html) {
        res.status(200).send({html: site.html});
      } else if (site) {
        res.status(200).send({msg:`Check back soon! We are not yet done archiving your site with job_id ${req.query.id}`, id: req.query.id});
      } else {
        res.status(200).send({msg:`We have no site with archive_job_id ${req.query.id}. Perhaps try resubmitting the site name.`});
      }
    })
    .catch(err => res.status(500).send({error: err}))
  } else {
    res.status(400).send({msg:'Bad request'});
  }
})

//GET to /top-sites
// params: n / a
// S U C C :
//    ->      return  {}.sites = [<HTML STRINGs>]  200
// F A I L :
//    ->      return  {}.error                     500
app.get('/top-sites', (req, res) => {
  getTopFiveSites()
  .then(sites => {
    res.status(200).send({ sites: sites });
  })
  .catch (err => res.status(500).send({error: err}))

})

module.exports = app
