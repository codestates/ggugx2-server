const express = require('express');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
  console.log('request reached at /');
  res.status(200).send('SUCCESS!');
});

app.set('port', port);
app.listen(app.get('port'));

module.exports = app;
