const userroutes = require('express').Router();
const { register_user, Login_user,  } = require('../Controller/User/user.controller');
// User registration route
userroutes.post('/register', register_user);
// User login route
userroutes.post('/login', Login_user);
const userdetail=require('../Controller/User/userdetail.controller');
userroutes.post('/userdetail', userdetail.userprofile);

module.exports = userroutes;