const User = require('../models/User');
const generateToken = require('../utils/generateToken');

const registerUser = async (req, res) => {
    try {
      const {name, email, password} = req.body;

      if(!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'All fields are required'});
      }

      const userExists = await User.findOne({ email })
      if (userExists) {
        return res.status(400).json({ success: false, massage: 'Email already  registered'})
      }

      const user = await User.create({ name, email, password});

      res.status(201).json({
        success: true,
        token: generateToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
      });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message});
    }
};


const loginUser = async (req, res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password) {
            return res.status(400).json({success: false, message: 'All fields are required'});
        }

        const user = await User.findOne({ email });
        if(!user) {
            return res.status(401).json({success: false, message: 'Invalid email or password'});
        }

        const isMatch = await user.matchPassword(password);
        if(!isMatch) {
            return res.status(401).json({success: false, message: 'Invalid email or password'});
    }
    res.status(200).json({
        success: true,
        token: generateToken(user._id),
        user: {
            id: user._id,
            name: user.name,
            email: user.email,
        },
    });
} catch (error) {
    res.status(500).json({ success: false, message:error.message});
}
};

const getUserProfile = async (req,res) => {
    try{
        const user = await User.findById(req.user.id).select('-password');
        if(!user) {
            return res.status(404).json({ ssuccess: false, message: 'User not found'});
        }
        res.status(200).json({success: true, user});

    } catch (error){
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports = { registerUser, loginUser, getUserProfile };