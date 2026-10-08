"use client";

import VendorRegisgrationForm from "@/components/forms/VendorRegisgrationForm";
import React, { useState } from "react";

export const ClientVendorRegister = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    expertise: [],
    experience: "",
    credentials: null,
    bio: "",
  });
  const [step, setStep] = useState(1);

  const expertiseOptions = [
    "Academic Writing",
    "Editing/Proofreading",
    "Research Assistance",
    "Citation/Referencing",
    "Tutoring",
    "Other",
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleExpertiseChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      expertise: checked
        ? [...prev.expertise, value]
        : prev.expertise.filter((item) => item !== value),
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, credentials: e.target.files[0] }));
  };

  const handleNextStep = () => {
    if (
      step === 1 &&
      (!formData.fullName || !formData.email || !formData.phone)
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    if (step === 2 && formData.expertise.length === 0) {
      alert("Please select at least one area of expertise.");
      return;
    }
    setStep((prev) => prev + 1);
  };

  const handleSubmit = () => {
    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      formData.expertise.length === 0 ||
      !formData.experience
    ) {
      alert("Please complete all required fields.");
      return;
    }
    // TODO: Submit to backend (e.g., POST /api/vendors/register)
    console.log("Submitting:", formData);
  };
  return (
    <VendorRegisgrationForm
      formData={formData}
      handleInputChange={handleInputChange}
      handleExpertiseChange={handleExpertiseChange}
      handleFileChange={handleFileChange}
      handleNextStep={handleNextStep}
      handleSubmit={handleSubmit}
      step={step}
      setStep={setStep}
      expertiseOptions={expertiseOptions}
    />
  );
};
