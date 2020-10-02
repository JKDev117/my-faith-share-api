const express = require('express');
const UsersService = require('./users-service');
const usersRouter = express.Router();
const path = require('path');
const { json } = require('express');
const jsonBodyParser = express.json();

usersRouter
  .route('/users')
  .post(jsonBodyParser, (req, res, next) => {
    const { first_name, last_name, user_name, password } = req.body;

    for (const field of ['first_name', 'last_name', 'user_name', 'password'])
       if (!req.body[field])
         return res.status(400).json({
           error: `Missing '${field}' in request body`
         });
       if (password.length < 8) {
         return res.status(400).json({
           error: 'Password must be longer than 8 characters',
         });
       }
       const passwordError = UsersService.validatePassword(password);

       if (passwordError)
          return res.status(400).json({ error: passwordError });

       //check if user already exists
       UsersService.hasUserWithUserName(
           req.app.get('db'),
           user_name
         )
           .then(hasUserWithUserName => {
             if (hasUserWithUserName)
               return res.status(400).json({ error: `Username already taken` });

               return UsersService.hashPassword(password)
                .then(hashedPassword => {
                  const newUser = {
                    first_name,
                    last_name,
                    user_name,
                    password: hashedPassword,
                    date_created: 'now()',
                  };
           
                  return UsersService.insertUser(
                    req.app.get('db'),
                    newUser
                  )
                    .then(user => {
                      res
                        .status(201)
                        .location(path.posix.join(req.originalUrl, `/${user.id}`))
                        .json(UsersService.serializeUser(user));
                    });
                }); 
             
           })
           .catch(next);     
  });//end post '/users'

usersRouter
  .route('/users/:user_id')
  .all((req,res,next) => {
      //console.log(req.params.user_id)
      //console.log(req)
      UsersService.findUser(
        req.app.get('db'),
        req.params.user_id
      )
        .then(user => {
          if(!user){
            return res.status(404).json({
              error: { message: 'User does not exist.' }
            })
          }
          res.user = user;
          next();
        })   
  })
  .get((req, res, next) => 
      res.json(res.user)
  )
  .patch(jsonBodyParser, (req, res, next) => {
      const { profile_image_url, bg_image_url, user_bio } = req.body;
      const infoToUpdate = { profile_image_url, bg_image_url, user_bio };

      //codes for checking fields
      //
      //
      //

      UsersService.updateUserInfo(
        req.app.get('db'),
        req.params.user_id,
        infoToUpdate
      )
        .then(numRowsAffected => {
            res.status(204).end()
        })
        .catch(next);
  })



module.exports = usersRouter;