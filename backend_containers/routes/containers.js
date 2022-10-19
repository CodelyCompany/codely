const axios = require("axios");
const express = require("express");
const router = express.Router();

const programmingLanguages = [
    "javascript",
    "python",
    "bash",
    "java",
    "cpp",
    "c",
    "r",
];

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
            console.log(error);
            res.status(500).send(error);
        }
    })
);

module.exports = router;
