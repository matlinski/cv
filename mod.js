const express = require('express');
const fs = require('fs')
const fetch = require('node-fetch');
const cheerio = require('cheerio');
const path = require('path');
const app = express();
const port = 3000;
const configFiles = [
  'data/config.json',
  'public/css/vars.css'
];
configFiles.forEach(path=>{
  const indexOfExt = path.lastIndexOf('.');
  if (!fs.existsSync(path)) {
    fs.copyFile(
      `${path.slice(0, indexOfExt)}-example${path.slice(indexOfExt)}`,
      path,
      (err) => { if (err) throw err; });    
  }
});
app.use(
  express.static(__dirname + '/public')
);
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '/views'));
app.get('/', async (req, res) => {
  const config = require(`${__dirname}/data/config.json`);
  const repoReq = await fetch(`${config.repo}/cv/commit/master`);
  const repoRes = await repoReq.text();
  const $ = cheerio.load(repoRes);
  const commits = $(".js-diff-progressive-container").html();
  config.banner = commits;
  res.render('index', config)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
