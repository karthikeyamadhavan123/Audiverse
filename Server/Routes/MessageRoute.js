const express = require('express');
const router = express.Router();
const jwt = require('../jwt/jwt');
const MessageController=require('../Controllers/MessageController')
router.post('/send/:id',jwt.verifyToken,MessageController.SendMessage);
router.get('/:id',jwt.verifyToken,MessageController.getMessage);
module.exports=router