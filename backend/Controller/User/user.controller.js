const usermodel=require('../../Models/User/user.model');
const register_user= async (req, res) => {
    const { firstName,lastName, email,phone, password,confirmPassword} = req.body; // Extract user data from request body
    if (!firstName || !lastName  || !email || !phone || !password  || !confirmPassword) {
        return res.status(400).json({ error: 'All fields are required' });
    }
    if(password !== confirmPassword){
        return res.status(400).json({ error: 'Passwords do not match' });
    }
     const userExists = await usermodel.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });
    try {
        // Create a new user instance
        const User = new usermodel({  firstName,lastName, email,phone, password,confirmPassword});
        // Save the user to the database
        await User.save();
        const token = User.generateToken(); // Generate JWT token for the user
        // Respond with success message
        res.status(201).json({ message: 'User registered successfully', token, User: {
        id: User._id,
        firstName: User.firstName,
        lastName: User.lastName,
        email: User.email,
        phone: User.phone,
      }, });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

const Login_user = async (req, res) => {
    const {email, password } = req.body; // Extract email and password from request body
    if (!email || !password) {  
        return res.status(400).json({ error: 'Email and password are required' });
    }   
    
        // Find the user by email
        const user = await usermodel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        // Check if the password matches
        const isMatch =await  user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid password' });
        }
        const token = user.generateToken(); // Generate JWT token for the user
        // Respond with success message and token
        res.status(200).json({ message: 'Login successful', user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone,
      }, token });
    } 

module.exports = {
    register_user,
    Login_user
};
