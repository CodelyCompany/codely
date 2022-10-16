const execSync = require("child_process").execSync;
const fs = require("fs");
const express = require("express");
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`API server listening on port ${port}`);
});

app.post("/", async (req, res) => {
    try {
        data = req.body;
        fs.writeFileSync("./execute.cpp", data.toExecute);
        execSync("g++ -o program execute.cpp", { encoding: "utf-8" });
        const output = execSync("./program", { encoding: "utf-8" });
        return res.status(200).send(output);
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
    }
});