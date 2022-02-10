const express = require('express');
const Users = require('./users-model.js');
const Posts = require('../posts/posts-model.js');
const { logger, 
  validateUserId, 
  validateUser, 
  validatePost } = require('../middleware/middleware.js');

const router = express.Router();

router.get('/', (req, res, next) => {
  Users.get()
  .then(users => {
    res.status(201).json(users);
  })
  .catch(next);
});

router.get('/:id', validateUserId, (req, res, next) => {
  res.json(req.user);
});

router.post('/', validateUser, (req, res, next) => {
  Users.insert(req.user)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(next);
});

router.put('/:id', validateUserId, validateUser,  (req, res, next) => {
  Users.update(req.params.id, req.user)
  .then(user => {
    res.status(201).json(user);
  })
  .catch(next);
});

router.delete('/:id', validateUserId, (req, res, next) => {
  // RETURN THE FRESHLY DELETED USER OBJECT
});

router.get('/:id/posts', validateUserId, (req, res, next) => {
  // RETURN THE ARRAY OF USER POSTS
});

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  // RETURN THE NEWLY CREATED USER POST
});

module.exports = router;