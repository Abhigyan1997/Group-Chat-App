const express = require('express');
const router = express.Router();
const userController = require('../controller/user');

//const userauthenticate=require('../Middleware/auth')
  
router.post('/signup', userController.signup);


module.exports =router;