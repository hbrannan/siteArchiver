const express = require('express');
const app = express();
const port = process.env.port || 3000;
const utils = require('./utils');

//middleware
const path = require('path');
const bodyParser = require('body-parser');

//Customize cors middleware
const allowCrossDomain = (req, res, next) => {
  res.header('access-control-allow-origin', '*');
  res.header('access-control-allow-method', '*');
  res.header('Content-Type','text/html');
  if (req.method == 'OPTIONS') {
    res.status(200).send(200);
  } else {
    next();
  }
};

app.use(allowCrossDomain);
app.use(express.static(path.resolve(__dirname + '/../client')));

//R O U T E S

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

//TODO: adjust this to post
app.get('/site', (req, res) => {
  console.log('G E T T I N G   S I T E ', req.query);

  utils.checkForSite(req.query.url)
  .then((site) => {
    let shouldAddSite = false;

    if (!site) {
      shouldAddSite = true;
    } else if (site && site.html) {
      //Redirect  |  Send
      res.status(200).send(site.html);
    } else {
      res.status(200).send('Check back soon! Archiving site!');
    }

    return shouldAddSite;
  })
  .then((shouldAddSite) => {
    if (shouldAddSite){
      utils.addNewSite(req.query.url)
      .then(data => res.send('Check back soon! Archiving site!'))
      .catch(err => res.send({error: err}))
    }
  })
  .catch ( err => res.send({error: err}) );
});

app.post('/site', (req, res) => {
  console.log('P O S T I N G   S I T E ', req.body);
  res.status(200).send('will eventually do some work');
});

//L I S T E N

app.listen(port, () => {
  console.log('app listening at ', port);
})
