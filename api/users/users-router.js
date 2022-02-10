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

router.post('/:id/posts', validateUserId, validatePost, (req, res, next) => {
  Posts.insert(req.body)
  .then(post => {
    req.body = post;
    if(!post) {
      console.log('POST', post);
      next();
    } else {
      res.status(201).json(post);
    }
  })
  .catch(next);
});

module.exports = router;