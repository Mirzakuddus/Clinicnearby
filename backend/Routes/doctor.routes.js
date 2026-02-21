const doctorRoutes = require('express').Router();
const { register_doctor, Login_doctor } = require('../Controller/Doctor/doctor.controller');
// Doctor registration route
doctorRoutes.post('/register', register_doctor);
// Doctor login route
doctorRoutes.post('/login', Login_doctor);
module.exports = doctorRoutes;