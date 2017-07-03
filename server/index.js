const app = require('./server');
const env = process.env.NODE_ENV ? require('dotenv').config({path: '.env.test'}) : require('dotenv').config();
const port = process.env.PORT || 3000;
//L I S T E N

app.listen(port, () => {
  console.log('app listening at ', port);
})

