"use client";
import React from "react";

function DoctorDashboard() {
  const [activeTab, setActiveTab] = React.useState("dashboard");
  const [appointments, setAppointments] = React.useState([
    {
      id: 1,
      patientName: "John Smith",
      patientEmail: "john.smith@email.com",
      patientPhone: "+1 (555) 123-4567",
      date: "2025-08-05",
      time: "10:00 AM",
      status: "pending",
      reason: "Chest pain and shortness of breath",
      type: "Consultation",
      duration: 30,
      notes: "First time patient",
    },
    {
      id: 2,
      patientName: "Sarah Johnson",
      patientEmail: "sarah.j@email.com",
      patientPhone: "+1 (555) 234-5678",
      date: "2025-08-05",
      time: "11:30 AM",
      status: "confirmed",
      reason: "Follow-up appointment",
      type: "Follow-up",
      duration: 20,
      notes: "Regular checkup",
    },
    {
      id: 3,
      patientName: "Michael Chen",
      patientEmail: "mchen@email.com",
      patientPhone: "+1 (555) 345-6789",
      date: "2025-08-06",
      time: "2:00 PM",
      status: "pending",
      reason: "Heart palpitations",
      type: "Consultation",
      duration: 45,
      notes: "Referred by Dr. Williams",
    },
    {
      id: 4,
      patientName: "Emily Davis",
      patientEmail: "emily.davis@email.com",
      patientPhone: "+1 (555) 456-7890",
      date: "2025-08-04",
      time: "9:00 AM",
      status: "completed",
      reason: "Routine cardiac screening",
      type: "Screening",
      duration: 60,
      notes: "Annual checkup",
    },
  ]);

  const [timeSlots, setTimeSlots] = React.useState([
    { id: 1, time: "9:00 AM", available: true, duration: 30 },
    { id: 2, time: "9:30 AM", available: false, duration: 30 },
    { id: 3, time: "10:00 AM", available: false, duration: 30 },
    { id: 4, time: "10:30 AM", available: true, duration: 30 },
    { id: 5, time: "11:00 AM", available: true, duration: 30 },
    { id: 6, time: "11:30 AM", available: false, duration: 30 },
    { id: 7, time: "2:00 PM", available: true, duration: 30 },
    { id: 8, time: "2:30 PM", available: true, duration: 30 },
    { id: 9, time: "3:00 PM", available: true, duration: 30 },
    { id: 10, time: "3:30 PM", available: true, duration: 30 },
    { id: 11, time: "4:00 PM", available: true, duration: 30 },
    { id: 12, time: "4:30 PM", available: true, duration: 30 },
  ]);

  const [clinicProfile, setClinicProfile] = React.useState({
    name: "Heart Care Medical Center",
    address: "123 Medical Plaza, Suite 200",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    phone: "+1 (555) 123-4567",
    email: "info@heartcaremedical.com",
    website: "www.heartcaremedical.com",
    description:
      "Leading cardiac care facility specializing in comprehensive heart health services.",
    specialties: ["Cardiology", "Cardiac Surgery", "Interventional Cardiology"],
    workingHours: {
      monday: "9:00 AM - 5:00 PM",
      tuesday: "9:00 AM - 5:00 PM",
      wednesday: "9:00 AM - 5:00 PM",
      thursday: "9:00 AM - 5:00 PM",
      friday: "9:00 AM - 5:00 PM",
      saturday: "9:00 AM - 2:00 PM",
      sunday: "Closed",
    },
  });

  const [selectedDate, setSelectedDate] = React.useState("2025-08-05");
  const [showAppointmentModal, setShowAppointmentModal] = React.useState(false);
  const [selectedAppointment, setSelectedAppointment] = React.useState(null);
  const [isEditingProfile, setIsEditingProfile] = React.useState(false);

  const handleAppointmentAction = (appointmentId, action) => {
    setAppointments((prev) =>
      prev.map((apt) =>
        apt.id === appointmentId
          ? {
              ...apt,
              status:
                action === "accept"
                  ? "confirmed"
                  : action === "complete"
                  ? "completed"
                  : "cancelled",
            }
          : apt
      )
    );
  };

  const toggleTimeSlot = (slotId) => {
    setTimeSlots((prev) =>
      prev.map((slot) =>
        slot.id === slotId ? { ...slot, available: !slot.available } : slot
      )
    );
  };

  const handleProfileUpdate = (field, value) => {
    setClinicProfile((prev) => ({ ...prev, [field]: value }));
  };

  const getAppointmentStats = () => {
    const today = new Date().toISOString().split("T")[0];
    const pending = appointments.filter(
      (apt) => apt.status === "pending"
    ).length;
    const confirmed = appointments.filter(
      (apt) => apt.status === "confirmed"
    ).length;
    const completed = appointments.filter(
      (apt) => apt.status === "completed"
    ).length;
    const todayAppointments = appointments.filter(
      (apt) => apt.date === today
    ).length;

    return { pending, confirmed, completed, todayAppointments };
  };

  const stats = getAppointmentStats();

  const pendingAppointments = appointments.filter(
    (apt) => apt.status === "pending"
  );
  const confirmedAppointments = appointments.filter(
    (apt) => apt.status === "confirmed"
  );
  const todayAppointments = appointments.filter(
    (apt) => apt.date === selectedDate
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1920&h=1080&fit=crop"
          alt="Medical background"
          className="w-full h-full object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-pink-900/10 to-orange-900/10"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50">
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
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="font-semibold text-gray-900">
                  {clinicProfile.name}
                </p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                <i className="fas fa-hospital text-white"></i>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8">
          <div className="flex flex-wrap gap-2">
            {[
              {
                id: "dashboard",
                label: "Dashboard",
                icon: "fas fa-chart-line",
              },
              {
                id: "appointments",
                label: "Appointments",
                icon: "fas fa-calendar-alt",
              },
              { id: "schedule", label: "Schedule", icon: "fas fa-clock" },
              {
                id: "profile",
                label: "Clinic Profile",
                icon: "fas fa-hospital",
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Pending Requests
                    </p>
                    <p className="text-3xl font-bold text-orange-600">
                      {stats.pending}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <i className="fas fa-clock text-orange-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Confirmed Today
                    </p>
                    <p className="text-3xl font-bold text-green-600">
                      {stats.confirmed}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <i className="fas fa-check-circle text-green-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Completed
                    </p>
                    <p className="text-3xl font-bold text-blue-600">
                      {stats.completed}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <i className="fas fa-user-check text-blue-600 text-xl"></i>
                  </div>
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">
                      Today's Schedule
                    </p>
                    <p className="text-3xl font-bold text-purple-600">
                      {stats.todayAppointments}
                    </p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <i className="fas fa-calendar-day text-purple-600 text-xl"></i>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Pending Requests
                </h3>
                <div className="space-y-4">
                  {pendingAppointments.slice(0, 3).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 bg-orange-50 rounded-xl"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {appointment.patientName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {appointment.date} at {appointment.time}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.reason}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() =>
                            handleAppointmentAction(appointment.id, "accept")
                          }
                          className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() =>
                            handleAppointmentAction(appointment.id, "cancel")
                          }
                          className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                        >
                          Decline
                        </button>
                      </div>
                    </div>
                  ))}
                  {pendingAppointments.length === 0 && (
                    <p className="text-gray-500 text-center py-8">
                      No pending requests
                    </p>
                  )}
                </div>
              </div>

              <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                  Today's Appointments
                </h3>
                <div className="space-y-4">
                  {todayAppointments.slice(0, 3).map((appointment) => (
                    <div
                      key={appointment.id}
                      className="flex items-center justify-between p-4 bg-green-50 rounded-xl"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">
                          {appointment.patientName}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {appointment.time} - {appointment.type}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.reason}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : appointment.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-orange-100 text-orange-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {todayAppointments.length === 0 && (
                    <p className="text-gray-500 text-center py-8">
                      No appointments today
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Appointments Tab */}
        {activeTab === "appointments" && (
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                All Appointments
              </h3>
              <div className="flex items-center space-x-4">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Patient
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Date & Time
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Reason
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.map((appointment) => (
                    <tr
                      key={appointment.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-4 px-4">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {appointment.patientName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {appointment.patientEmail}
                          </p>
                          <p className="text-sm text-gray-600">
                            {appointment.patientPhone}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <p className="font-medium text-gray-900">
                          {appointment.date}
                        </p>
                        <p className="text-sm text-gray-600">
                          {appointment.time}
                        </p>
                        <p className="text-sm text-gray-500">
                          {appointment.duration} min
                        </p>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                          {appointment.type}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <p className="text-sm text-gray-900">
                          {appointment.reason}
                        </p>
                        {appointment.notes && (
                          <p className="text-xs text-gray-500 mt-1">
                            {appointment.notes}
                          </p>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === "confirmed"
                              ? "bg-green-100 text-green-800"
                              : appointment.status === "pending"
                              ? "bg-orange-100 text-orange-800"
                              : appointment.status === "completed"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex space-x-2">
                          {appointment.status === "pending" && (
                            <>
                              <button
                                onClick={() =>
                                  handleAppointmentAction(
                                    appointment.id,
                                    "accept"
                                  )
                                }
                                className="px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() =>
                                  handleAppointmentAction(
                                    appointment.id,
                                    "cancel"
                                  )
                                }
                                className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                              >
                                Decline
                              </button>
                            </>
                          )}
                          {appointment.status === "confirmed" && (
                            <button
                              onClick={() =>
                                handleAppointmentAction(
                                  appointment.id,
                                  "complete"
                                )
                              }
                              className="px-3 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                            >
                              Complete
                            </button>
                          )}
                          <button
                            onClick={() => {
                              setSelectedAppointment(appointment);
                              setShowAppointmentModal(true);
                            }}
                            className="px-3 py-1 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition-colors"
                          >
                            View
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === "schedule" && (
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Time Slot Management
              </h3>
              <div className="flex items-center space-x-4">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {timeSlots.map((slot) => (
                <div
                  key={slot.id}
                  onClick={() => toggleTimeSlot(slot.id)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                    slot.available
                      ? "border-green-300 bg-green-50 hover:bg-green-100"
                      : "border-red-300 bg-red-50 hover:bg-red-100"
                  }`}
                >
                  <div className="text-center">
                    <p className="font-semibold text-gray-900">{slot.time}</p>
                    <p className="text-sm text-gray-600">{slot.duration} min</p>
                    <div className="mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          slot.available
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {slot.available ? "Available" : "Booked"}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-4 bg-blue-50 rounded-xl">
              <div className="flex items-start">
                <i className="fas fa-info-circle text-blue-600 mr-3 mt-1"></i>
                <div>
                  <h5 className="font-medium text-blue-800 mb-1">
                    Schedule Management
                  </h5>
                  <p className="text-blue-700 text-sm">
                    Click on time slots to toggle availability. Green slots are
                    available for booking, red slots are blocked or already
                    booked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Profile Tab */}
        {activeTab === "profile" && (
          <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">
                Clinic Profile
              </h3>
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className={`px-6 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isEditingProfile
                    ? "bg-gray-600 text-white hover:bg-gray-700"
                    : "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg"
                }`}
              >
                {isEditingProfile ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Clinic Name
                  </label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={clinicProfile.name}
                      onChange={(e) =>
                        handleProfileUpdate("name", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <p className="text-gray-900 font-medium">
                      {clinicProfile.name}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  {isEditingProfile ? (
                    <input
                      type="text"
                      value={clinicProfile.address}
                      onChange={(e) =>
                        handleProfileUpdate("address", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <p className="text-gray-900">{clinicProfile.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={clinicProfile.city}
                        onChange={(e) =>
                          handleProfileUpdate("city", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{clinicProfile.city}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={clinicProfile.state}
                        onChange={(e) =>
                          handleProfileUpdate("state", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{clinicProfile.state}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      ZIP Code
                    </label>
                    {isEditingProfile ? (
                      <input
                        type="text"
                        value={clinicProfile.zipCode}
                        onChange={(e) =>
                          handleProfileUpdate("zipCode", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{clinicProfile.zipCode}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone
                    </label>
                    {isEditingProfile ? (
                      <input
                        type="tel"
                        value={clinicProfile.phone}
                        onChange={(e) =>
                          handleProfileUpdate("phone", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{clinicProfile.phone}</p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email
                    </label>
                    {isEditingProfile ? (
                      <input
                        type="email"
                        value={clinicProfile.email}
                        onChange={(e) =>
                          handleProfileUpdate("email", e.target.value)
                        }
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                      />
                    ) : (
                      <p className="text-gray-900">{clinicProfile.email}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  {isEditingProfile ? (
                    <input
                      type="url"
                      value={clinicProfile.website}
                      onChange={(e) =>
                        handleProfileUpdate("website", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                    />
                  ) : (
                    <p className="text-gray-900">{clinicProfile.website}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  {isEditingProfile ? (
                    <textarea
                      value={clinicProfile.description}
                      onChange={(e) =>
                        handleProfileUpdate("description", e.target.value)
                      }
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                    />
                  ) : (
                    <p className="text-gray-900">{clinicProfile.description}</p>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Specialties
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {clinicProfile.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Working Hours
                  </label>
                  <div className="space-y-3">
                    {Object.entries(clinicProfile.workingHours).map(
                      ([day, hours]) => (
                        <div
                          key={day}
                          className="flex justify-between items-center"
                        >
                          <span className="font-medium text-gray-900 capitalize">
                            {day}
                          </span>
                          {isEditingProfile ? (
                            <input
                              type="text"
                              value={hours}
                              onChange={(e) =>
                                handleProfileUpdate("workingHours", {
                                  ...clinicProfile.workingHours,
                                  [day]: e.target.value,
                                })
                              }
                              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                            />
                          ) : (
                            <span className="text-gray-600">{hours}</span>
                          )}
                        </div>
                      )
                    )}
                  </div>
                </div>

                {isEditingProfile && (
                  <div className="pt-6">
                    <button
                      onClick={() => setIsEditingProfile(false)}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Appointment Details Modal */}
      {showAppointmentModal && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Appointment Details
              </h3>
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
              >
                <i className="fas fa-times text-gray-600"></i>
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Patient Name
                  </label>
                  <p className="text-gray-900 font-semibold">
                    {selectedAppointment.patientName}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">
                    {selectedAppointment.patientEmail}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <p className="text-gray-900">
                    {selectedAppointment.patientPhone}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date & Time
                  </label>
                  <p className="text-gray-900">
                    {selectedAppointment.date} at {selectedAppointment.time}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Appointment Type
                  </label>
                  <p className="text-gray-900">{selectedAppointment.type}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Duration
                  </label>
                  <p className="text-gray-900">
                    {selectedAppointment.duration} minutes
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status
                  </label>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      selectedAppointment.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : selectedAppointment.status === "pending"
                        ? "bg-orange-100 text-orange-800"
                        : selectedAppointment.status === "completed"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {selectedAppointment.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reason for Visit
              </label>
              <p className="text-gray-900 bg-gray-50 p-4 rounded-xl">
                {selectedAppointment.reason}
              </p>
            </div>

            {selectedAppointment.notes && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Notes
                </label>
                <p className="text-gray-900 bg-gray-50 p-4 rounded-xl">
                  {selectedAppointment.notes}
                </p>
              </div>
            )}

            <div className="flex justify-end space-x-4 mt-8">
              <button
                onClick={() => setShowAppointmentModal(false)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              {selectedAppointment.status === "pending" && (
                <>
                  <button
                    onClick={() => {
                      handleAppointmentAction(selectedAppointment.id, "accept");
                      setShowAppointmentModal(false);
                    }}
                    className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors"
                  >
                    Accept
                  </button>
                  <button
                    onClick={() => {
                      handleAppointmentAction(selectedAppointment.id, "cancel");
                      setShowAppointmentModal(false);
                    }}
                    className="px-6 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                  >
                    Decline
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DoctorDashboard;