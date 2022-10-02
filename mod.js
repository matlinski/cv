const express = require('express');
const fs = require('fs')
// const fetch = require('node-fetch');
const path = require('path');
const app = express();
const port = 3000;
app.use(
  express.static(__dirname + '/public')
);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.get('/', async (req, res) => {
  res.render('index', {})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
