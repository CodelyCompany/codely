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

programmingLanguagesNormal.map((n) =>
    router.post('/' + n, async (req, res) => {
        try {
            let data = req.body;
            if (data.args) {
                data.toExecute = data.args + '\n' + data.toExecute;
            }
            const response = await axios.post(
                'http://' + n + ':600' + programmingLanguagesNormal.indexOf(n),
                { toExecute: data.toExecute }
            );
            return res.status(200).send(response.data);
        } catch (error) {
            if (error.response && error.response.data.stderr) {
                return res
                    .status(202)
                    .send({ output: error.response.data.stderr });
            } else {
                console.log(error);
                res.status(500).send(error);
            }
        }
    })
);

programmingLanguagesAnother.map((n) => {
    router.post('/' + n.lang, async (req, res) => {
        try {
            let data = req.body;
            if (data.args) {
                const splitedData = data.toExecute.split(n.spliter);
                data.toExecute =
                    splitedData[0] +
                    n.spliter +
                    data.args +
                    '\n' +
                    splitedData[1];
            }
            const response = await axios.post(
                'http://' +
                    n.lang +
                    ':600' +
                    (parseInt(programmingLanguagesNormal.length) +
                        parseInt(programmingLanguagesAnother.indexOf(n))),
                {
                    toExecute: data.toExecute,
                }
            );
            return res.status(200).send(response.data);
        } catch (error) {
            if (error.response && error.response.data.stderr) {
                return res
                    .status(202)
                    .send({ output: error.response.data.stderr });
            } else {
                console.log(error);
                res.status(500).send(error);
            }
        }
    });
});

module.exports = router;
