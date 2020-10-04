const express = require('express');
const commentsRouter = express.Router();
const CommentsService = require('./comments-service');
const path = require('path');
const jsonBodyParser = express.json();
const logger = require('../logger.js');
const { requireAuth } = require('../middleware/jwt-auth');

commentsRouter
    .route('/comments')
    .all(requireAuth)
    .post(jsonBodyParser, (req, res, next) => {
        //console.log('req.body', req.body);
        const { user_id, post_id, comment } = req.body;
        const newComment = { user_id, post_id, comment }

        CommentsService.insertComment(
            req.app.get('db'), 
            newComment
        )
            .then(([comment]) => {
                res.status(201)
                   .json(comment)
            })
            .catch(next)

    })//End of post '/comments'
    .delete(jsonBodyParser, (req, res, next) => {
        CommentsService.getById(
            req.app.get('db'),
            req.body.id
        )
            .then(result => {
                if(!result) {
                    logger.error('Comment does not exist!');
                    return res.status(404).json({
                        error: {message: 'Comment does not exist!'}
                    });
                };
            })
            .catch(err => console.log(err))

        CommentsService.removeComment(
            req.app.get('db'),
            req.body.id
        )
            .then(() => 
                res.status(204).end()
            )
            .catch(next);
    })//End of delete '/comments'

    
module.exports = commentsRouter;