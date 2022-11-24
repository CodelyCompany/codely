const axios = require('axios');
const express = require('express');
const router = express.Router();

require('dotenv').config();

const urlData = {
  javascript_url: process.env.JAVASCRIPT_URL || 'http://javascript:6000',
  python_url: process.env.PYTHON_URL || 'http://python:6001',
  bash_url: process.env.BASH_URL || 'http://bash:6002',
  r_url: process.env.R_URL || 'http://r:6003',
  java_url: process.env.JAVA_URL || 'http://java:6004',
  cpp_url: process.env.CPP_URL || 'http://cpp:6005',
  c_url: process.env.C_URL || 'http://c:6006',
};

router.post('/javascript', async (req, res) => {
  try {
    const data = req.body;
    const toExecute =
      data.func && data.args
        ? data.toExecute +
          '\n console.log(' +
          data.func +
          '(' +
          data.args.join(', ') +
          '));'
        : data.toExecute;
    const response = await axios.post(urlData.javascript_url, {
      toExecute,
    });
    return res.status(200).send(response.data);
  } catch (error) {
    if (error.response && error.response.data.stderr) {
      return res.status(202).send({ output: error.response.data.stderr });
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  }
});

router.post('/python', async (req, res) => {
  try {
    const data = req.body;
    const toExecute =
      data.func && data.args
        ? (data.toExecute =
            data.toExecute +
            ' \nprint(' +
            data.func +
            '(' +
            data.args.join(', ') +
            ')); \n')
        : data.toExecute;
    const response = await axios.post(urlData.python_url, {
      toExecute,
    });
    return res.status(200).send({ output: response.data.output.slice(0, -1) });
  } catch (error) {
    if (error.response && error.response.data.stderr) {
      return res.status(202).send({ output: error.response.data.stderr });
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  }
});

router.post('/bash', async (req, res) => {
  try {
    const data = req.body;
    const toExecute =
      data.func && data.args
        ? data.toExecute + '\n' + data.func + ' ' + data.args.join(' ')
        : data.toExecute;
    const response = await axios.post(urlData.bash_url, {
      toExecute,
    });
    return res.status(200).send(response.data);
  } catch (error) {
    if (error.response && error.response.data.stderr) {
      return res.status(202).send({ output: error.response.data.stderr });
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  }
});

router.post('/r', async (req, res) => {
  try {
    const data = req.body;
    const toExecute =
      data.func && data.args
        ? (data.toExecute =
            data.toExecute +
            '\n cat(' +
            data.func +
            '(' +
            data.args.join(', ') +
            '))')
        : data.toExecute;
    const response = await axios.post(urlData.r_url, {
      toExecute,
    });
    return res.status(200).send(response.data);
  } catch (error) {
    if (error.response && error.response.data.stderr) {
      return res.status(202).send({ output: error.response.data.stderr });
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  }
});

router.post('/java', async (req, res) => {
  try {
    const data = req.body;
    const prepareData = () => {
      const splitedData = data.toExecute.split('}');
      const lastElem = splitedData.pop();
      return (
        splitedData.join('} \n') +
        '\npublic static void main(String[] args) {' +
        '\n System.out.println(' +
        data.func +
        '(' +
        data.args.join(', ') +
        ')); \n } \n}' +
        lastElem
      );
    };
    const toExecute = data.func && data.args ? prepareData() : data.toExecute;
    const response = await axios.post(urlData.java_url, {
      toExecute,
    });
    return res.status(200).send(response.data);
  } catch (error) {
    if (error.response && error.response.data.stderr) {
      return res.status(202).send({ output: error.response.data.stderr });
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  }
});

router.post('/cpp', async (req, res) => {
  try {
    const data = req.body;
    const prepareData = () => {
      const splitedData = data.toExecute.split('return 0;');
      const lastElem = splitedData.pop();
      return (
        splitedData.join(' \n') +
        ' cout << ' +
        data.func +
        '(' +
        data.args.join(', ') +
        ');\n' +
        'return 0;' +
        lastElem
      );
    };
    const toExecute = data.func && data.args ? prepareData() : data.toExecute;
    const response = await axios.post(urlData.cpp_url, {
      toExecute,
    });
    return res.status(200).send(response.data);
  } catch (error) {
    if (error.response && error.response.data.stderr) {
      return res.status(202).send({ output: error.response.data.stderr });
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  }
});

router.post('/c', async (req, res) => {
  try {
    const data = req.body;
    const prepareData = () => {
      const splitedData = data.toExecute.split('return 0;');
      const lastElem = splitedData.pop();
      return (
        splitedData.join(' \n') +
        data.func +
        '(' +
        data.args.join(', ') +
        ');\n' +
        'return 0;' +
        lastElem
      );
    };
    const toExecute = data.func && data.args ? prepareData() : data.toExecute;
    const response = await axios.post(urlData.c_url, {
      toExecute,
    });
    return res.status(200).send(response.data);
  } catch (error) {
    if (error.response && error.response.data.stderr) {
      return res.status(202).send({ output: error.response.data.stderr });
    } else {
      console.log(error);
      res.status(500).send(error);
    }
  }
});

module.exports = router;
