const execSync = require('child_process').execSync;
const fs = require('fs');
const express = require('express');
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;
const timeout = parseInt(process.env.TIMEOUT) || 30000;
app.listen(port, () => {
  console.log(`API server listening on port ${port}`);
});

app.post('/', async (req, res) => {
  try {
    fs.writeFileSync('./userdir/execute.cpp', req.body.toExecute);
    const execOptions = {
      encoding: 'utf-8',
      timeout,
    };
    execSync('g++ -o ./userdir/program ./userdir/execute.cpp', execOptions);
    const output = execSync(
      'cd userdir && unshare -r -n ./program',
      execOptions
    );
    return res.status(200).send({ output });
  } catch (error) {
    if (error.code === 'ETIMEDOUT') {
      res.status(408).send({ message: 'Timeout' });
    }
    console.log(error);
    res.status(500).send(error);
  }
});
