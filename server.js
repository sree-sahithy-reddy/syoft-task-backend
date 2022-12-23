const express = require('express');
const server = express();
const dotenv = require('dotenv').config();
const cors = require('cors');
const apis = require('./handlers/index');
const port = process.env.PORT || 3000;

server.use(cors());
server.use(express.json());

apis(server);

server.listen(port, () => {
    console.log(`listening at port number ${port}`)
});
