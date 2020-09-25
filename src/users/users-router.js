const express = require('express');
const usersRouter = express.Router();
const UsersService = require('./users-service');
const path = require('path');
const jsonBodyParser = express.json();

usersRouter
    .route('/users')
    .post()
    .get()
    .patch()


module.exports = usersRouter;