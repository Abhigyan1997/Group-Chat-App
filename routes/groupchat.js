const express=require('express');
const grpcontroller=require('../controller/groupchat');
const auntheticateController=require('../middleware/auth');

const router=express.Router();

router.get('/groupusers/getname?',grpcontroller.getgroupuser);
router.post('/group/removemember', auntheticateController.authenticate,grpcontroller.removeuser);
router.post('/group/makememberadmin', auntheticateController.authenticate,grpcontroller.makememberadmin);
module.exports=router;