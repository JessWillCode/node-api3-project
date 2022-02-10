const Users = require('../users/users-model.js');
const yup = require('yup');

function logger(req, res, next) {
  console.log(`[${req.method}] ${req.url}`);
  next();
};

function validateUserId(req, res, next) {
  Users.getById(req.params.id)
  .then(id => {
    if(id) {
      req.user = id;
      next();
    } else {
      res.status(404).json({
        message: "user not found"
      });
    }
  })
  .catch(next);
};

const userSchema = yup.object({
  name: yup.string().trim().required()
});

const validateUser = async (req, res, next) => {
  try {
    const validated = await userSchema.validate(req.body);
    req.user = validated;
    next();
  } catch (err) {
    res.status(400).json({
    message: 'missing required name field'
    })
  }
};

const postSchema = yup.object({
  text: yup.string().trim().required()
});

const validatePost = async (req, res, next) => {
  try {
    console.log('VALIDATED', req.body);
    const validated = await postSchema.validate(req.body);
    req.post = validated;
    next();
  } catch(err) {
    res.status(400).json({
      message: 'missing required text field'
    })
  }
};



module.exports = {
  logger,
  validateUserId, 
  validateUser, 
  validatePost
}