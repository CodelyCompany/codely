const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const users = require("./routes/users");
const exercises = require("./routes/exercises");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const execSync = require("child_process").execSync;

const app = express();

app.use(express.json());
app.use(
    cors({
        origin: "https://localhost:3000",
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
    })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", users);
app.use("/exercises", exercises);

require("dotenv").config();

const dbConnData = {
    host: process.env.MONGO_HOST || "127.0.0.1",
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || "local",
};

const programmingLanguages = ["javascript", "python", "bash"];

// Uruchomienie kontenerów
programmingLanguages.forEach((n) => {
    execSync("docker build -t " + n + "-container ../containers/" + n, {
        encoding: "utf-8",
    });
    execSync(
        "docker run -dp 600" +
            programmingLanguages.indexOf(n) +
            ":5000 --name " +
            n +
            "-container " +
            n +
            "-container",
        {
            encoding: "utf-8",
        }
    );
});

mongoose
    .connect(
        `mongodb://${dbConnData.host}:${dbConnData.port}/${dbConnData.database}`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(async (response) => {
        console.log(
            `Connected to MongoDB. Database name: "${response.connections[0].name}"`
        );
        const port = process.env.PORT || 5000;
        http.createServer(app).listen(port, () => {
            console.log(`API server listening at https://localhost:${port}`);
        });
    });
async function closingContainers() {
    programmingLanguages.forEach((n) => {
        execSync("docker stop " + n + "-container", { encoding: "utf-8" });
        execSync("docker rm " + n + "-container", { encoding: "utf-8" });
    });
    process.exit();
}

// Zatrzymanie i usunięcie kontenerów przy wyłączeniu serwera
process.stdin.resume();

// //do something when app is closing
process.on("exit", closingContainers);

// //catches ctrl+c event
process.on("SIGINT", closingContainers);

// // catches "kill pid" (for example: nodemon restart)
process.on("SIGUSR1", closingContainers);
process.on("SIGUSR2", closingContainers);

// //catches uncaught exceptions
process.on("uncaughtException", closingContainers);
