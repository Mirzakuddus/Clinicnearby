"use client";
import React, { useState } from "react";

function Doctorssignup() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience, setExperience] = useState("");
  const [clinicAddress, setClinicAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleNext = () => setStep(2);
  const handleBack = () => setStep(1);

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
      <form
        noValidate
        className="w-full max-w-lg rounded-2xl bg-white p-8 shadow-xl"
      >
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800">
            Doctor Registration
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Step {step} of 2: {step === 1 ? "Create your account" : "Complete your professional profile"}
          </p>
        </div>

        <div className="space-y-6">
          {step === 1 ? (
            <>
              <InputField label="Email *" type="email" value={email} onChange={setEmail} placeholder="Enter your email" />
              <InputField label="Password *" type="password" value={password} onChange={setPassword} placeholder="Enter your password" />
              <InputField label="Confirm Password *" type="password" value={confirmPassword} onChange={setConfirmPassword} placeholder="Confirm your password" />
            </>
          ) : (
            <>
              <InputField label="Full Name *" value={name} onChange={setName} placeholder="Enter your full name" />
              <InputField label="Specialization *" value={specialization} onChange={setSpecialization} placeholder="e.g., Cardiology, Pediatrics" />
              <InputField label="Years of Experience *" type="number" value={experience} onChange={setExperience} placeholder="Enter years of experience" />
              <TextareaField label="Clinic Address *" value={clinicAddress} onChange={setClinicAddress} placeholder="Enter your clinic address" />
              <InputField label="Phone Number" value={phone} onChange={setPhone} placeholder="Enter your phone number" />
              <TextareaField label="Bio" value={bio} onChange={setBio} placeholder="Tell us about yourself and your practice" />
            </>
          )}

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-500">
              {error}
            </div>
          )}

          <div className={`flex ${step === 2 ? "space-x-4" : ""}`}>
            {step === 2 && (
              <button
                type="button"
                onClick={handleBack}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-3 text-base font-medium text-gray-700 transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-[#357AFF] focus:ring-offset-2"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={step === 1 ? handleNext : () => {}}
              className={`flex-1 rounded-lg bg-[#357AFF] px-4 py-3 text-base font-medium text-white transition-colors hover:bg-[#2E69DE] focus:outline-none focus:ring-2 focus:ring-[#357AFF] focus:ring-offset-2`}
            >
              {step === 1
                ? loading ? "Creating Account..." : "Continue"
                : loading ? "Creating Profile..." : "Complete Registration"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

const InputField = ({ label, type = "text", value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white px-4 py-3 focus-within:border-[#357AFF] focus-within:ring-1 focus-within:ring-[#357AFF]">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-lg outline-none"
      />
    </div>
  </div>
);

const TextareaField = ({ label, value, onChange, placeholder }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">{label}</label>
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white px-4 py-3 focus-within:border-[#357AFF] focus-within:ring-1 focus-within:ring-[#357AFF]">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows="4"
        className="w-full bg-transparent text-lg outline-none resize-none"
      />
    </div>
  </div>
);

export default Doctorssignup;
