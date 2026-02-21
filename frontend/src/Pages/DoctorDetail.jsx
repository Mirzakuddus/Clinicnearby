"use client";
import React from "react";
import { Link } from "react-router-dom";

function DoctorDetail() {
  const [selectedTab, setSelectedTab] = React.useState("overview");
  const [selectedDoctor, setSelectedDoctor] = React.useState(null);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [showBookingModal, setShowBookingModal] = React.useState(false);
  const [selectedService, setSelectedService] = React.useState(null);
  const [reviewFilter, setReviewFilter] = React.useState("all");
  const [showAllReviews, setShowAllReviews] = React.useState(false);

  const clinic = {
    id: 1,
    name: "HeartCare Medical Center",
    specialty: "Comprehensive Cardiac Care",
    rating: 4.8,
    totalReviews: 847,
    address: "123 Medical Plaza, Downtown District",
    city: "New York, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "info@heartcaremedical.com",
    website: "www.heartcaremedical.com",
    established: "1995",
    description:
      "HeartCare Medical Center is a leading cardiovascular healthcare facility dedicated to providing comprehensive cardiac care with state-of-the-art technology and compassionate service. Our team of board-certified cardiologists and cardiac surgeons work together to deliver personalized treatment plans for each patient.",
    accreditations: [
      "Joint Commission Accredited",
      "American Heart Association Certified",
      "ISO 9001:2015",
    ],
    images: [
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1631815588090-d4bfec5b1ccb?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=800&h=600&fit=crop",
    ],
  };

  const operatingHours = [
    { day: "Monday", hours: "8:00 AM - 6:00 PM", isOpen: true },
    { day: "Tuesday", hours: "8:00 AM - 6:00 PM", isOpen: true },
    { day: "Wednesday", hours: "8:00 AM - 6:00 PM", isOpen: true },
    { day: "Thursday", hours: "8:00 AM - 6:00 PM", isOpen: true },
    { day: "Friday", hours: "8:00 AM - 5:00 PM", isOpen: true },
    { day: "Saturday", hours: "9:00 AM - 2:00 PM", isOpen: true },
    { day: "Sunday", hours: "Closed", isOpen: false },
  ];

  const doctors = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Interventional Cardiologist",
      experience: "15+ years",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
      education: "Harvard Medical School",
      certifications: [
        "Board Certified Cardiologist",
        "Interventional Cardiology Fellowship",
      ],
      languages: ["English", "Spanish"],
      bio: "Dr. Johnson specializes in complex coronary interventions and structural heart disease with over 15 years of experience in interventional cardiology.",
    },
    {
      id: 2,
      name: "Dr. Michael Chen",
      specialty: "Cardiac Surgeon",
      experience: "18+ years",
      rating: 4.8,
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=300&h=300&fit=crop&crop=face",
      education: "Johns Hopkins University",
      certifications: [
        "Board Certified Cardiac Surgeon",
        "Minimally Invasive Surgery Specialist",
      ],
      languages: ["English", "Mandarin"],
      bio: "Leading cardiac surgeon specializing in minimally invasive procedures and complex cardiac surgeries with exceptional patient outcomes.",
    },
    {
      id: 3,
      name: "Dr. Emily Rodriguez",
      specialty: "Preventive Cardiologist",
      experience: "12+ years",
      rating: 4.9,
      image:
        "https://images.unsplash.com/photo-1594824475317-d3c2b8b8b8b8?w=300&h=300&fit=crop&crop=face",
      education: "Stanford University School of Medicine",
      certifications: [
        "Board Certified Cardiologist",
        "Preventive Cardiology Specialist",
      ],
      languages: ["English", "Spanish", "Portuguese"],
      bio: "Focuses on preventive cardiology and lifestyle medicine, helping patients reduce cardiovascular risk through comprehensive care.",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialty: "Electrophysiologist",
      experience: "14+ years",
      rating: 4.7,
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=300&h=300&fit=crop&crop=face",
      education: "Mayo Clinic College of Medicine",
      certifications: [
        "Board Certified Electrophysiologist",
        "Cardiac Device Specialist",
      ],
      languages: ["English"],
      bio: "Specializes in heart rhythm disorders and advanced cardiac device implantation with expertise in complex arrhythmia management.",
    },
  ];

  const services = [
    {
      id: 1,
      name: "Cardiac Catheterization",
      description:
        "Minimally invasive procedure to diagnose and treat heart conditions",
      price: "Starting at $2,500",
      duration: "1-2 hours",
      icon: "fas fa-heartbeat",
    },
    {
      id: 2,
      name: "Echocardiogram",
      description: "Non-invasive ultrasound imaging of the heart",
      price: "Starting at $350",
      duration: "30-45 minutes",
      icon: "fas fa-heart",
    },
    {
      id: 3,
      name: "Stress Testing",
      description: "Evaluate heart function during physical activity",
      price: "Starting at $450",
      duration: "45-60 minutes",
      icon: "fas fa-running",
    },
    {
      id: 4,
      name: "Holter Monitoring",
      description: "24-48 hour continuous heart rhythm monitoring",
      price: "Starting at $200",
      duration: "24-48 hours",
      icon: "fas fa-chart-line",
    },
    {
      id: 5,
      name: "Cardiac Surgery",
      description: "Advanced surgical procedures for complex heart conditions",
      price: "Consultation required",
      duration: "2-6 hours",
      icon: "fas fa-user-md",
    },
    {
      id: 6,
      name: "Preventive Cardiology",
      description: "Comprehensive risk assessment and prevention strategies",
      price: "Starting at $250",
      duration: "60 minutes",
      icon: "fas fa-shield-alt",
    },
  ];

  const reviews = [
    {
      id: 1,
      patientName: "Sarah M.",
      rating: 5,
      date: "2025-01-15",
      service: "Cardiac Catheterization",
      doctor: "Dr. Sarah Johnson",
      comment:
        "Exceptional care from start to finish. Dr. Johnson explained everything clearly and the procedure went smoothly. The staff was incredibly professional and caring.",
      helpful: 24,
      verified: true,
    },
    {
      id: 2,
      patientName: "Robert K.",
      rating: 5,
      date: "2025-01-10",
      service: "Cardiac Surgery",
      doctor: "Dr. Michael Chen",
      comment:
        "Dr. Chen performed my bypass surgery with remarkable skill. The recovery has been better than expected thanks to his expertise and the excellent nursing staff.",
      helpful: 31,
      verified: true,
    },
    {
      id: 3,
      patientName: "Maria L.",
      rating: 4,
      date: "2025-01-08",
      service: "Echocardiogram",
      doctor: "Dr. Emily Rodriguez",
      comment:
        "Very thorough examination and Dr. Rodriguez took time to explain all the results. The facility is modern and clean. Only minor wait time.",
      helpful: 18,
      verified: true,
    },
    {
      id: 4,
      patientName: "David T.",
      rating: 5,
      date: "2025-01-05",
      service: "Stress Testing",
      doctor: "Dr. James Wilson",
      comment:
        "Professional service and state-of-the-art equipment. Dr. Wilson was very knowledgeable and made me feel comfortable throughout the entire process.",
      helpful: 22,
      verified: true,
    },
    {
      id: 5,
      patientName: "Jennifer H.",
      rating: 5,
      date: "2025-01-02",
      service: "Preventive Cardiology",
      doctor: "Dr. Emily Rodriguez",
      comment:
        "Outstanding preventive care consultation. Dr. Rodriguez provided comprehensive lifestyle recommendations that have already made a difference in my health.",
      helpful: 19,
      verified: true,
    },
    {
      id: 6,
      patientName: "Michael P.",
      rating: 4,
      date: "2024-12-28",
      service: "Holter Monitoring",
      doctor: "Dr. James Wilson",
      comment:
        "Good experience overall. The monitoring device was comfortable and the results were explained clearly. Staff was helpful with setup and removal.",
      helpful: 15,
      verified: true,
    },
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % clinic.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + clinic.images.length) % clinic.images.length
    );
  };

  const filteredReviews =
    reviewFilter === "all"
      ? reviews
      : reviews.filter((review) => review.rating === parseInt(reviewFilter));

  const displayedReviews = showAllReviews
    ? filteredReviews
    : filteredReviews.slice(0, 3);

  const averageRating =
    reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;

  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => ({
    rating,
    count: reviews.filter((review) => review.rating === rating).length,
    percentage:
      (reviews.filter((review) => review.rating === rating).length /
        reviews.length) *
      100,
  }));

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
            <nav className="hidden md:flex space-x-8">
              <Link
              to="/"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                to="/searchresult"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Find Clinics
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Check Disease
              </Link>
              <Link
                href="#"
                className="text-gray-700 hover:text-purple-600 font-medium transition-colors"
              >
                Contact
              </Link>
            </nav>
