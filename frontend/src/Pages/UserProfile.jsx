"use client";
import React from "react";

// import { useUpload } from "../utilities/runtime-helpers";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { Link } from "react-router-dom";

function UserProfile() {
  const [activeTab, setActiveTab] = React.useState("profile");
  const [isEditing, setIsEditing] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({
    name: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    gender: "Female",
    address: "123 Main Street, Downtown District",
    emergencyContact: "John Johnson - +1 (555) 987-6543",
    bloodType: "O+",
    allergies: "Penicillin, Shellfish",
  });
  const [profileImage, setProfileImage] = React.useState(
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
  );
//   const [upload, { loading: uploading }] = useUpload();

  const upcomingAppointments = [
    {
      id: 1,
      doctor: "Dr. Michael Chen",
      specialty: "Cardiologist",
      date: "2025-08-05",
      time: "10:30 AM",
      clinic: "Heart & Vascular Center",
      status: "Confirmed",
    },
    {
      id: 2,
      doctor: "Dr. Emily Rodriguez",
      specialty: "Dermatologist",
      date: "2025-08-08",
      time: "2:00 PM",
      clinic: "Skin Care Clinic",
      status: "Pending",
    },
  ];

  const pastAppointments = [
    {
      id: 3,
      doctor: "Dr. Sarah Johnson",
      specialty: "General Physician",
      date: "2025-07-20",
      time: "9:00 AM",
      clinic: "MediCare Plus Hospital",
      status: "Completed",
      notes: "Regular checkup - All vitals normal",
    },
    {
      id: 4,
      doctor: "Dr. Michael Chen",
      specialty: "Cardiologist",
      date: "2025-07-10",
      time: "11:00 AM",
      clinic: "Heart & Vascular Center",
      status: "Completed",
      notes: "ECG test completed - Results normal",
    },
  ];

  const medicalReports = [
    {
      id: 1,
      name: "Blood Test Results",
      date: "2025-07-20",
      type: "Lab Report",
      doctor: "Dr. Sarah Johnson",
      size: "2.4 MB",
    },
    {
      id: 2,
      name: "ECG Report",
      date: "2025-07-10",
      type: "Diagnostic",
      doctor: "Dr. Michael Chen",
      size: "1.8 MB",
    },
    {
      id: 3,
      name: "X-Ray Chest",
      date: "2025-06-15",
      type: "Imaging",
      doctor: "Dr. Emily Rodriguez",
      size: "5.2 MB",
    },
  ];

  const handleInputChange = (field, value) => {
    setUserInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    alert("Profile updated successfully!");
  };

  const handleImageUpload = async (file) => {
    const { url, error } = await upload({ file });
    if (error) {
      alert("Failed to upload image");
      return;
    }
    setProfileImage(url);
  };

  const handleFileUpload = async (file) => {
    const { url, error } = await upload({ file });
    if (error) {
      alert("Failed to upload file");
      return;
    }
    alert("Medical report uploaded successfully!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <i className="fas fa-heartbeat text-white text-xl"></i>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                MediBook
              </span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <Link
                to="/"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to='/searchresult'
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Find Doctors
              </Link>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Check Disease
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Contact
              </a>
            </nav>
            <div className="flex items-center space-x-4">
             <Link to={"/userlogin"}> <button className="text-purple-600 hover:text-purple-700 font-medium">
                Logout
              </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover border-4 border-purple-100 shadow-lg"
              />
              <label className="absolute bottom-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white p-2 rounded-full cursor-pointer hover:shadow-lg transition-all">
                <i className="fas fa-camera"></i>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      handleImageUpload(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {userInfo.name}
              </h1>
              <p className="text-purple-600 font-medium mb-4">
                {userInfo.email}
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <i className="fas fa-phone mr-2 text-purple-600"></i>
                  {userInfo.phone}
                </span>
                <span className="flex items-center">
                  <i className="fas fa-birthday-cake mr-2 text-purple-600"></i>
                  {new Date(userInfo.dateOfBirth).toLocaleDateString()}
                </span>
                <span className="flex items-center">
                  <i className="fas fa-venus-mars mr-2 text-purple-600"></i>
                  {userInfo.gender}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-2xl shadow-xl mb-8 overflow-hidden">
          <div className="flex flex-wrap border-b border-gray-200">
            {[
              { id: "profile", label: "Personal Info", icon: "fas fa-user" },
              {
                id: "appointments",
                label: "Appointments",
                icon: "fas fa-calendar",
              },
              {
                id: "reports",
                label: "Medical Reports",
                icon: "fas fa-file-medical",
              },
              { id: "settings", label: "Settings", icon: "fas fa-cog" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-0 px-4 py-4 text-center font-medium transition-all ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          <div className="p-6 md:p-8">
            {/* Personal Information Tab */}
            {activeTab === "profile" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Personal Information
                  </h2>
                  <button
                    onClick={() =>
                      isEditing ? handleSaveProfile() : setIsEditing(true)
                    }
                    className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-xl hover:shadow-lg transition-all font-medium"
                  >
                    {isEditing ? "Save Changes" : "Edit Profile"}
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={userInfo.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={userInfo.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={userInfo.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={userInfo.dateOfBirth}
                      onChange={(e) =>
                        handleInputChange("dateOfBirth", e.target.value)
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      value={userInfo.gender}
                      onChange={(e) =>
                        handleInputChange("gender", e.target.value)
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Blood Type
                    </label>
                    <input
                      type="text"
                      value={userInfo.bloodType}
                      onChange={(e) =>
                        handleInputChange("bloodType", e.target.value)
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={userInfo.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      value={userInfo.emergencyContact}
                      onChange={(e) =>
                        handleInputChange("emergencyContact", e.target.value)
                      }
                      disabled={!isEditing}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Allergies
                    </label>
                    <textarea
                      value={userInfo.allergies}
                      onChange={(e) =>
                        handleInputChange("allergies", e.target.value)
                      }
                      disabled={!isEditing}
                      rows="3"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all disabled:bg-gray-50 resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            {/* Appointments Tab */}
            {activeTab === "appointments" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  My Appointments
                </h2>

                {/* Upcoming Appointments */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Upcoming Appointments
                  </h3>
                  <div className="space-y-4">
                    {upcomingAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-l-4 border-purple-600"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-2">
                              {appointment.doctor}
                            </h4>
                            <p className="text-purple-600 font-medium mb-2">
                              {appointment.specialty}
                            </p>
                            <p className="text-gray-600 mb-2">
                              {appointment.clinic}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                              <span className="flex items-center">
                                <i className="fas fa-calendar mr-2"></i>
                                {new Date(
                                  appointment.date
                                ).toLocaleDateString()}
                              </span>
                              <span className="flex items-center">
                                <i className="fas fa-clock mr-2"></i>
                                {appointment.time}
                              </span>
                            </div>
                          </div>
                          <div className="mt-4 md:mt-0 flex items-center space-x-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm font-medium ${
                                appointment.status === "Confirmed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {appointment.status}
                            </span>
                            <button className="text-purple-600 hover:text-purple-700 font-medium">
                              Reschedule
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Past Appointments */}
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    Past Appointments
                  </h3>
                  <div className="space-y-4">
                    {pastAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="bg-white rounded-xl p-6 border border-gray-200"
                      >
                        <div className="flex flex-col md:flex-row md:items-center justify-between">
                          <div className="flex-1">
                            <h4 className="font-bold text-gray-900 mb-2">
                              {appointment.doctor}
                            </h4>
                            <p className="text-purple-600 font-medium mb-2">
                              {appointment.specialty}
                            </p>
                            <p className="text-gray-600 mb-2">
                              {appointment.clinic}
                            </p>
                            <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
                              <span className="flex items-center">
                                <i className="fas fa-calendar mr-2"></i>
                                {new Date(
                                  appointment.date
                                ).toLocaleDateString()}
                              </span>
                              <span className="flex items-center">
                                <i className="fas fa-clock mr-2"></i>
                                {appointment.time}
                              </span>
                            </div>
                            {appointment.notes && (
                              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                                <strong>Notes:</strong> {appointment.notes}
                              </p>
                            )}
                          </div>
                          <div className="mt-4 md:mt-0 flex items-center space-x-4">
                            <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                              {appointment.status}
                            </span>
                            <button className="text-purple-600 hover:text-purple-700 font-medium">
                              Book Again
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Medical Reports Tab */}
            {activeTab === "reports" && (
              <div>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                    Medical Reports
                  </h2>
                  <label className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-medium cursor-pointer">
                    <i className="fas fa-upload mr-2"></i>
                    Upload Report
                    <input
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                      className="hidden"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          handleFileUpload(e.target.files[0]);
                        }
                      }}
                    />
                  </label>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {medicalReports.map((report) => (
                    <div
                      key={report.id}
                      className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                          <i className="fas fa-file-medical text-purple-600 text-xl"></i>
                        </div>
                        <button className="text-gray-400 hover:text-gray-600">
                          <i className="fas fa-ellipsis-v"></i>
                        </button>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        {report.name}
                      </h4>
                      <p className="text-purple-600 font-medium mb-2">
                        {report.type}
                      </p>
                      <p className="text-gray-600 text-sm mb-2">
                        Dr. {report.doctor}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                        <span>
                          {new Date(report.date).toLocaleDateString()}
                        </span>
                        <span>{report.size}</span>
                      </div>
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-purple-100 text-purple-600 py-2 rounded-lg hover:bg-purple-200 transition-all font-medium">
                          View
                        </button>
                        <button className="flex-1 bg-gray-100 text-gray-600 py-2 rounded-lg hover:bg-gray-200 transition-all font-medium">
                          Download
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === "settings" && (
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Account Settings
                </h2>

                <div className="space-y-6">
                  {/* Notification Settings */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Notification Preferences
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Email Notifications
                          </h4>
                          <p className="text-sm text-gray-600">
                            Receive appointment reminders via email
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            SMS Notifications
                          </h4>
                          <p className="text-sm text-gray-600">
                            Receive appointment reminders via SMS
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input type="checkbox" className="sr-only peer" />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Privacy Settings */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Privacy Settings
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">
                            Profile Visibility
                          </h4>
                          <p className="text-sm text-gray-600">
                            Allow doctors to view your profile
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            className="sr-only peer"
                            defaultChecked
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Security Settings */}
                  <div className="bg-white rounded-xl p-6 border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Security
                    </h3>
                    <div className="space-y-4">
                      <button className="w-full md:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all font-medium">
                        Change Password
                      </button>
                      <button className="w-full md:w-auto bg-gray-100 text-gray-700 px-6 py-3 rounded-xl hover:bg-gray-200 transition-all font-medium ml-0 md:ml-4">
                        Enable Two-Factor Authentication
                      </button>
                    </div>
                  </div>

                  {/* Danger Zone */}
                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <h3 className="text-lg font-semibold text-red-900 mb-4">
                      Danger Zone
                    </h3>
                    <p className="text-red-700 mb-4">
                      Once you delete your account, there is no going back.
                      Please be certain.
                    </p>
                    <button className="bg-red-600 text-white px-6 py-3 rounded-xl hover:bg-red-700 transition-all font-medium">
                      Delete Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;