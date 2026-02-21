const doctormodel=require('../../Models/Doctor/doctor.model');
const register_doctor= async (req, res) => {
    const { clinicName, email,phone,licenseNumber, password,confirmPassword} = req.body; // Extract Doctor data from request body
    if (!clinicName  || !email || !phone  || !licenseNumber || !password  || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if(password !== confirmPassword){
        return res.status(400).json({ error: 'Passwords do not match' });
    }
    try {
        // Create a new Doctor instance
        const Doctor = new doctormodel({  clinicName, email,phone,licenseNumber, password,confirmPassword});
        // Save the Doctor to the database
        await Doctor.save();
        const token = Doctor.generateToken(); // Generate JWT token for the Doctor
        // Respond with success message
        res.status(201).json({ message: 'Doctor registered successfully',Doctor, token });
    } catch (error) {
        console.error('Error registering Doctor:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const Login_doctor = async (req, res) => {
    const {email, password } = req.body; // Extract email and password from request body
    if (!email || !password) {  
        return res.status(400).json({ error: 'Email and password are required' });
    }   
    
        // Find the Doctor by email
        const Doctor = await doctormodel.findOne({ email: email });
        if (!Doctor) {
            return res.status(404).json({ error: 'Doctor not found' });
        }
        // Check if the password matches
        const isMatch =  Doctor.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = Doctor.generateToken(); // Generate JWT token for the Doctor
        // Respond with success message and token
        res.status(200).json({ message: 'Login successful', Doctor, token });
    } 

    module.exports = {
        register_doctor,
        Login_doctor
    };
