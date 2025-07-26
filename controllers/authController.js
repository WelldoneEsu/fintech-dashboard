const User = require('../models/User');
const jwt = require('jsonwebtoken');
// generate JWT Token
const createToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h'}
  );
};
// @desc   Register a new user
exports.register = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password)
    return res.status(400).json({ message: 'Username and password required'
  });
  const userExists = await User.findOne({ username });
  if (userExists)
    return res.status(400).json ({ message: 'Username already taken' });
  const user = await User.create({ username, password });
  res.status(201).json({
   _id: user._id,
   username: user.username,
   role: user.role,
   token: createToken(user) 
  });
};

/* exports.loginUser = async (req, res) => {
 
   const { email, password } = req.body;
   if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields' });
   }
   const user = await User.findOne({ username }).select('+password');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    res.status(200).json({
      _id: user._id,       
      username: user.username, 
      role: user.role,     
      token: createToken(user) 
    });   
};*/

// @dec Login user
  exports.login = async (req, res) => {
  const { username, password } = req.body;
 
  const user  = await User.findOne({ username });
  if (!user || !(await user.matchPassword(password)))
    return res.status(400).json ({ message: 'Invalid credentials' });

  
  
  res.json({
   _id: user._id,
   username: user.username,
   role: user.role,
   token: createToken(user) 
  });
};