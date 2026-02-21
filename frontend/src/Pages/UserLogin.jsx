"use client";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
function UserLogin() {
  const navigate=useNavigate();
  
  const [isLogin, setIsLogin] = React.useState(true);
  const [userType, setUserType] = React.useState("patient"); // 'patient' or 'clinic'
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phone: "",
    clinicName: "",
    licenseNumber: "",
  });
  const [errors, setErrors] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (!isLogin) {
      if (userType === "patient") {
        if (!formData.firstName) {
          newErrors.firstName = "First name is required";
        }
        if (!formData.lastName) {
          newErrors.lastName = "Last name is required";
        }
        if (!formData.phone) {
          newErrors.phone = "Phone number is required";
        }
      } else if (userType === "clinic") {
        if (!formData.clinicName) {
          newErrors.clinicName = "Clinic name is required";
        }
        if (!formData.licenseNumber) {
          newErrors.licenseNumber = "License number is required";
        }
        if (!formData.phone) {
          newErrors.phone = "Phone number is required";
        }
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log(isLogin ? "Login" : "Register", { ...formData, userType });
      
      if (isLogin) {
        // Redirect based on user type
        if (userType === "clinic") {
          const {email,password}=formData;

          axios.post('http://localhost:5500/doctors/login', {
            email,password
          }).then((res)=>{
            console.log(res.data);
            console.log("clinic login successfully");
            navigate('/doctordashboard');

          }).catch((err)=>{
            console.log(err);
          })
      
        } else {
          const {email,password}=formData;
          axios.post('http://localhost:5500/users/login', {
            email,password
          }).then((res)=>{
            console.log(res.data);
            console.log("userlogin successfully")
            navigate('/');
          }).catch((err)=>{
            console.log(err);
          })

        }
      } else {
        if (userType === "clinic") {
          const {clinicName,email,phone,licenseNumber,password,confirmPassword}=formData;

          axios.post('http://localhost:5500/doctors/register', {
            clinicName,email,phone,licenseNumber,password,confirmPassword  
          }).then((res)=>{
            console.log(res.data);
            console.log("clinic registered successfully");
            navigate('/doctordashboard');
          }).catch((err)=>{
            console.log(err);
          })
          alert(
            "Clinic registration successful! Please complete your full clinic profile."
          );
        
        } else {

          const {firstName,lastName,email,phone,password,confirmPassword}=formData;

          axios.post('http://localhost:5500/users/register', {
            firstName,lastName,email,phone,password,confirmPassword

          }).then((res)=>{
            console.log(res.data);
            console.log("user registered successfully");
            navigate('/userdetail');
          }).catch((err)=>{
            console.log(err); 
          })
          alert("Registration successful! Welcome to MediBook.");
          
        }
      }
    } catch (error) {
      console.error("Authentication error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      clinicName: "",
      licenseNumber: "",
    });
    setErrors({});
  };

  const switchUserType = (type) => {
    setUserType(type);
    setFormData({
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      phone: "",
      clinicName: "",
      licenseNumber: "",
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1920&h=1080&fit=crop"
          alt="Medical background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20"></div>
      </div>

      <div className="relative w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <i className="fas fa-heartbeat text-white text-2xl"></i>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  MediBook
                </span>
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? "Welcome Back" : "Create Account"}
              </h1>
              <p className="text-gray-600">
                {isLogin
                  ? `Sign in to your ${
                      userType === "clinic" ? "clinic" : "patient"
                    } account`
                  : `Join MediBook as a ${
                      userType === "clinic" ? "healthcare provider" : "patient"
                    }`}
              </p>
            </div>

            {/* User Type Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              <button
                onClick={() => switchUserType("patient")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  userType === "patient"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <i className="fas fa-user mr-2"></i>Patient
              </button>
              <button
                onClick={() => switchUserType("clinic")}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  userType === "clinic"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <i className="fas fa-hospital mr-2"></i>Clinic
              </button>
            </div>

            {/* Login/Register Toggle */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  isLogin
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all duration-300 ${
                  !isLogin
                    ? "bg-white text-gray-900 shadow-md"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="transition-all duration-500">
                {!isLogin && userType === "patient" && (
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                          errors.firstName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="John"
                      />
                      {errors.firstName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                          errors.lastName ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="text-red-500 text-sm mt-1">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {!isLogin && userType === "clinic" && (
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Clinic Name
                    </label>
                    <div className="relative">
                      <i className="fas fa-hospital absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        name="clinicName"
                        value={formData.clinicName}
                        onChange={(e) =>
                          handleInputChange("clinicName", e.target.value)
                        }
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                          errors.clinicName
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="Your Clinic Name"
                      />
                    </div>
                    {errors.clinicName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.clinicName}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <i className="fas fa-envelope absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder={
                        userType === "clinic"
                          ? "clinic@example.com"
                          : "john@example.com"
                      }
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <div className="relative">
                      <i className="fas fa-phone absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                          errors.phone ? "border-red-500" : "border-gray-300"
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                )}

                {!isLogin && userType === "clinic" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Medical License Number
                    </label>
                    <div className="relative">
                      <i className="fas fa-certificate absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="text"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={(e) =>
                          handleInputChange("licenseNumber", e.target.value)
                        }
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                          errors.licenseNumber
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="License number"
                      />
                    </div>
                    {errors.licenseNumber && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.licenseNumber}
                      </p>
                    )}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={(e) =>
                        handleInputChange("password", e.target.value)
                      }
                      className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="••••••••"
                    />
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>

                {!isLogin && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <i className="fas fa-lock absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={(e) =>
                          handleInputChange("confirmPassword", e.target.value)
                        }
                        className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        placeholder="••••••••"
                      />
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>
                )}

                {isLogin && (
                  <div className="flex items-center justify-between">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        Remember me
                      </span>
                    </label>
                    <a
                      href="#"
                      className="text-sm text-purple-600 hover:text-purple-700 font-medium"
                    >
                      Forgot password?
                    </a>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      {isLogin ? "Signing In..." : "Creating Account..."}
                    </div>
                  ) : isLogin ? (
                    `Sign In${userType === "clinic" ? " to Clinic" : ""}`
                  ) : (
                    `Create ${userType === "clinic" ? "Clinic " : ""}Account`
                  )}
                </button>
              </div>
            </form>

            <div className="mt-8">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300">
                  <i className="fab fa-google text-red-500 text-lg"></i>
                  <span className="ml-2">Google</span>
                </button>
                <button className="w-full inline-flex justify-center py-3 px-4 border border-gray-300 rounded-xl shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition-all duration-300">
                  <i className="fab fa-facebook text-blue-600 text-lg"></i>
                  <span className="ml-2">Facebook</span>
                </button>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600">
                {isLogin
                  ? "Don't have an account?"
                  : "Already have an account?"}
                <button
                  onClick={toggleMode}
                  className="ml-1 text-purple-600 hover:text-purple-700 font-medium transition-colors"
                >
                  {isLogin ? "Sign up" : "Sign in"}
                </button>
              </p>
            </div>

            {!isLogin && userType === "clinic" && (
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  Need to register a full clinic profile?{" "}
                  <a
                    href="/clinic-register"
                    className="text-purple-600 hover:text-purple-700 font-medium"
                  >
                    Complete Registration
                  </a>
                </p>
              </div>
            )}

            {!isLogin && (
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500">
                  By creating an account, you agree to our{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-700">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-purple-600 hover:text-purple-700">
                    Privacy Policy
                  </a>
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/"
            className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors"
          >
            <i className="fas fa-arrow-left mr-2"></i>
            Back to Home
          </Link>
        </div>
      </div>

      <style jsx global>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}

export default UserLogin;