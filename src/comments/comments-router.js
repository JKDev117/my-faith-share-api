const express = require('express');
const commentsRouter = express.Router();
const CommentsService = require('./comments-service');
const path = require('path');
const jsonBodyParser = express.json();

commentsRouter
    .post()
    .delete()

    
module.exports = commentsRouter;