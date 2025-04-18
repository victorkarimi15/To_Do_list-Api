const jwt = require('jsonwebtoken');
const User = require('../model/userModel.js');
const ACCESS_SECRET = process.env.ACCESS_SECRET;
const REFRESH_SECRET = process.env.REFRESH_SECRET;

const verifyJWT = (req,res,next) => {
    const authHeaders = req.get('authorization');

    try {
        if (!authHeaders) return res.status(401).json({'message': 'Authorization headers missing'});

        let token = authHeaders.split(" ")[1];

        if (!token) return res.sendStatus(401);

        // const decoded = jwt.verify(token,ACCESS_SECRET);
        jwt.verify(token, ACCESS_SECRET, async(err,decoded) =>{
            if(err){
                req.cookies
                    ? token = req.cookies.refreshToken 
                    : res.status(403).json({'message': 'Unauthorized access'});
                
                // find refresh token from db
                const validUser = await User.findOne({refreshToken:token});

                if(!validUser) return res.status(403).json({'message': 'Unauthorized access'});

                const decoded = jwt.verify(validUser.refreshToken,REFRESH_SECRET);

                const payload = {id:decoded.id};

                const newAccessToken = jwt.sign(payload,ACCESS_SECRET,{expiresIn: '1d' });
                const newRefreshToken = jwt.sign(payload,REFRESH_SECRET,{expiresIn: '1h' });

                res.cookies('refreshToken', newRefreshToken, {httpOnly: true});

                validUser.refreshToken = newRefreshToken;
                await validUser.save();

                console.log('Refresh token verified succesfully!')
                res.json({newAccessToken}); 
            }

            req.user = decoded;

            console.log('Access Token verified succesfully!');
        });

    } catch(err) {
        console.error('Error verifying JWT '+ err);
        res.status(500).json({'message': 'Server error'});
    }
    console.log('done 1');
    next();
};

module.exports = verifyJWT;