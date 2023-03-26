const express = require('express');
const router = express.Router();
const chatController = require('../controller/chat');
const auth=require('../middleware/auth');


router.post('/message',auth.authenticate, chatController.chat);
router.get('/getmessage',auth.authenticate, chatController.getchat);

module.exports = router;
