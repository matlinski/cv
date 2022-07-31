const express = require('express');
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const path = require('path');
const config = require(`${__dirname}/data/config`);
const app = express();
const port = 3000;

app.use(
  express.static(__dirname + '/public')
);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.get('/', async (req, res) => {
  const repoReq = await fetch('https://github.com/matlinski/cv/commit/master');
  const repoRes = await repoReq.text();
  const $ = cheerio.load(repoRes);
  const commits = $(".js-diff-progressive-container").html();
  config.banner = commits;
  res.render('index', config)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
