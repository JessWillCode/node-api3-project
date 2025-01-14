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

router.delete('/:id', validateUserId, async (req, res, next) => {
  try {
    const deletedUser = await Users.getById(req.params.id);
    if(!deletedUser) {
      next();
    } else {
      await Users.remove(req.params.id);
      res.json(deletedUser);
    }
  } catch (err) {
    res.status(500).json({
      message: 'Post could not be deleted'
    });
  }
});


router.get('/:id/posts', validateUserId, async(req, res, next) => {
  try {
    const userPosts = await Users.getUserPosts(req.params.id);
    if(!userPosts){
      next();
    } else {
      res.status(201).json(userPosts);
    }
  } catch (err) {
    res.status(500).json({
      message: 'Post could not be fetched'
    });
  }
});

router.post('/:id/posts', validateUserId, validatePost, async (req, res, next) => {
console.log('POST', req.text);
  try {
    const newPost = await Posts.insert({
      user_id: req.params.id,
      text: req.text
    });
      res.status(201).json(newPost);
  } catch(err) {
    next(err);
  }
})

module.exports = router;