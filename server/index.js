const app = require('./server');
const port = process.env.port || 3000;
//L I S T E N

app.listen(port, () => {
  console.log('app listening at ', port);
})

