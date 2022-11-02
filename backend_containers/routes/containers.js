const axios = require('axios');
const express = require('express');
const router = express.Router();

const programmingLanguagesNormal = ['javascript', 'python', 'bash', 'r'];
const programmingLanguagesAnother = [
    { lang: 'java', spliter: 'public static void main(String[] args){' },
    { lang: 'cpp', spliter: 'int main() {' },
    { lang: 'c', spliter: 'int main() {' },
    ,
];

// programmingLanguagesNormal.map((n) =>
//     router.post('/' + n, async (req, res) => {
//         try {
//             let data = req.body;
//             if (data.args) {
//                 data.toExecute = data.args + '\n' + data.toExecute;
//             }
//             const response = await axios.post(
//                 'http://' + n + ':600' + programmingLanguagesNormal.indexOf(n),
//                 { toExecute: data.toExecute }
//             );
//             return res.status(200).send(response.data);
//         } catch (error) {
//             if (error.response && error.response.data.stderr) {
//                 return res
//                     .status(202)
//                     .send({ output: error.response.data.stderr });
//             } else {
//                 console.log(error);
//                 res.status(500).send(error);
//             }
//         }
//     })
// );

// programmingLanguagesAnother.map((n) => {
//     router.post('/' + n.lang, async (req, res) => {
//         try {
//             let data = req.body;
//             if (data.args) {
//                 const splitedData = data.toExecute.split(n.spliter);
//                 data.toExecute =
//                     splitedData[0] +
//                     n.spliter +
//                     data.args +
//                     '\n' +
//                     splitedData[1];
//             }
//             const response = await axios.post(
//                 'http://' +
//                     n.lang +
//                     ':600' +
//                     (parseInt(programmingLanguagesNormal.length) +
//                         parseInt(programmingLanguagesAnother.indexOf(n))),
//                 {
//                     toExecute: data.toExecute,
//                 }
//             );
//             return res.status(200).send(response.data);
//         } catch (error) {
//             if (error.response && error.response.data.stderr) {
//                 return res
//                     .status(202)
//                     .send({ output: error.response.data.stderr });
//             } else {
//                 console.log(error);
//                 res.status(500).send(error);
//             }
//         }
//     });
// });

router.post('/javascript', async (req, res) => {
    try {
        let data = req.body;
        data.toExecute =
            data.toExecute +
            '\n console.log(' +
            data.func +
            '(' +
            data.args.join(', ') +
            '));';
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
        data.toExecute =
            data.toExecute +
            '\n print(' +
            data.func +
            '(' +
            data.args.join(', ') +
            '));';
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
        data.toExecute =
            data.toExecute + '\n' + data.func + ' ' + data.args.join(' ');
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
        data.toExecute =
            data.toExecute +
            '\n cat(' +
            data.func +
            '(' +
            data.args.join(', ') +
            '))';
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
        if (data.args) {
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

module.exports = router;
