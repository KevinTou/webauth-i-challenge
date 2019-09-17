const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const db = require('../data/db-config.js');

const userRouter = require('./users/user-router.js');
const loginRouter = require('./auth/login-router.js');
const registerRouter = require('./auth/register-router.js');
const logoutRouter = require('./auth/logout-router.js');

const server = express();

const sessionConfig = {
  name: 'sprinkles', // would name the cookie 'sid' by default (BAD)
  secret: process.env.SESSION_SECRET || 'keep it secret, keep it safe',
  cookie: {
    maxAge: 1000 * 60 * 60, // in milliseconds
    secure: false, // true means only send cookie over https (production) <--- env variable
    httpOnly: true, // true means JS has no access to the cookie
  },
  resave: false,
  saveUninitialized: true, // GDPR compliance
  store: new KnexSessionStore({
    knex: db,
    tablename: 'knexsessions',
    sidfieldname: 'sessionid',
    createtable: true,
    clearInterval: 1000 * 60 * 30, // clean out expired session data
  }),
};

server.use(helmet());
server.use(express.json());
server.use(
  cors({
    credentials: true,
    origin: 'http://localhost:3000',
  }),
);
server.use(session(sessionConfig));

server.use('/api/users', userRouter);
server.use('/api/login', loginRouter);
server.use('/api/register', registerRouter);
server.use('/api/logout', logoutRouter);

server.get('/', (req, res) => {
  res.send('Server is up and running!');
});

module.exports = server;
