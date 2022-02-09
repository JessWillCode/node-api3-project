const { getById } = require('./users/users-model');
const yup = require('yup');

function logger(req, res, next) {
  console.log(`[${req.method}] ${req.url}`);
  next();
}

function validateUserId(req, res, next) {
  getById(req.params.id)
  .then(id => {
    if(id) {
      req.id = id;
      next();
    } else {
      next({
        status: 404,
        message: `user id ${req.params.id}`
      });
    }
  })
  .catch(next);
};

function validateUser(req, res, next) {
  // DO YOUR MAGIC
}

function validatePost(req, res, next) {
  // DO YOUR MAGIC
}

// do not forget to expose these functions to other modules
module.exports = {
  logger,
  validateUserId, 
  validateUser, 
  validatePost
}