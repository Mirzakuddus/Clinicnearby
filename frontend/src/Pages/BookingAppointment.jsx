import React from "react";
import { Link } from "react-router-dom";
function BookingAppointment() {
  const [selectedDate, setSelectedDate] = React.useState(new Date().toISOString().split('T')[0]);
  const [selectedTime, setSelectedTime] = React.useState('');
  const [bookingForm, setBookingForm] = React.useState({
    name: '',
    email: '',
    phone: '',
    reason: '',
    doctor: ''
  });
  const [showBookingModal, setShowBookingModal] = React.useState(false);

  const clinic = {
    name: "Heart & Vascular Center",
    specialty: "Cardiology & Cardiovascular Surgery",
    rating: 4.8,
    reviews: 342,
    location: "123 Medical Plaza, Downtown District",
    phone: "+1 (555) 123-4567",
    email: "info@heartcenter.com",
    website: "www.heartcenter.com",
    description: "Leading cardiovascular care center with state-of-the-art facilities and experienced specialists dedicated to heart health.",
    images: [
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=800&h=400&fit=crop",
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=800&h=400&fit=crop"
    ],
    hours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 5:00 PM",
      saturday: "9:00 AM - 2:00 PM",
      sunday: "Closed"
    },
    services: [
      "Cardiac Catheterization",
      "Echocardiography",
      "Stress Testing",
      "Holter Monitoring",
      "Pacemaker Implantation",
      "Cardiac Surgery"
    ]
  };

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Interventional Cardiologist",
      experience: "15+ years",
      education: "MD from Harvard Medical School",
      certifications: ["Board Certified in Cardiology", "Fellowship in Interventional Cardiology"],
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      rating: 4.9
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Cardiac Surgeon",
      experience: "18+ years",
      education: "MD from Johns Hopkins University",
      certifications: ["Board Certified in Cardiac Surgery", "Fellowship in Minimally Invasive Surgery"],
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
      rating: 4.8
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Preventive Cardiologist",
      experience: "12+ years",
      education: "MD from Stanford University",
      certifications: ["Board Certified in Cardiology", "Certified in Preventive Medicine"],
      image: "https://images.unsplash.com/photo-1594824475317-d3c2b8b8b8b8?w=300&h=300&fit=crop&crop=face",
      rating: 4.9
    }
  ];

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM", "5:00 PM"
  ];

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!selectedTime || !bookingForm.name || !bookingForm.email || !bookingForm.phone) {
      alert('Please fill in all required fields and select a time slot.');
      return;
    }
    setShowBookingModal(true);
  };

  const handleInputChange = (field, value) => {
    setBookingForm(prev => ({
      ...prev,
      [field]: value
    }));
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
              <Link to="/" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Home
              </Link>
              <Link to='/searchresult' className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Find Doctors
              </Link>
              <Link to="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Check Disease
              </Link>
              <Link to="#" className="text-gray-700 hover:text-purple-600 font-medium transition-colors">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
             <Link to={"/userprofile"}> 
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                Profile
              </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Clinic Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="mb-6">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {clinic.name}
                </h1>
                <p className="text-xl text-purple-600 font-medium mb-4">
                  {clinic.specialty}
                </p>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array.from({length: 5})].map((_, i) => (
                      <i key={i} className="fas fa-star"></i>
                    ))}
                  </div>
                  <span className="text-gray-700 font-medium">{clinic.rating}</span>
                  <span className="text-gray-500 ml-2">({clinic.reviews} reviews)</span>
                </div>
                <p className="text-gray-600 mb-6">{clinic.description}</p>
                
                <div className="space-y-3">
                  <div className="flex items-center text-gray-700">
                    <i className="fas fa-map-marker-alt text-purple-600 mr-3"></i>
                    <span>{clinic.location}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <i className="fas fa-phone text-purple-600 mr-3"></i>
                    <span>{clinic.phone}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <i className="fas fa-envelope text-purple-600 mr-3"></i>
                    <span>{clinic.email}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <img
                src={clinic.images[0]}
                alt="Clinic exterior"
                className="w-full h-48 object-cover rounded-2xl shadow-lg col-span-2"
              />
              <img
                src={clinic.images[1]}
                alt="Clinic interior"
                className="w-full h-32 object-cover rounded-2xl shadow-lg"
              />
              <img
                src={clinic.images[2]}
                alt="Medical equipment"
                className="w-full h-32 object-cover rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Operating Hours */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Operating Hours</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(clinic.hours).map(([day, hours]) => (
              <div key={day} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 text-center">
                <h3 className="font-bold text-gray-900 capitalize mb-2">{day}</h3>
                <p className="text-purple-600 font-medium">{hours}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Services</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinic.services.map((service, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mb-4">
                  <i className="fas fa-heart text-white"></i>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{service}</h3>
                <p className="text-gray-600">Professional {service.toLowerCase()} services with advanced technology.</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Doctors */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Doctors</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {doctors.map((doctor) => (
              <div key={doctor.id} className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="text-center mb-6">
                  <img
                    src={doctor.image}
                    alt={doctor.name}
                    className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-lg mb-4"
                  />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{doctor.name}</h3>
                  <p className="text-purple-600 font-medium mb-2">{doctor.specialty}</p>
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex text-yellow-400 mr-2">
                      {[...Array.from({length: 5})].map((_, i) => (
                        <i key={i} className="fas fa-star"></i>
                      ))}
                    </div>
                    <span className="text-gray-700 font-medium">{doctor.rating}</span>
                  </div>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div>
                    <h4 className="font-semibold text-gray-900">Experience</h4>
                    <p className="text-gray-600">{doctor.experience}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Education</h4>
                    <p className="text-gray-600">{doctor.education}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Certifications</h4>
                    <ul className="text-gray-600">
                      {doctor.certifications.map((cert, index) => (
                        <li key={index} className="flex items-center">
                          <i className="fas fa-check text-green-500 mr-2"></i>
                          {cert}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section className="py-12 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Book an Appointment</h2>
          
          <div className="bg-white rounded-2xl shadow-2xl p-8">
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={bookingForm.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingForm.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Doctor
                  </label>
                  <select
                    name="doctor"
                    value={bookingForm.doctor}
                    onChange={(e) => handleInputChange('doctor', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">Select a doctor</option>
                    {doctors.map((doctor) => (
                      <option key={doctor.id} value={doctor.name}>
                        {doctor.name} - {doctor.specialty}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appointment Date *
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-4">
                  Available Time Slots *
                </label>
                <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {timeSlots.map((time) => (
                    <button
                      key={time}
                      type="button"
                      onClick={() => setSelectedTime(time)}
                      className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                        selectedTime === time
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-700 hover:bg-purple-100'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit
                </label>
                <textarea
                  name="reason"
                  value={bookingForm.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="Please describe your symptoms or reason for the appointment"
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium text-lg"
              >
                Book Appointment
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Booking Confirmation Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check text-green-600 text-2xl"></i>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Appointment Booked!</h3>
              <p className="text-gray-600 mb-6">
                Your appointment has been successfully scheduled for {selectedDate} at {selectedTime}.
                You will receive a confirmation email shortly.
              </p>
              <button
                onClick={() => setShowBookingModal(false)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                  <i className="fas fa-heartbeat text-white text-xl"></i>
                </div>
                <span className="text-2xl font-bold">MediBook</span>
              </div>
              <p className="text-gray-400 mb-6">
                Your trusted platform for booking medical appointments with verified healthcare professionals.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Find Doctors</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Book Appointment</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Health Tips</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Emergency Care</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Specialties</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cardiology</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Neurology</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Dermatology</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Pediatrics</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Contact Info</h3>
              <div className="space-y-3">
                <p className="text-gray-400 flex items-center">
                  <i className="fas fa-phone mr-3"></i>
                  +1 (555) 123-4567
                </p>
                <p className="text-gray-400 flex items-center">
                  <i className="fas fa-envelope mr-3"></i>
                  info@medibook.com
                </p>
                <p className="text-gray-400 flex items-center">
                  <i className="fas fa-map-marker-alt mr-3"></i>
                  123 Health St, Medical City
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">© 2025 MediBook. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default BookingAppointment;
