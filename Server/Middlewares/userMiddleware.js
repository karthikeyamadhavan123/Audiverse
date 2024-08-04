const User = require('../models/UserSchema.js');
const existingUserMidlleware=async(req,res,next)=>{
    const {email}=req.body.details
    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
        return res.status(409).json({ success: false, message: 'User already exists' });
    }
    next();
}

module.exports={
    existingUserMidlleware
}