<div className="flex items-center space-x-4">
  <Link
    to="/userprofile"
    className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
  >
    <i className="fas fa-user-circle text-white text-lg"></i>
    <span>Profile</span>
  </Link>
</div>

          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Clinic Header */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8 mb-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Photo Gallery */}
            <div className="lg:col-span-2">
              <div className="relative rounded-2xl overflow-hidden">
                <img
                  src={clinic.images[currentImageIndex]}
                  alt="Clinic interior"
                  className="w-full h-[400px] object-cover"
                />
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-300"
                >
                  <i className="fas fa-chevron-left text-gray-700"></i>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm rounded-full p-3 hover:bg-white transition-all duration-300"
                >
                  <i className="fas fa-chevron-right text-gray-700"></i>
                </button>
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {clinic.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-3 h-3 rounded-full transition-all duration-300 ${
                        index === currentImageIndex ? "bg-white" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-6 gap-2 mt-4">
                {clinic.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                      index === currentImageIndex
                        ? "border-purple-600"
                        : "border-transparent"
                    }`}
                  >
                    <img
                      src={image}
                      alt={`Clinic view ${index + 1}`}
                      className="w-full h-16 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Clinic Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {clinic.name}
                </h1>
                <p className="text-purple-600 font-medium text-lg mb-4">
                  {clinic.specialty}
                </p>

                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array.from({ length: 5 })].map((_, i) => (
                      <i
                        key={i}
                        className={`fas fa-star ${
                          i < Math.floor(clinic.rating) ? "" : "text-gray-300"
                        }`}
                      ></i>
                    ))}
                  </div>
                  <span className="text-gray-700 font-medium">
                    {clinic.rating}
                  </span>
                  <span className="text-gray-500 ml-2">
                    ({clinic.totalReviews} reviews)
                  </span>
                </div>

                <div className="space-y-3 text-gray-600">
                  <div className="flex items-center">
                    <i className="fas fa-map-marker-alt text-purple-600 mr-3 w-5"></i>
                    <span>{clinic.address}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-phone text-purple-600 mr-3 w-5"></i>
                    <span>{clinic.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-envelope text-purple-600 mr-3 w-5"></i>
                    <span>{clinic.email}</span>
                  </div>
                  <div className="flex items-center">
                    <i className="fas fa-calendar text-purple-600 mr-3 w-5"></i>
                    <span>Established {clinic.established}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => setShowBookingModal(true)}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium text-lg"
                >
                  <i className="fas fa-calendar-plus mr-2"></i>
                  Book Appointment
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-white border border-purple-600 text-purple-600 py-3 rounded-xl hover:bg-purple-50 transition-all duration-300 font-medium">
                    <i className="fas fa-phone mr-2"></i>
                    Call Now
                  </button>
                  <button className="bg-white border border-purple-600 text-purple-600 py-3 rounded-xl hover:bg-purple-50 transition-all duration-300 font-medium">
                    <i className="fas fa-directions mr-2"></i>
                    Directions
                  </button>
                </div>
              </div>

              {/* Operating Hours */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                <h3 className="font-bold text-gray-900 mb-3">
                  Operating Hours
                </h3>
                <div className="space-y-2">
                  {operatingHours.map((schedule) => (
                    <div
                      key={schedule.day}
                      className="flex justify-between items-center text-sm"
                    >
                      <span className="font-medium text-gray-700">
                        {schedule.day}
                      </span>
                      <span
                        className={
                          schedule.isOpen ? "text-green-600" : "text-red-500"
                        }
                      >
                        {schedule.hours}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl mb-8">
          <div className="flex overflow-x-auto">
            {[
              { id: "overview", label: "Overview", icon: "fas fa-info-circle" },
              { id: "doctors", label: "Our Doctors", icon: "fas fa-user-md" },
              { id: "services", label: "Services", icon: "fas fa-stethoscope" },
              { id: "reviews", label: "Reviews", icon: "fas fa-star" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 min-w-[150px] py-4 px-6 font-medium transition-all duration-300 ${
                  selectedTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl m-2"
                    : "text-gray-600 hover:text-purple-600"
                }`}
              >
                <i className={`${tab.icon} mr-2`}></i>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-6 md:p-8">
          {/* Overview Tab */}
          {selectedTab === "overview" && (
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  About {clinic.name}
                </h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  {clinic.description}
                </p>

                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Accreditations & Certifications
                    </h3>
                    <div className="space-y-3">
                      {clinic.accreditations.map((accreditation, index) => (
                        <div key={index} className="flex items-center">
                          <i className="fas fa-certificate text-purple-600 mr-3"></i>
                          <span className="text-gray-700">{accreditation}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4">
                      Quick Stats
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {doctors.length}
                        </div>
                        <div className="text-gray-600 text-sm">Specialists</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {services.length}
                        </div>
                        <div className="text-gray-600 text-sm">Services</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {clinic.totalReviews}
                        </div>
                        <div className="text-gray-600 text-sm">Reviews</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 text-center">
                        <div className="text-2xl font-bold text-purple-600">
                          {clinic.rating}
                        </div>
                        <div className="text-gray-600 text-sm">Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Facilities & Equipment
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      name: "Advanced Cardiac Catheterization Lab",
                      icon: "fas fa-heartbeat",
                    },
                    {
                      name: "State-of-the-art Imaging Equipment",
                      icon: "fas fa-x-ray",
                    },
                    {
                      name: "Fully Equipped Operating Theaters",
                      icon: "fas fa-procedures",
                    },
                    {
                      name: "24/7 Emergency Care Unit",
                      icon: "fas fa-ambulance",
                    },
                    { name: "Comfortable Patient Rooms", icon: "fas fa-bed" },
                    {
                      name: "Modern Rehabilitation Center",
                      icon: "fas fa-dumbbell",
                    },
                  ].map((facility, index) => (
                    <div
                      key={index}
                      className="flex items-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl"
                    >
                      <i
                        className={`${facility.icon} text-purple-600 mr-3 text-xl`}
                      ></i>
                      <span className="text-gray-700 font-medium">
                        {facility.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Doctors Tab */}
          {selectedTab === "doctors" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Our Medical Team
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {doctors.map((doctor) => (
                  <div
                    key={doctor.id}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedDoctor(doctor)}
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={doctor.image}
                        alt={doctor.name}
                        className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900">
                          {doctor.name}
                        </h3>
                        <p className="text-purple-600 font-medium">
                          {doctor.specialty}
                        </p>
                        <div className="flex items-center mt-1">
                          <div className="flex text-yellow-400 mr-2">
                            {[...Array.from({ length: 5 })].map((_, i) => (
                              <i
                                key={i}
                                className={`fas fa-star ${
                                  i < Math.floor(doctor.rating)
                                    ? ""
                                    : "text-gray-300"
                                }`}
                              ></i>
                            ))}
                          </div>
                          <span className="text-gray-600 text-sm">
                            {doctor.rating} • {doctor.experience}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4">{doctor.bio}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center">
                        <i className="fas fa-graduation-cap text-purple-600 mr-2 w-4"></i>
                        <span className="text-gray-700">
                          {doctor.education}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <i className="fas fa-language text-purple-600 mr-2 w-4"></i>
                        <span className="text-gray-700">
                          {doctor.languages.join(", ")}
                        </span>
                      </div>
                    </div>

                    <div className="flex space-x-3 mt-4">
                      
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedDoctor(doctor);
                          setShowBookingModal(true);
                        }}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                      >
                        Book Appointment
                      </button>
                      <button className="px-4 py-2 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-all duration-300">
                        View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Services Tab */}
          {selectedTab === "services" && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Our Services
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                    onClick={() => setSelectedService(service)}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center mr-4">
                        <i className={`${service.icon} text-white text-xl`}></i>
                      </div>
                      <h3 className="text-lg font-bold text-gray-900">
                        {service.name}
                      </h3>
                    </div>

                    <p className="text-gray-600 mb-4">{service.description}</p>

                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Duration:</span>
                        <span className="text-gray-700 font-medium">
                          {service.duration}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Price:</span>
                        <span className="text-purple-600 font-bold">
                          {service.price}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedService(service);
                        setShowBookingModal(true);
                      }}
                      className="w-full mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
                    >
                      Book This Service
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {selectedTab === "reviews" && (
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">
                  Patient Reviews
                </h2>
                <select
                  value={reviewFilter}
                  onChange={(e) => setReviewFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="all">All Reviews</option>
                  <option value="5">5 Stars</option>
                  <option value="4">4 Stars</option>
                  <option value="3">3 Stars</option>
                  <option value="2">2 Stars</option>
                  <option value="1">1 Star</option>
                </select>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="md:col-span-1">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6">
                    <div className="text-center mb-6">
                      <div className="text-4xl font-bold text-purple-600 mb-2">
                        {averageRating.toFixed(1)}
                      </div>
                      <div className="flex justify-center text-yellow-400 mb-2">
                        {[...Array.from({ length: 5 })].map((_, i) => (
                          <i
                            key={i}
                            className={`fas fa-star ${
                              i < Math.floor(averageRating)
                                ? ""
                                : "text-gray-300"
                            }`}
                          ></i>
                        ))}
                      </div>
                      <div className="text-gray-600">
                        Based on {reviews.length} reviews
                      </div>
                    </div>

                    <div className="space-y-2">
                      {ratingDistribution.map((item) => (
                        <div key={item.rating} className="flex items-center">
                          <span className="text-sm text-gray-600 w-8">
                            {item.rating}★
                          </span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2 mx-2">
                            <div
                              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${item.percentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm text-gray-600 w-8">
                            {item.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-6">
                  {displayedReviews.map((review) => (
                    <div
                      key={review.id}
                      className="bg-white border border-gray-200 rounded-2xl p-6"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">
                              {review.patientName.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <div className="flex items-center space-x-2">
                              <h4 className="font-bold text-gray-900">
                                {review.patientName}
                              </h4>
                              {review.verified && (
                                <i
                                  className="fas fa-check-circle text-green-500 text-sm"
                                  title="Verified Patient"
                                ></i>
                              )}
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-600">
                              <span>
                                {new Date(review.date).toLocaleDateString()}
                              </span>
                              <span>•</span>
                              <span>{review.service}</span>
                              <span>•</span>
                              <span>{review.doctor}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex text-yellow-400">
                          {[...Array.from({ length: 5 })].map((_, i) => (
                            <i
                              key={i}
                              className={`fas fa-star ${
                                i < review.rating ? "" : "text-gray-300"
                              }`}
                            ></i>
                          ))}
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{review.comment}</p>

                      <div className="flex items-center justify-between text-sm">
                        <button className="flex items-center text-gray-500 hover:text-purple-600 transition-colors">
                          <i className="fas fa-thumbs-up mr-1"></i>
                          Helpful ({review.helpful})
                        </button>
                        <button className="text-gray-500 hover:text-purple-600 transition-colors">
                          <i className="fas fa-flag mr-1"></i>
                          Report
                        </button>
                      </div>
                    </div>
                  ))}

                  {!showAllReviews && filteredReviews.length > 3 && (
                    <button
                      onClick={() => setShowAllReviews(true)}
                      className="w-full py-3 border border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 transition-all duration-300 font-medium"
                    >
                      Show All Reviews ({filteredReviews.length})
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">
                Book Appointment
              </h3>
              <button
                onClick={() => setShowBookingModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <i className="fas fa-times text-xl"></i>
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4">
                <h4 className="font-bold text-gray-900 mb-2">{clinic.name}</h4>
                {selectedDoctor && (
                  <p className="text-purple-600 font-medium">
                    Dr. {selectedDoctor.name} - {selectedDoctor.specialty}
                  </p>
                )}
                {selectedService && (
                  <p className="text-purple-600 font-medium">
                    {selectedService.name}
                  </p>
                )}
              </div>

              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Ready to book your appointment?
                </p>
                <Link
                  href="/book-appointment"
                  className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  Continue to Booking
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="relative bg-gray-900 text-white py-16 mt-16">
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
                Your trusted platform for booking medical appointments with
                verified healthcare professionals.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Find Doctors
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Book Appointment
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Health Tips
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Emergency Care
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Specialties</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cardiology
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Neurology
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Dermatology
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pediatrics
                  </Link>
                </li>
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
            <p className="text-gray-400">
              © 2025 MediBook. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

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
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slideIn 0.5s ease-out;
        }
        
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}

export default DoctorDetail;