const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.port || 3000;
//TODO: move this to utils
const db = require('../database/connection.js');

app.use(express.static(path.resolve(__dirname + '/../client')));

//R O U T E S

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

app.get('/site', (req, res) => {
  console.log('G E T T I N G   S I T E ', req.query);

});

app.post('/site', (req, res) => {
  console.log('P O S T I N G   S I T E ', req.body);
});

//L I S T E N

app.listen(port, () => {
  console.log('app listening at ', port);
})
