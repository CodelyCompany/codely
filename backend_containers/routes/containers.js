const axios = require("axios");
const express = require("express");
const router = express.Router();

const programmingLanguages =
    require("../programmingLanguages.json").programmingLanguages;

programmingLanguages.map((n) =>
    router.post("/" + n, async (req, res) => {
        try {
            const data = req.body;
            const response = await axios.post(
                "http://localhost:600" + programmingLanguages.indexOf(n),
                data
            );
            return res.status(200).send(response.data);
        } catch (error) {
            if (error.response.data.stderr) {
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

module.exports = router;
