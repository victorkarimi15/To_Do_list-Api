const User = require('../model/userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

const handleSignup = async (req,res,next) => {
    const {username,email,password,confirm_password} = req.body;

    if(password !== confirm_password) return res.status(400).json({'message': 'Passwords do not match!'});

    if(!username || !email || !password) return res.status(400).json({'message': 'username, email and password are required!'});
    
    const registeredUSer = await User.findOne({username});

    if(registeredUSer) return res.status(400).json({'message': 'Username and Email already registered!'});

    try {
        let hash = await bcrypt.hash(password, 10);
        
        const newUser = new User({
            username,
            email,
            password: hash
        });

        await newUser.save();

        console.log('New user '+username+' added successfully!');
        res.status(200).json({'message': email+' ,has registered successfully!'});
    }catch(err) {
        console.error('Signup failed(handleSignup fn): '+err);
    }
};

const handleAuth = async (req,res,next) => {
    const {email,password} = req.body;

    if(!email || !password) return res.status(400).json({'message': 'Email and password required!'});

    try {
        const validUser = await User.findOne({email});

        if (!validUser) return res.status(401).json({'message': 'Email not registered!'});

        const validPassword = bcrypt.compare(password,validUser.password);

        if(!validPassword) return res.status(401).json({'message': 'Wrong password!'});

        // jwt tokens
        const payload ={
            id: validUser._id
        };

        const accessToken = jwt.sign(payload, ACCESS_SECRET, {expiresIn: '1d'});

        const refreshToken = jwt.sign(payload, REFRESH_SECRET, {expiresIn: '1h'});

        res.cookie('refreshToken', refreshToken, {
            httpOnly :true
        });

        // store token to database
        validUser.refreshToken = refreshToken;
        await validUser.save();

        // send access token
        res.status(200).json({accessToken});
        

    } catch(err) {
        console.error('Auth failed(handleAuth): '+err);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};

module.exports = {handleSignup,handleAuth};