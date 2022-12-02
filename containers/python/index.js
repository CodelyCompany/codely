const execSync = require('child_process').execSync;
const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 6001;
const timeout = parseInt(process.env.TIMEOUT) || 30000;
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});

app.post('/', async (req, res) => {
  try {
    data = req.body;
    fs.writeFileSync('./execute.py', data.toExecute);
    const output = execSync('python3 execute.py', {
      encoding: 'utf-8',
      timeout: timeout,
    });
    return res.status(200).send({ output });
  } catch (error) {
    if (error && error.code === 'ETIMEDOUT') {
      res.status(408).send({ message: 'Timeout' });
    }
    console.log(error);
    res.status(500).send(error);
  }
});
