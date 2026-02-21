"use client";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function UserDetail() {
  const [formData, setFormData] = useState({
    address: "",
    bloodGroup: "",
    allergies: "",
    gender: "",
    dob: "",
    emergencyContact: ""
  });
  const navigate=useNavigate();
  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {

    e.preventDefault();
    const token = localStorage.getItem("userToken");
    console.log("Submitting form with data:", formData); // Debugging log
    console.log("Using token:", token); // Debugging log
    const response=axios.post('http://localhost:5500/users/userdetail', formData, {
      headers: {
        Authorization: `Bearer ${token}`  
      }
    }).then((res)=>{
      console.log(res.data);
      navigate('/userprofile');
    }).catch((err)=>{
      console.log(err);
    });
    
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center p-6">
      <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Patient Health Information
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
              placeholder="123 Street Name, City, State"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Blood Group
            </label>
            <select
              value={formData.bloodGroup}
              onChange={(e) => handleChange("bloodGroup", e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none border-gray-300"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Allergies
            </label>
            <textarea
              value={formData.allergies}
              onChange={(e) => handleChange("allergies", e.target.value)}
              placeholder="List any known allergies"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Gender
            </label>
            <div className="flex space-x-6">
              {['Male', 'Female', 'Other'].map((g) => (
                <label key={g} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={formData.gender === g}
                    onChange={(e) => handleChange("gender", e.target.value)}
                    className="text-purple-600"
                  />
                  <span className="text-gray-700 text-sm">{g}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Date of Birth
            </label>
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => handleChange("dob", e.target.value)}
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none border-gray-300"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Emergency Contact
            </label>
            <input
              type="tel"
              value={formData.emergencyContact}
              onChange={(e) => handleChange("emergencyContact", e.target.value)}
              placeholder="e.g. +91 9876543210"
              className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none border-gray-300"
            />
          </div>

         <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
          >
            Submit Information
          </button>
          
        </form>
      </div>
    </div>
  );
}
