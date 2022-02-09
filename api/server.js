const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const usersRouter = require('./users/users-router.js');

const server = express();

server.use(express.json());

server.use(morgan('tiny'));
server.use(cors());

server.use('/api/users', usersRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

module.exports = server;
