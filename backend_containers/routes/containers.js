const axios = require('axios');
const express = require('express');
const router = express.Router();

router.post('/javascript', async (req, res) => {
    try {
        let data = req.body;
        if (data.func && data.args) {
            data.toExecute =
                data.toExecute +
                '\n console.log(' +
                data.func +
                '(' +
                data.args.join(', ') +
                '));';
        }
        const response = await axios.post('http://javascript:6000', {
            toExecute: data.toExecute,
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
        let data = req.body;
        if (data.func && data.args) {
            data.toExecute =
                data.toExecute +
                '\n print(' +
                data.func +
                '(' +
                data.args.join(', ') +
                '));';
        }
        const response = await axios.post('http://python:6001', {
            toExecute: data.toExecute,
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

router.post('/bash', async (req, res) => {
    try {
        let data = req.body;
        if (data.func && data.args) {
            data.toExecute =
                data.toExecute + '\n' + data.func + ' ' + data.args.join(' ');
        }
        const response = await axios.post('http://bash:6002', {
            toExecute: data.toExecute,
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
        let data = req.body;
        if (data.func && data.args) {
            data.toExecute =
                data.toExecute +
                '\n cat(' +
                data.func +
                '(' +
                data.args.join(', ') +
                '))';
        }
        const response = await axios.post('http://r:6003', {
            toExecute: data.toExecute,
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
        let data = req.body;
        if (data.func && data.args) {
            const splitedData = data.toExecute.split(
                'public static void main(String[] args) {'
            );
            data.toExecute =
                splitedData[0] +
                'public static void main(String[] args) {' +
                '\n System.out.println(' +
                data.func +
                '(' +
                data.args.join(', ') +
                '));' +
                splitedData[1];
        }
        const response = await axios.post('http://java:6004', {
            toExecute: data.toExecute,
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
        let data = req.body;
        if (data.func && data.args) {
            const splitedData = data.toExecute.split('return 0;');
            const lastElem = splitedData.pop();
            data.toExecute =
                splitedData.join(' \n') +
                ' cout << ' +
                data.func +
                '(' +
                data.args.join(', ') +
                ');\n' +
                'return 0;' +
                lastElem;
        }
        const response = await axios.post('http://cpp:6005', {
            toExecute: data.toExecute,
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
        let data = req.body;
        if (data.func && data.args) {
            const splitedData = data.toExecute.split('return 0;');
            const lastElem = splitedData.pop();
            data.toExecute =
                splitedData.join(' \n') +
                data.func +
                '(' +
                data.args.join(', ') +
                ');\n' +
                'return 0;' +
                lastElem;
        }
        const response = await axios.post('http://c:6006', {
            toExecute: data.toExecute,
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
