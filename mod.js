const express = require('express')
const path = require('path');
const app = express()
const port = 3000
app.use(
  express.static(__dirname + '/public')
);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.get('/', (req, res) => {
  res.render('index', {
    title: 'Hey',
    message: 'Hello there!'
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
