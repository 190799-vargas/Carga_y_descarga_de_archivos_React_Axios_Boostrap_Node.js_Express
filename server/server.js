const cors = require("cors");
const express = require("express");
const app = express();

global.__basedir = __dirname;

const corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

const initRoutes = require("./src/routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

let port = 8080;
app.listen(port, () => {
    console.log(`servidor corriendo http://localhost:${port}`);
});