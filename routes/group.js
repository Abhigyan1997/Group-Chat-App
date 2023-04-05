const express=require('express');
const grpcontroller=require('../controller/group');
const auntheticateController=require('../middleware/auth');

const router=express.Router();


router.post('/creategrp', auntheticateController.authenticate,grpcontroller.createGroup);
router.get('/getgroupname',auntheticateController.authenticate,grpcontroller.getgroupname);

module.exports=router;