const express = require('express');
const router = express.Router();
const CommentController=require('../Controllers/CommentController');
const jwt = require('../jwt/jwt');

router.post('/:userId/:songId/:audioId/new',jwt.verifyToken,CommentController.newComment);
router.patch('/:userId/:songId/:audioId/edit/:commentId',jwt.verifyToken,CommentController.editComment);
router.delete('/:userId/:songId/:audioId/delete/:commentId',jwt.verifyToken,CommentController.deleteComment);
router.get('/:songId/:audioId',jwt.verifyToken,CommentController.getComments)
 module.exports=router