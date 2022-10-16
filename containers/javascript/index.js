const execSync = require('child_process').execSync;
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT'],
  })
);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});

app.post('/', async (req, res) => {
  try {
    data = req.body;
    fs.writeFileSync('./execute.js', data.toExecute);
    const output = execSync('node execute.js', { encoding: 'utf-8' });
    return res.status(200).send(output);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});
