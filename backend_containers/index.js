const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const execSync = require('child_process').execSync;
const http = require('http');
const containers = require('./routes/containers');

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: '*',
    methods: ['POST'],
  })
);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', containers);

const programmingLanguages = [
  'javascript',
  'python',
  'bash',
  'java',
  'cpp',
  'c',
  'r',
];

// Uruchomienie kontenerów
programmingLanguages.forEach((n) => {
  execSync('docker build -t ' + n + '-container ../containers/' + n, {
    encoding: 'utf-8',
  });
  execSync(
    'docker run -dp 600' +
      programmingLanguages.indexOf(n) +
      ':5000 --name ' +
      n +
      '-container ' +
      n +
      '-container',
    {
      encoding: 'utf-8',
    }
  );
});

const port = process.env.PORT || 5001;
http.createServer(app).listen(port, () => {
  console.log(`API server listening at https://localhost:${port}`);
});

async function closingContainers() {
  programmingLanguages.forEach((n) => {
    execSync('docker stop ' + n + '-container', { encoding: 'utf-8' });
    execSync('docker rm ' + n + '-container', { encoding: 'utf-8' });
  });
  process.exit();
}

// Zatrzymanie i usunięcie kontenerów przy wyłączeniu serwera
process.stdin.resume();

// //do something when app is closing
process.on('exit', closingContainers);

// //catches ctrl+c event
process.on('SIGINT', closingContainers);

// // catches "kill pid" (for example: nodemon restart)
process.on('SIGUSR1', closingContainers);
process.on('SIGUSR2', closingContainers);

// //catches uncaught exceptions
process.on('uncaughtException', closingContainers);