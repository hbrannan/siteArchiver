const express = require('express');
const app = express();
const utils = require('./utils');
const workerJobs = require('./workers');
const { getTopFiveSites } = require('./workerUtils');

//middleware
const path = require('path');
const bodyParser = require('body-parser');

//Customize cors middleware
const allowCrossDomain = (req, res, next) => {
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-method', '*');
  res.header('access-control-allow-headers', 'Content-Type');
  res.header('Content-Type','application/json');
  if (req.method == 'OPTIONS') {
    res.status(200).send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname + '/../client')));

//R O U T E S

app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.post('/site', (req, res) => {
  console.log('P O S T I N G   S I T E ', req.body.url);

  utils.checkForSite(req.body.url)
  .then((site) => {
    let shouldAddSite = false;
    if (!site) {
      shouldAddSite = true;
    } else if (site && site.html) {
      res.status(301).send({html: site.html});
    } else {
      res.status(200).send({msg:`Check back soon! Archiving site! Your archive_job_id is ${site.id}`});
    }
    return shouldAddSite;
  })
  .then((shouldAddSite) => {
    if (shouldAddSite){
      utils.addNewSite(req.body.url)
      .then(site => res.status(201).send({msg:`Check back soon! Archiving site! Your archive_job_id is ${site.siteId}`}))
      .catch(err => res.status(500).send({error: err}))
    }
  })
  .catch ( err => res.send({error: err}) );
});

app.get('/site', (req, res) => {
  console.log('G E T T I N G   S I T E ', req.query.id);

  utils.checkForSiteAsTask(req.query.id)
  .then((site) => {
    if (site && site.html) {
      res.status(301).send({html: site.html});
    } else if (site) {
      res.status(200).send({msg:`Check back soon! Archiving site! Your archive_job_id is ${site.id}`});
    } else {
      res.status(200).send({msg:`We have no site with archive_job_id ${req.query.id}. Perhaps try typing in the site name.`});
    }
  })
  .catch(err => res.status(500).send({error: err}))
})

app.get('/top-sites', (req, res) => {
  console.log('G E T T I N G   T O P   S I T E S   O N   R  E Q U E S T');

  getTopFiveSites()
  .then(sites => {
    console.log(sites);
    res.status(200).send({ sites: sites });
  })
  .catch ( err => res.status(500).send({error: err}) );

});

module.exports = app;
