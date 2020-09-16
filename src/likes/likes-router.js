const express = require('express');
const likesRouter = express.Router();
const LikesService = require('./likes-service');
const path = require('path');
const jsonBodyParser = express.json();

likesRouter
    .post()
    .get()
    
module.exports = likesRouter;