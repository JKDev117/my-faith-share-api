//app.js to export the app ready for integration testing

//require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger'); //winston
const { NODE_ENV, CLIENT_ORIGIN } = require('./config');
const authRouter = require('./auth/auth-router.js');
const usersRouter = require('./users/users-router.js');
const postsRouter = require('./posts/posts-router.js');
const commentsRouter = require('./comments/comments-router.js');
const likesRouter = require('./likes/likes-router.js');

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption));
app.use(helmet()); //Make sure to place helmet before cors in the pipeline. 17.6
app.use(cors());

/*
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);
*/

app.use(usersRouter);
app.use(authRouter);
app.use(postsRouter);
app.use(commentsRouter);
app.use(likesRouter);

app.get('/', (req, res) => {
  res.send({ok: true});
})

app.use(function errorHandler(error, req, res, next) {
  let response;
  if (NODE_ENV === 'production') {
    response = { error: { message: 'server error' } };
  } else {
    console.error(error);
    response = { message: error.message, error };
  }
  res.status(500).json(response);
})


module.exports = app;