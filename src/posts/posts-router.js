const express = require('express');
const jsonBodyParser = express.json();

const path = require('path');

const postsRouter = express.Router();
const PostsService = require('./posts-service');




postsRouter
    .route('/posts')
    //.all(requireAuth)
    .get((req, res, next) => {
        const knexInstance = req.app.get('db')
        PostsService.getAllPosts(knexInstance)
            .then(items => {
                res.json(items)
            })
            .catch(next);
    })
    .post(jsonBodyParser, (req, res, next) => {
        //console.log('req.body', req.body)
        const { message, user_id } = req.body;
        const newPostItem = { message, user_id };

        PostsService.addNewPost(
            req.app.get('db'),
            newPostItem
        )
            .then(post => {
                res.status(201)
                   //console.log('req.originalUrl', req.originalUrl)
                   //.location(path.posix.join(req.originalUrl, `/${post.id}`))
                   .json(post)
                   //.json(serializePost(post))
            })
    })
    .delete(jsonBodyParser, (req, res, next) => {
        //console.log('req', req)
        // console.log('req.body', req.body)
        PostsService.getById(
            req.app.get('db'),
            req.body.id
        )
            .then(item => {
                console.log('item', item)
                if(!item){
                    return res.status(404).json({
                        error: {message: 'Post does not exist.'}
                    });
                };
                PostsService.deletePost(
                    req.app.get('db'),
                    item.id
                )
                .then(() => {
                    res.status(204).end();
                })
            })
            .catch(next);
    })

    
module.exports = postsRouter;