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

const checkError = (err, res) => {
  if (err.response) {
    if (err.response.data.stderr) {
      return res.status(202).send({ output: err.response.data.stderr });
    }
    if (err.response.data.message === 'Timeout') {
      return res.status(202).send({ output: 'Timeout!' });
    }
  }
  console.log(err);
  return res.status(500).send(err);
};

router.post('/javascript', async (req, res) => {
  try {
    const data = req.body;
    const toExecute =
      data.func && data.args
        ? `${data.toExecute}
        \nconsole.log(${data.func}(${data.args.join(', ')}));`
        : data.toExecute;
    const response = await axios.post(urlData.javascript_url, {
      toExecute,
    });
    return res.status(200).send(response.data);
  } catch (error) {
    return checkError(error, res);
  }
});

router.post('/python', async (req, res) => {
  try {
    const data = req.body;
    const toExecute =
      data.func && data.args
        ? `${data.toExecute}
        \nprint(${data.func}(${data.args.join(', ')}));`
        : data.toExecute;
    const response = await axios.post(urlData.python_url, {
      toExecute,
    });
    return res.status(200).send({ output: response.data.output.slice(0, -1) });
  } catch (error) {
    return checkError(error, res);
  }
});

router.post('/bash', async (req, res) => {
  try {
    const data = req.body;
    const toExecute =
      data.func && data.args
        ? `${data.toExecute} 
        \n${data.func} ${data.args.join(' ')}`
        : data.toExecute;
    const response = await axios.post(urlData.bash_url, {
      toExecute,
    });
    return res.status(200).send(response.data);
  } catch (error) {
    return checkError(error, res);
  }
});

router.post('/r', async (req, res) => {
  try {
    const data = req.body;
    const toExecute =
      data.func && data.args
        ? `${data.toExecute} 
        \ncat(${data.func}(${data.args.join(', ')}))`
        : data.toExecute;
    const response = await axios.post(urlData.r_url, {
      toExecute,
    });
    return res.status(200).send(response.data);
  } catch (error) {
    return checkError(error, res);
  }
});

router.post('/java', async (req, res) => {
  try {
    const data = req.body;
    const prepareData = () => {
      const splitedData = data.toExecute.split('}');
      const lastElem = splitedData.pop();
      return `${splitedData.join('} \n')}
      \npublic static void main(String[] args){
      \nSystem.out.println(${data.func}(${data.args.join(', ')}));
      \n}
      \n}
      ${lastElem}`;
    };
    const toExecute = data.func && data.args ? prepareData() : data.toExecute;
    const response = await axios.post(urlData.java_url, {
      toExecute,
    });
    return res.status(200).send(response.data);
  } catch (error) {
    return checkError(error, res);
  }
});

router.post('/cpp', async (req, res) => {
  try {
    const data = req.body;
    const toExecute =
      data.func && data.args
        ? `${data.toExecute}
        \nint main(){
        \ncout << ${data.func}(${data.args.join(', ')});
        \n}`
        : data.toExecute;
    const response = await axios.post(urlData.cpp_url, {
      toExecute,
    });
    return res.status(200).send(response.data);
  } catch (error) {
    return checkError(error, res);
  }
});

router.post('/c', async (req, res) => {
  try {
    const data = req.body;
    const toExecute =
      data.func && data.args
        ? `${data.toExecute}
        \nint main(){
        \n${data.func}(${data.args.join(', ')});
        \n}`
        : data.toExecute;
    const response = await axios.post(urlData.c_url, {
      toExecute,
    });
    return res.status(200).send(response.data);
  } catch (error) {
    return checkError(error, res);
  }
});

module.exports = router;
