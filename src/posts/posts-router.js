const express = require('express');
const postsRouter = express.Router();
const PostsService = require('./posts-service');
const path = require('path');
const jsonBodyParser = express.json();

postsRouter
    .post()
    .get()
    .delete()

    
module.exports = postsRouter;