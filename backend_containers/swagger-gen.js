const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Codely Containers-API',
    description: 'Description',
  },
  host: 'localhost:5001',
  schemes: ['http'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./index.js'];
swaggerAutogen(outputFile, endpointsFiles, doc);
