const express = require('express');
const helmet = require('helmet');
const cors = require('cors')
const session = require('express-session')
const restricted = require("./auth/restricted-middleware.js")
const knexSessionStore = require("connect-session-knex")(session);
const server = express();
const usersRouter =  require('./router/usersRouter');
const authRouter = require('./auth/auth-router.js')

const sessionConfig = {
    name: 'cookie',
    secret: "starwars",
    cookie: {
      maxAge: 3600 * 1000,
      secure: false, // should be true in production
      httpOnly: true
    },
    resave: false,
    saveUninitialized:false,

    // store session information into database
    store: new knexSessionStore(
      {
        knex: require("./data/dbConfig.js"),
        tablename: "sessions", 
        sidfieldname: "sid",
        createtable: true,
        clearInterval: 3600 * 1000
      }
    ) 
  }
  // global middleware
server.use(helmet());
server.use(cors());
server.use(session(sessionConfig));
server.use(express.json());

// routers
server.use('/api', restricted, usersRouter)
server.use('/auth', authRouter)

module.exports = server;