const express = require('express');
const router = express.Router();
const registerController=require('../Controllers/RegisterController.js')
const middleware=require('../Middlewares/userMiddleware.js')
const jwt = require('../jwt/jwt');
router.post('/register',middleware.existingUserMidlleware,registerController.Register);
router.post('/login',registerController.Login)
router.post('/logout',registerController.Logout);
router.get('/users',jwt.verifyToken,registerController.getallUsers)
module.exports=router;