const jwt=require('jsonwebtoken')
require('dotenv').config();
const secretkey="karthikeyamadhavan"||process.env.SECRET_KEY;


const createToken=(payload)=>{
    return jwt.sign(payload,secretkey,{expiresIn:'1h'});
    
}

const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
      return res.status(403).json({ success: false, message: 'No token provided.' });
  }

  const token = authHeader.split(' ')[1]; // Assuming 'Bearer <token>'

  if (!token) {
      return res.status(403).json({ success: false, message: 'Token format is invalid.' });
  }



  jwt.verify(token, secretkey, (err, decoded) => {
      if (err) {
          return res.status(401).json({ success: false, message: 'Failed to authenticate token.' });
      }

   // Assuming this is the correct method to blacklist the token

      req.userId=decoded.id 
    
     
     // Save the decoded info to request for use in other routes decoded always has the user id

      next();
  });
};
 

 module.exports={
    createToken,
    verifyToken
 }

