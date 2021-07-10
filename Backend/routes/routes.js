const express = require('express');
const router = express.Router();
const singUpTemplateCopy = require('../models/SingUpModels')
const validate = require('../middlewares/validate');

router.post('/signup', (request, response) => {
   const singedUpUser = new singUpTemplateCopy({
      fullname: request.body.fullname,
      username: request.body.username,
      email: request.body.email,
      password: request.body.password
   })
   singedUpUser.save()
      .then(data => {
         response.json(data)
      })
      .catch(error => {
         response.json(error)
      })
});

router.get('/singin')

module.exports = router;