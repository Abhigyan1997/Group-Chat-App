const express = require('express');
const router = express.Router();
const chatController = require('../controller/chat');
const auth=require('../middleware/auth');


router.post('/message',auth.authenticate, chatController.chat);

module.exports = router;
