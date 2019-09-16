const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const userRouter = require('./users/user-router.js');
const loginRouter = require('./auth/login-router.js');
const registerRouter = require('./auth/register-router.js');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/users', userRouter);
server.use('/api/login', loginRouter);
server.use('/api/register', registerRouter);

server.get('/', (req, res) => {
  res.send('Server is up and running!');
});

module.exports = server;
