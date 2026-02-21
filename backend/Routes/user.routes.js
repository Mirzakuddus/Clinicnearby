const userroutes = require('express').Router();
const { register_user, Login_user,  } = require('../Controller/User/user.controller');
const userdetail=require('../Controller/User/userdetail.controller');
const protect=require('../Middleware/auth.middleware');
// User registration route
userroutes.post('/register', register_user);
// User login route
userroutes.post('/login', Login_user);

userroutes.post('/userdetail',protect, userdetail.userprofile);

module.exports = userroutes;