import React from "react";
import { Link } from "react-router-dom";

function ClinicVerify() {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formData, setFormData] = React.useState({
    // Clinic Details
    clinicName: "",
    clinicType: "",
    specialty: "",
    description: "",
    establishedYear: "",
    licenseNumber: "",
    
    // Contact Information
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    phone: "",
    email: "",
    website: "",
    
    // Operating Hours
    operatingHours: {
      monday: { open: "09:00", close: "17:00", closed: false },
      tuesday: { open: "09:00", close: "17:00", closed: false },
      wednesday: { open: "09:00", close: "17:00", closed: false },
      thursday: { open: "09:00", close: "17:00", closed: false },
      friday: { open: "09:00", close: "17:00", closed: false },
      saturday: { open: "09:00", close: "14:00", closed: false },
      sunday: { open: "09:00", close: "17:00", closed: true }
    },
    
    // Services
    services: [],
    customServices: "",
    
    // Doctors
    doctors: [],
    
    // Documents
    documents: {
      license: null,
      insurance: null,
      accreditation: null
    }
  });

  const [errors, setErrors] = React.useState({});
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  // const [upload, { loading: uploadLoading }] = useUpload();

// upload({ data: "your text or object here" });
  const totalSteps = 6;

  const clinicTypes = [
    "General Practice",
    "Specialty Clinic",
    "Urgent Care",
    "Diagnostic Center",
    "Surgical Center",
    "Rehabilitation Center",
    "Mental Health Clinic",
    "Dental Clinic",
    "Eye Care Center",
    "Other"
  ];

  const specialties = [
    "Cardiology",
    "Dermatology",
    "Endocrinology",
    "Gastroenterology",
    "Neurology",
    "Oncology",
    "Orthopedics",
    "Pediatrics",
    "Psychiatry",
    "Radiology",
    "Surgery",
    "Urology",
    "Other"
  ];

  const availableServices = [
    "Consultation",
    "Diagnostic Testing",
    "Laboratory Services",
    "Imaging Services",
    "Minor Surgery",
    "Emergency Care",
    "Preventive Care",
    "Rehabilitation",
    "Vaccination",
    "Health Screening",
    "Telemedicine",
    "Home Visits"
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleNestedInputChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  const handleHoursChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value
        }
      }
    }));
  };

  const handleServiceToggle = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const addDoctor = () => {
    setFormData(prev => ({
      ...prev,
      doctors: [...prev.doctors, {
        id: Date.now(),
        name: "",
        specialty: "",
        experience: "",
        education: "",
        licenseNumber: "",
        email: "",
        phone: ""
      }]
    }));
  };

  const updateDoctor = (id, field, value) => {
    setFormData(prev => ({
      ...prev,
      doctors: prev.doctors.map(doctor =>
        doctor.id === id ? { ...doctor, [field]: value } : doctor
      )
    }));
  };

  const removeDoctor = (id) => {
    setFormData(prev => ({
      ...prev,
      doctors: prev.doctors.filter(doctor => doctor.id !== id)
    }));
  };

  const handleFileUpload = async (documentType, file) => {
    try {
      const { url, error } = await upload({ file });
      if (error) {
        setErrors(prev => ({
          ...prev,
          [documentType]: error
        }));
        return;
      }
      
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [documentType]: url
        }
      }));
    } catch (error) {
      console.error("Upload error:", error);
      setErrors(prev => ({
        ...prev,
        [documentType]: "Failed to upload file"
      }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.clinicName) newErrors.clinicName = "Clinic name is required";
        if (!formData.clinicType) newErrors.clinicType = "Clinic type is required";
        if (!formData.specialty) newErrors.specialty = "Specialty is required";
        if (!formData.description) newErrors.description = "Description is required";
        if (!formData.establishedYear) newErrors.establishedYear = "Established year is required";
        if (!formData.licenseNumber) newErrors.licenseNumber = "License number is required";
        break;
      
      case 2:
        if (!formData.address) newErrors.address = "Address is required";
        if (!formData.city) newErrors.city = "City is required";
        if (!formData.state) newErrors.state = "State is required";
        if (!formData.zipCode) newErrors.zipCode = "ZIP code is required";
        if (!formData.country) newErrors.country = "Country is required";
        if (!formData.phone) newErrors.phone = "Phone is required";
        if (!formData.email) newErrors.email = "Email is required";
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid";
        break;
      
      case 4:
        if (formData.services.length === 0) newErrors.services = "At least one service must be selected";
        break;
      
      case 5:
        if (formData.doctors.length === 0) newErrors.doctors = "At least one doctor must be added";
        formData.doctors.forEach((doctor, index) => {
          if (!doctor.name) newErrors[`doctor_${index}_name`] = "Doctor name is required";
          if (!doctor.specialty) newErrors[`doctor_${index}_specialty`] = "Doctor specialty is required";
          if (!doctor.licenseNumber) newErrors[`doctor_${index}_licenseNumber`] = "License number is required";
        });
        break;
      
      case 6:
        if (!formData.documents.license) newErrors.license = "Medical license is required";
        if (!formData.documents.insurance) newErrors.insurance = "Insurance certificate is required";
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;
    
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Clinic registration submitted:", formData);
      alert("Clinic registration submitted successfully! We will review your application and contact you within 2-3 business days.");
    } catch (error) {
      console.error("Submission error:", error);
      alert("There was an error submitting your registration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Clinic Information</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clinic Name *
                </label>
                <input
                  type="text"
                  name="clinicName"
                  value={formData.clinicName}
                  onChange={(e) => handleInputChange("clinicName", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                    errors.clinicName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter clinic name"
                />
                {errors.clinicName && (
                  <p className="text-red-500 text-sm mt-1">{errors.clinicName}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Clinic Type *
                </label>
                <select
                  name="clinicType"
                  value={formData.clinicType}
                  onChange={(e) => handleInputChange("clinicType", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                    errors.clinicType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select clinic type</option>
                  {clinicTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
                {errors.clinicType && (
                  <p className="text-red-500 text-sm mt-1">{errors.clinicType}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Specialty *
                </label>
                <select
                  name="specialty"
                  value={formData.specialty}
                  onChange={(e) => handleInputChange("specialty", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                    errors.specialty ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Select specialty</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
                {errors.specialty && (
                  <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Established Year *
                </label>
                <input
                  type="number"
                  name="establishedYear"
                  value={formData.establishedYear}
                  onChange={(e) => handleInputChange("establishedYear", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                    errors.establishedYear ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="2020"
                  min="1900"
                  max={new Date().getFullYear()}
                />
                {errors.establishedYear && (
                  <p className="text-red-500 text-sm mt-1">{errors.establishedYear}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical License Number *
              </label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                  errors.licenseNumber ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter medical license number"
              />
              {errors.licenseNumber && (
                <p className="text-red-500 text-sm mt-1">{errors.licenseNumber}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Clinic Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                rows="4"
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Describe your clinic, services, and what makes you unique..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description}</p>
              )}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h3>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Street Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={(e) => handleInputChange("address", e.target.value)}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                  errors.address ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="123 Medical Plaza"
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={(e) => handleInputChange("city", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="New York"
                />
                {errors.city && (
                  <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  State *
                </label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={(e) => handleInputChange("state", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="NY"
                />
                {errors.state && (
                  <p className="text-red-500 text-sm mt-1">{errors.state}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={(e) => handleInputChange("zipCode", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                    errors.zipCode ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="10001"
                />
                {errors.zipCode && (
                  <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Country *
                </label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="United States"
                />
                {errors.country && (
                  <p className="text-red-500 text-sm mt-1">{errors.country}</p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+1 (555) 123-4567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="info@clinic.com"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Website (Optional)
              </label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={(e) => handleInputChange("website", e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                placeholder="https://www.clinic.com"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Operating Hours</h3>
            
            <div className="space-y-4">
              {Object.entries(formData.operatingHours).map(([day, hours]) => (
                <div key={day} className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-900 capitalize">{day}</h4>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={hours.closed}
                        onChange={(e) => handleHoursChange(day, "closed", e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">Closed</span>
                    </label>
                  </div>
                  
                  {!hours.closed && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Opening Time
                        </label>
                        <input
                          type="time"
                          value={hours.open}
                          onChange={(e) => handleHoursChange(day, "open", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Closing Time
                        </label>
                        <input
                          type="time"
                          value={hours.close}
                          onChange={(e) => handleHoursChange(day, "close", e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Services Offered</h3>
            
            <div>
              <p className="text-gray-600 mb-4">Select all services that your clinic offers:</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableServices.map(service => (
                  <label key={service} className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-purple-50 transition-colors cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.services.includes(service)}
                      onChange={() => handleServiceToggle(service)}
                      className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                    />
                    <span className="ml-3 text-gray-700">{service}</span>
                  </label>
                ))}
              </div>
              {errors.services && (
                <p className="text-red-500 text-sm mt-2">{errors.services}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Services (Optional)
              </label>
              <textarea
                name="customServices"
                value={formData.customServices}
                onChange={(e) => handleInputChange("customServices", e.target.value)}
                rows="3"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                placeholder="List any additional services not mentioned above..."
              />
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-2xl font-bold text-gray-900">Medical Staff</h3>
              <button
                type="button"
                onClick={addDoctor}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all duration-300 font-medium"
              >
                <i className="fas fa-plus mr-2"></i>Add Doctor
              </button>
            </div>

            {formData.doctors.length === 0 ? (
              <div className="text-center py-8">
                <i className="fas fa-user-md text-gray-400 text-4xl mb-4"></i>
                <p className="text-gray-500">No doctors added yet. Click "Add Doctor" to get started.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {formData.doctors.map((doctor, index) => (
                  <div key={doctor.id} className="bg-gray-50 rounded-xl p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-900">Doctor {index + 1}</h4>
                      <button
                        type="button"
                        onClick={() => removeDoctor(doctor.id)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={doctor.name}
                          onChange={(e) => updateDoctor(doctor.id, "name", e.target.value)}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                            errors[`doctor_${index}_name`] ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Dr. John Smith"
                        />
                        {errors[`doctor_${index}_name`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`doctor_${index}_name`]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Specialty *
                        </label>
                        <select
                          value={doctor.specialty}
                          onChange={(e) => updateDoctor(doctor.id, "specialty", e.target.value)}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                            errors[`doctor_${index}_specialty`] ? "border-red-500" : "border-gray-300"
                          }`}
                        >
                          <option value="">Select specialty</option>
                          {specialties.map(specialty => (
                            <option key={specialty} value={specialty}>{specialty}</option>
                          ))}
                        </select>
                        {errors[`doctor_${index}_specialty`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`doctor_${index}_specialty`]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Years of Experience
                        </label>
                        <input
                          type="number"
                          value={doctor.experience}
                          onChange={(e) => updateDoctor(doctor.id, "experience", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                          placeholder="10"
                          min="0"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Medical License Number *
                        </label>
                        <input
                          type="text"
                          value={doctor.licenseNumber}
                          onChange={(e) => updateDoctor(doctor.id, "licenseNumber", e.target.value)}
                          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all ${
                            errors[`doctor_${index}_licenseNumber`] ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="License number"
                        />
                        {errors[`doctor_${index}_licenseNumber`] && (
                          <p className="text-red-500 text-sm mt-1">{errors[`doctor_${index}_licenseNumber`]}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={doctor.email}
                          onChange={(e) => updateDoctor(doctor.id, "email", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                          placeholder="doctor@clinic.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={doctor.phone}
                          onChange={(e) => updateDoctor(doctor.id, "phone", e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Education & Qualifications
                      </label>
                      <textarea
                        value={doctor.education}
                        onChange={(e) => updateDoctor(doctor.id, "education", e.target.value)}
                        rows="2"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all resize-none"
                        placeholder="MD from Harvard Medical School, Board Certified in Cardiology..."
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            {errors.doctors && (
              <p className="text-red-500 text-sm">{errors.doctors}</p>
            )}
          </div>
        );

      case 6:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Verification Documents</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Medical License Certificate *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                  {formData.documents.license ? (
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <i className="fas fa-check-circle"></i>
                      <span>License uploaded successfully</span>
                    </div>
                  ) : (
                    <div>
                      <i className="fas fa-cloud-upload-alt text-gray-400 text-3xl mb-2"></i>
                      <p className="text-gray-600 mb-2">Upload your medical license certificate</p>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            handleFileUpload("license", e.target.files[0]);
                          }
                        }}
                        className="hidden"
                        id="license-upload"
                      />
                      <label
                        htmlFor="license-upload"
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer inline-block"
                      >
                        Choose File
                      </label>
                    </div>
                  )}
                </div>
                {errors.license && (
                  <p className="text-red-500 text-sm mt-1">{errors.license}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Certificate *
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                  {formData.documents.insurance ? (
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <i className="fas fa-check-circle"></i>
                      <span>Insurance certificate uploaded successfully</span>
                    </div>
                  ) : (
                    <div>
                      <i className="fas fa-cloud-upload-alt text-gray-400 text-3xl mb-2"></i>
                      <p className="text-gray-600 mb-2">Upload your malpractice insurance certificate</p>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            handleFileUpload("insurance", e.target.files[0]);
                          }
                        }}
                        className="hidden"
                        id="insurance-upload"
                      />
                      <label
                        htmlFor="insurance-upload"
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer inline-block"
                      >
                        Choose File
                      </label>
                    </div>
                  )}
                </div>
                {errors.insurance && (
                  <p className="text-red-500 text-sm mt-1">{errors.insurance}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Accreditation Certificate (Optional)
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-purple-400 transition-colors">
                  {formData.documents.accreditation ? (
                    <div className="flex items-center justify-center space-x-2 text-green-600">
                      <i className="fas fa-check-circle"></i>
                      <span>Accreditation certificate uploaded successfully</span>
                    </div>
                  ) : (
                    <div>
                      <i className="fas fa-cloud-upload-alt text-gray-400 text-3xl mb-2"></i>
                      <p className="text-gray-600 mb-2">Upload any relevant accreditation certificates</p>
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          if (e.target.files[0]) {
                            handleFileUpload("accreditation", e.target.files[0]);
                          }
                        }}
                        className="hidden"
                        id="accreditation-upload"
                      />
                      <label
                        htmlFor="accreditation-upload"
                        className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors cursor-pointer inline-block"
                      >
                        Choose File
                      </label>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Review Process</h4>
              <p className="text-gray-600 text-sm">
                After submitting your registration, our team will review your application and documents. 
                This process typically takes 2-3 business days. We will contact you via email with the 
                status of your application and any additional requirements.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1920&h=1080&fit=crop"
          alt="Medical background"
          className="w-full h-full object-cover opacity-10"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-orange-900/20"></div>
      </div>

      {/* Header */}
      <header className="relative bg-white/80 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <i className="fas fa-heartbeat text-white text-xl"></i>
              </div>
            
            </div>
          
            
            <div className="flex items-center space-x-4">
              <a
                href="/auth"
                className="text-purple-600 hover:text-purple-700 font-medium"
              >
                Login
              </a>
              <a
                href="/auth"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Register Your Clinic
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Join MediBook and connect with patients looking for quality healthcare
            </p>

            {/* Progress Bar */}
            <div className="bg-white rounded-2xl shadow-xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                {[...Array(totalSteps)].map((_, index) => {
                  const stepNumber = index + 1;
                  const isActive = stepNumber === currentStep;
                  const isCompleted = stepNumber < currentStep;
                  
                  return (
                    <div key={stepNumber} className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                          isCompleted
                            ? "bg-green-500 text-white"
                            : isActive
                            ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                            : "bg-gray-200 text-gray-500"
                        }`}
                      >
                        {isCompleted ? (
                          <i className="fas fa-check"></i>
                        ) : (
                          stepNumber
                        )}
                      </div>
                      {stepNumber < totalSteps && (
                        <div
                          className={`w-12 md:w-20 h-1 mx-2 transition-all ${
                            stepNumber < currentStep ? "bg-green-500" : "bg-gray-200"
                          }`}
                        ></div>
                      )}
                    </div>
                  );
                })}
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-6 gap-2 text-xs md:text-sm text-gray-600">
                <span className={currentStep === 1 ? "font-semibold text-purple-600" : ""}>
                  Clinic Info
                </span>
                <span className={currentStep === 2 ? "font-semibold text-purple-600" : ""}>
                  Contact
                </span>
                <span className={currentStep === 3 ? "font-semibold text-purple-600" : ""}>
                  Hours
                </span>
                <span className={currentStep === 4 ? "font-semibold text-purple-600" : ""}>
                  Services
                </span>
                <span className={currentStep === 5 ? "font-semibold text-purple-600" : ""}>
                  Staff
                </span>
                <span className={currentStep === 6 ? "font-semibold text-purple-600" : ""}>
                  Documents
                </span>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-12">
            {renderStepContent()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-12">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-8 py-3 rounded-xl font-medium transition-all duration-300 ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Previous
              </button>

              {currentStep === totalSteps ? (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Submitting...
                    </div>
                  ) : (
                    <>
                      Submit Registration
                      <i className="fas fa-check ml-2"></i>
                    </>
                  )}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105 font-medium"
                >
                  Next
                  <i className="fas fa-arrow-right ml-2"></i>
                </button>
              )}
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 text-center">
            <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Need Help?
              </h3>
              <p className="text-gray-600 mb-4">
                Our support team is here to assist you with the registration process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:support@medibook.com"
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
                >
                  <i className="fas fa-envelope mr-2"></i>
                  support@medibook.com
                </a>
                <a
                  href="tel:+15551234567"
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
                >
                  <i className="fas fa-phone mr-2"></i>
                  +1 (555) 123-4567
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative bg-gray-900 text-white py-16">
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
              <h3 className="text-lg font-semibold mb-6">For Providers</h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/userlogin"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Register Clinic
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Provider Portal
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Resources
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Support
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


export default ClinicVerify;