"use client";
import React from "react";
import { Link } from "react-router-dom";

function SearchResult() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedSpecialty, setSelectedSpecialty] = React.useState("");
  const [selectedLocation, setSelectedLocation] = React.useState("");
  const [selectedRating, setSelectedRating] = React.useState("");
  const [sortBy, setSortBy] = React.useState("rating");
  const [showFilters, setShowFilters] = React.useState(false);
  const [viewMode, setViewMode] = React.useState("grid");

  const specialties = [
    "All Specialties",
    "Cardiology",
    "Neurology",
    "Dermatology",
    "Pediatrics",
    "Orthopedics",
    "Oncology",
    "Psychiatry",
    "Radiology",
    "Emergency Medicine",
  ];

  const locations = [
    "All Locations",
    "Downtown District",
    "Medical Plaza",
    "University Area",
    "Suburban Center",
    "Westside",
    "Eastside",
    "Northside",
    "Southside",
  ];

  const clinics = [
    {
      id: 1,
      name: "Heart & Vascular Center",
      specialty: "Cardiology",
      rating: 4.8,
      reviews: 342,
      location: "Downtown District",
      distance: "2.3 miles",
      image:
        "https://images.unsplash.com/photo-1551190822-a9333d879b1f?w=400&h=300&fit=crop",
      services: [
        "Cardiac Surgery",
        "Interventional Cardiology",
        "Heart Failure Treatment",
      ],
      doctors: 8,
      nextAvailable: "Today 2:30 PM",
      phone: "+1 (555) 123-4567",
      address: "123 Medical Plaza, Downtown District",
      description:
        "Leading cardiovascular care center with state-of-the-art facilities.",
    },
    {
      id: 2,
      name: "NeuroScience Institute",
      specialty: "Neurology",
      rating: 4.9,
      reviews: 287,
      location: "Medical Plaza",
      distance: "1.8 miles",
      image:
        "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?w=400&h=300&fit=crop",
      services: ["Brain Surgery", "Stroke Treatment", "Epilepsy Care"],
      doctors: 12,
      nextAvailable: "Tomorrow 9:00 AM",
      phone: "+1 (555) 234-5678",
      address: "456 Brain Center Dr, Medical Plaza",
      description: "Advanced neurological care with cutting-edge technology.",
    },
    {
      id: 3,
      name: "Skin Health Clinic",
      specialty: "Dermatology",
      rating: 4.7,
      reviews: 198,
      location: "University Area",
      distance: "3.1 miles",
      image:
        "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=300&fit=crop",
      services: [
        "Skin Cancer Treatment",
        "Cosmetic Dermatology",
        "Acne Treatment",
      ],
      doctors: 6,
      nextAvailable: "Today 4:15 PM",
      phone: "+1 (555) 345-6789",
      address: "789 University Blvd, University Area",
      description:
        "Comprehensive dermatological services for all skin conditions.",
    },
    {
      id: 4,
      name: "Children's Medical Center",
      specialty: "Pediatrics",
      rating: 4.6,
      reviews: 456,
      location: "Suburban Center",
      distance: "4.2 miles",
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop",
      services: ["Pediatric Surgery", "Immunizations", "Child Development"],
      doctors: 15,
      nextAvailable: "Monday 10:30 AM",
      phone: "+1 (555) 456-7890",
      address: "321 Kids Way, Suburban Center",
      description:
        "Specialized pediatric care in a child-friendly environment.",
    },
    {
      id: 5,
      name: "Orthopedic Sports Medicine",
      specialty: "Orthopedics",
      rating: 4.5,
      reviews: 234,
      location: "Westside",
      distance: "5.7 miles",
      image:
        "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
      services: ["Joint Replacement", "Sports Injuries", "Physical Therapy"],
      doctors: 10,
      nextAvailable: "Tuesday 1:00 PM",
      phone: "+1 (555) 567-8901",
      address: "654 Sports Dr, Westside",
      description:
        "Expert orthopedic care for athletes and active individuals.",
    },
    {
      id: 6,
      name: "Cancer Treatment Center",
      specialty: "Oncology",
      rating: 4.9,
      reviews: 167,
      location: "Medical Plaza",
      distance: "2.1 miles",
      image:
        "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop",
      services: ["Chemotherapy", "Radiation Therapy", "Surgical Oncology"],
      doctors: 14,
      nextAvailable: "Wednesday 11:00 AM",
      phone: "+1 (555) 678-9012",
      address: "987 Hope Ave, Medical Plaza",
      description:
        "Comprehensive cancer care with personalized treatment plans.",
    },
  ];

  const filteredClinics = React.useMemo(() => {
    let filtered = clinics.filter((clinic) => {
      const matchesSearch =
        searchQuery === "" ||
        clinic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clinic.specialty.toLowerCase().includes(searchQuery.toLowerCase()) ||
        clinic.services.some((service) =>
          service.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesSpecialty =
        selectedSpecialty === "" ||
        selectedSpecialty === "All Specialties" ||
        clinic.specialty === selectedSpecialty;

      const matchesLocation =
        selectedLocation === "" ||
        selectedLocation === "All Locations" ||
        clinic.location === selectedLocation;

      const matchesRating =
        selectedRating === "" || clinic.rating >= parseFloat(selectedRating);

      return (
        matchesSearch && matchesSpecialty && matchesLocation && matchesRating
      );
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "rating":
          return b.rating - a.rating;
        case "distance":
          return parseFloat(a.distance) - parseFloat(b.distance);
        case "reviews":
          return b.reviews - a.reviews;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    searchQuery,
    selectedSpecialty,
    selectedLocation,
    selectedRating,
    sortBy,
  ]);

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedSpecialty("");
    setSelectedLocation("");
    setSelectedRating("");
    setSortBy("rating");
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
              <a href="#" className="text-purple-600 font-medium">
                Find Doctors
              </a>
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

      {/* Search Header */}
      <section className="bg-white shadow-lg py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1">
              <div className="relative">
                <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
                <input
                  type="text"
                  placeholder="Search clinics, specialties, or services..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                >
                  <option value="rating">Rating</option>
                  <option value="distance">Distance</option>
                  <option value="reviews">Reviews</option>
                  <option value="name">Name</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <i className="fas fa-th-large"></i>
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-purple-600 text-white"
                      : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                  }`}
                >
                  <i className="fas fa-list"></i>
                </button>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                <i className="fas fa-filter mr-2"></i>
                Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-80 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-32">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  Clear All
                </button>
              </div>

              <div className="space-y-6">
                {/* Specialty Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Specialty
                  </label>
                  <select
                    value={selectedSpecialty}
                    onChange={(e) => setSelectedSpecialty(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    {specialties.map((specialty) => (
                      <option key={specialty} value={specialty}>
                        {specialty}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Location
                  </label>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                  >
                    {locations.map((location) => (
                      <option key={location} value={location}>
                        {location}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Minimum Rating
                  </label>
                  <div className="space-y-2">
                    {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={selectedRating === rating.toString()}
                          onChange={(e) => setSelectedRating(e.target.value)}
                          className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                        />
                        <span className="ml-3 flex items-center">
                          <span className="text-gray-700">{rating}+</span>
                          <div className="flex text-yellow-400 ml-2">
                            {[...Array(Math.floor(rating))].map((_, i) => (
                              <i key={i} className="fas fa-star text-xs"></i>
                            ))}
                          </div>
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Quick Filters */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Quick Filters
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="ml-3 text-gray-700">
                        Available Today
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="ml-3 text-gray-700">
                        Emergency Services
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="ml-3 text-gray-700">
                        Parking Available
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="ml-3 text-gray-700">
                        Wheelchair Accessible
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Search Results
                </h2>
                <p className="text-gray-600 mt-1">
                  Found {filteredClinics.length} clinics matching your criteria
                </p>
              </div>
            </div>

            {/* Clinic Cards */}
            <div
              className={`${
                viewMode === "grid" ? "grid md:grid-cols-2 gap-6" : "space-y-6"
              }`}
            >
              {filteredClinics.map((clinic) => (
                <div
                  key={clinic.id}
                  className={`bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  <div
                    className={`${
                      viewMode === "list" ? "w-80 flex-shrink-0" : ""
                    }`}
                  >
                    <img
                      src={clinic.image}
                      alt={clinic.name}
                      className={`w-full object-cover ${
                        viewMode === "list" ? "h-full" : "h-48"
                      }`}
                    />
                  </div>

                  <div className="p-6 flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                          {clinic.name}
                        </h3>
                        <p className="text-purple-600 font-medium mb-2">
                          {clinic.specialty}
                        </p>
                        <div className="flex items-center mb-2">
                          <div className="flex text-yellow-400 mr-2">
                            {[...Array.from({ length: 5 })].map((_, i) => (
                              <i
                                key={i}
                                className={`fas fa-star ${
                                  i < Math.floor(clinic.rating)
                                    ? ""
                                    : "text-gray-300"
                                }`}
                              ></i>
                            ))}
                          </div>
                          <span className="text-gray-700 font-medium">
                            {clinic.rating}
                          </span>
                          <span className="text-gray-500 ml-1">
                            ({clinic.reviews} reviews)
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium mb-2">
                          {clinic.distance}
                        </div>
                        <p className="text-green-600 font-medium text-sm">
                          {clinic.nextAvailable}
                        </p>
                      </div>
                    </div>

                    <div className="mb-4">
                      <div className="flex items-center text-gray-600 mb-2">
                        <i className="fas fa-map-marker-alt text-purple-600 mr-2"></i>
                        <span className="text-sm">{clinic.address}</span>
                      </div>
                      <div className="flex items-center text-gray-600 mb-2">
                        <i className="fas fa-user-md text-purple-600 mr-2"></i>
                        <span className="text-sm">
                          {clinic.doctors} doctors
                        </span>
                      </div>
                      <div className="flex items-center text-gray-600">
                        <i className="fas fa-phone text-purple-600 mr-2"></i>
                        <span className="text-sm">{clinic.phone}</span>
                      </div>
                    </div>

                    <p className="text-gray-600 text-sm mb-4">
                      {clinic.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Services:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {clinic.services.slice(0, 3).map((service, index) => (
                          <span
                            key={index}
                            className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            {service}
                          </span>
                        ))}
                        {clinic.services.length > 3 && (
                          <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-xs font-medium">
                            +{clinic.services.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link to={'/bookingappointment'}>
                      <button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-xl hover:shadow-lg transition-all duration-300 font-medium">
                        <i className="fas fa-calendar-plus mr-2"></i>
                        Book Appointment
                      </button>
                      </Link>
                      <Link to={'/doctordetail'}>
                      <button className="flex-1 bg-white border-2 border-purple-600 text-purple-600 py-3 px-4 rounded-xl hover:bg-purple-50 transition-all duration-300 font-medium">
                        <i className="fas fa-info-circle mr-2"></i>
                        View Details
                      </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredClinics.length === 0 && (
              <div className="text-center py-12">
                <div className="w-24 h-24 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <i className="fas fa-search text-purple-600 text-3xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  No clinics found
                </h3>
                <p className="text-gray-600 mb-6">
                  Try adjusting your search criteria or filters to find more
                  results.
                </p>
                <button
                  onClick={clearFilters}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Load More Button */}
            {filteredClinics.length > 0 && (
              <div className="text-center mt-12">
                <button className="bg-white border-2 border-purple-600 text-purple-600 px-8 py-3 rounded-xl hover:bg-purple-50 transition-all duration-300 font-medium">
                  Load More Results
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-16">
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
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Find Doctors
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Book Appointment
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Health Tips
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Emergency Care
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Specialties</h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Cardiology
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Neurology
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Dermatology
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Pediatrics
                  </a>
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
    </div>
  );
}

export default SearchResult;