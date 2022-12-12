const express = require('express');
const router = express.Router({ mergeParams: true });
const loadedJson = require('./quotes.json');
const _ = require('lodash');

let randomizedNumber;

setInterval(() => {
  randomizedNumber = _.random(0, loadedJson.length - 1);
}, 10000);

router.get('/', (req, res) => {
  console.log('SSE started');

  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Access-Control-Allow-Origin', '*');

  const intervalId = setInterval(() => {
    res.write(`data: ${JSON.stringify(loadedJson[randomizedNumber])}\n\n`);
  }, 1000);

  res.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
});

module.exports = router;
