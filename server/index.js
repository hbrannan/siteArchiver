const express = require('express');
const app = express();
const port = process.env.port || 3000;
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

//R O U T E S

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

//TODO: pivot to post
app.get('/site', (req, res) => {
  console.log('G E T T I N G   S I T E ', req.query);

  utils.checkForSite(req.query.url)
  .then((site) => {
    let shouldAddSite = false;
    if (!site) {
      shouldAddSite = true;
    } else if (site && site.html) {
      res.status(301).send({html: site.html});
    } else {
      res.status(200).send({msg:'Check back soon! Archiving site!'});
    }
    return shouldAddSite;
  })
  .then((shouldAddSite) => {
    if (shouldAddSite){
      utils.addNewSite(req.query.url)
      .then(data => res.status(201).send({msg:'Check back soon! Archiving site!'}))
      .catch(err => res.status(500).send({error: err}))
    }
  })
  .catch ( err => res.send({error: err}) );
});


app.get('/top-sites', (req, res) => {
  console.log('G E T T I N G   T O P   S I T E S   O N   R  E Q U E S T');

  getTopFiveSites()
  .then(sites => {
    console.log(sites);
    res.status(200).send({ sites: sites });
  })
  .catch ( err => res.status(500).send({error: err}) );

});


//https://github.com/matthew-andrews/isomorphic-fetch/issues/34
// app.post('/site', (req, res) => {
//   console.log('P O S T I N G   S I T E ', req.body);
  // res.status(200).send('Check back soon! Archiving site!');
// });

//L I S T E N

app.listen(port, () => {
  console.log('app listening at ', port);
})
