const express = require("express");
const accountRouter = require('./accounts/accountsRouter');

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
    res.status(200).json({mes: "HI, from the backend"});
});

server.use('/accounts', logger, accountRouter);

//custom middleware

function logger(req, res, next) {
    console.log(
        `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
            'Origin'
        )}`
    );

    next();
}

module.exports = server;
