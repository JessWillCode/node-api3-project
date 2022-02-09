const { getById } = require('./users/users-model');
const yup = require('yup');

function logger(req, res, next) {
  console.log(`[${req.method}] ${req.url}`);
  next();
};

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

const userSchema = yup.object({
  name: yup.string().trim().min(3).required()
});

const validateUser = async (req, res, next) => {
  try {
    const validated = await userSchema.validate(req.body);
    req.body = validated;
  } catch (err) {
    next(err);
  }
};

const postSchema = yup.object({
  text: yup.string().trim().min(3).required()
});

const validatePost = (req, res, next) => {
  try {
    const validated = await postSchema.validate(req.body);
    req.body = validated;
  } catch(err) {
    next(err);
  }
};


module.exports = {
  logger,
  validateUserId, 
  validateUser, 
  validatePost
}