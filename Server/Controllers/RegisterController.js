const User = require('../models/UserSchema.js');
const bcrypt = require('bcrypt');
const jwt = require('../jwt/jwt.js');

const Register = async (req, res) => {
    try {


        const { username, email, password, country } = req.body.details;



        const saltRounds = 10; // Make sure you define the salt rounds for bcrypt
        const hashedPassword = await bcrypt.hash(password, saltRounds); // hashing function

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            country: country
        });
        const userId = newUser._id;
        const usernam = newUser.username
        const token = jwt.createToken({ id: userId });// always accepts a object

        await newUser.save();

        res.status(201).json({ success: true, message: 'Successfully Created User', token: token, username: usernam });


    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}


const Login = async (req, res) => {
    try {
        const { email, password } = req.body.details;
        const user = await User.findOne({ email: email });

        if (!user) {
            return res.status(409).json({ success: false, message: 'User does not exist' });
        }

        const matchPassword = await bcrypt.compare(password, user.password);

        if (!matchPassword) {
            return res.status(401).json({ success: false, message: 'Passwords do not match' });
        }

        const userId = user._id;
        const username = user.username
        const token = jwt.createToken({ id: userId });

        res.status(201).json({ success: true, message: 'Login Successful', token: token, username: username });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

const Logout = (req, res) => {
    try {

        res.status(200).json({ success: true, message: 'Successfully logged out' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
}

// const ForgotPassword=async(req,res)=>{
// try {
//     const saltRounds = 10;
//     const {email,password}=req.body;
//     const findUser=await User.findOne({email});
//     if(!findUser){
//         res.status(409).send({success:false,message:'User not found'})
//     }
//     else{
//         const hashedPassword = await bcrypt.hash(password, saltRounds);
//        findUser.password=hashedPassword;
//        await findUser.save();
//        res.status(200).send({success:true,message:'Successfully Reset Password'})
//     }



// } catch (error) {
//     console.error(error);
//     res.status(500).json({ success: false, message: 'Internal Server Error' });
// }
// }

const getallUsers = async (req, res) => {
    try {
      const allUsers = await User.find({});
      
      if (allUsers.length === 0) {
        return res.status(404).json({ success: false, message: 'No users found' });
      }
  
      res.status(200).json({ success: true, data: allUsers });
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
  };
  

module.exports = { Register, Login, Logout ,getallUsers};