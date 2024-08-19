const {register_user, login_user} = require('../models/UserModel');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const saltRounds = 9;

const login = async(req, res)=>{
    console.log(req.user);
    const user = req.body.user;
    const password = req.body.password;
    const login_status = await login_user({user:user, password:password});
    if(login_status){
        var access_token = jwt.sign({user}, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' }); // access_token
        var refresh_token = jwt.sign({user}, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '1d' }); // refresh_token
        return res
        .header('authorization', access_token)
        .cookie('refresh_token', refresh_token, {httpOnly:true, sameSite:'strict'})
        .send(access_token);
    }
    res.send(login_status);
}

const register = (req, res)=>{
    const user = req.body.user;
    const password = req.body.password;
    // hash
    bcrypt.hash(password, saltRounds, 
        async(err, hash) =>{
            try {             
                await register_user(
                   {user: user, password: hash}
               );
            } catch (error) {
                console.log('error happened during register!')
            }
        }
    );

    res.send('saved');
}

const auth = (req, res, next)=>{
    const access_token = req.headers['authorization'].split(' ')[1];
    const refresh_token = req.cookies['refresh_token'];
    console.log('auth', access_token , "------" , refresh_token);
    if (!access_token && !refresh_token) {
        return res.status(401).send('Access Denied. No token provided.');
    } 

    try {        
        const decoded = jwt.verify(access_token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error(error);
        if (!refresh_token) {
            return res.status(401).send('Access Denied. No refresh token provided.');
        }

        try {
            const decoded = jwt.verify(refresh_token, process.env.REFRESH_TOKEN_SECRET);
            const access_token = jwt.sign({user:decoded.user},  process.env.ACCESS_TOKEN_SECRET);

        return res
        .cookie('refresh_token', refresh_token, { httpOnly: true, sameSite: 'strict' })
        .header('authorization', access_token)
        .send(decoded.user);
            
        } catch (error) {
            return res.status(400).send('Invalid Token.');
        }
    }
}

module.exports = {
    register,
    login,
    auth
}