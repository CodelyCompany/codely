const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const http = require("http");
const users = require("./routes/users");
const exercises = require("./routes/exercises");
const comments = require("./routes/comments");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");

const app = express();

app.use(
    cors({
        origin: "*",
        methods: ["GET", "POST", "DELETE", "UPDATE", "PUT"],
    })
);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/users", users);
app.use("/exercises", exercises);
app.use("/comments", comments);

require("dotenv").config();

const dbConnData = {
    host: process.env.MONGO_HOST || "127.0.0.1",
    port: process.env.MONGO_PORT || 27017,
    database: process.env.MONGO_DATABASE || "local",
};

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
