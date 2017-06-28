const express = require('express');
const app = express();
const port = process.env.port || 3000;
const utils = require('./utils');

//middleware
const path = require('path');
const bodyParser = require('body-parser');
const request = require('request');
const fs = require('fs');


// request('http://' + url).pipe(fs.createWriteStream(paths.archivedSites + '/' + url, defaults));

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

app.get('/site', (req, res) => {
  console.log('G E T T I N G   S I T E ', req.query);
  return new Promise ((resolve, reject) => {
    request(`http://${req.query}`, (error, response, body) => {
      if (error) {
        reject(error);
      } else {
        resolve(response, body);
      }
    })
  })
  .then((data) => {
    console.log('tryna promisify', data.body)
    res.status(200).send('will eventually do some work here');
  })
  .catch( err => res.status(400).send(err));
});

app.post('/site', (req, res) => {
  console.log('P O S T I N G   S I T E ', req.body);
  res.status(200).send('will eventually do some work');
});

//L I S T E N

app.listen(port, () => {
  console.log('app listening at ', port);
})
