const express = require('express');
const likesRouter = express.Router();
const LikesService = require('./likes-service');
const path = require('path');
const jsonBodyParser = express.json();
const { requireAuth } = require('../middleware/jwt-auth');

likesRouter
    .route('/likes')
    .all(requireAuth)
    .post(jsonBodyParser, (req, res, next) => {
        //console.log('req.body', req.body);
        const { user_id, post_id } = req.body;
        const newLike = { user_id, post_id }

        LikesService.addLike(
            req.app.get('db'),
            newLike
        )
            .then(item => {
                res.status(201)
                   .json(item)
            })
            .catch(next)
    }) //end post
    .get((req, res, next) => {
        LikesService.getLikes(req.app.get('db'))
            .then(likes => res.json(likes))
    })
    
module.exports = likesRouter;