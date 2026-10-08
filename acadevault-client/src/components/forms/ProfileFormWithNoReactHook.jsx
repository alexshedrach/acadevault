import React, { useState } from "react";
import FormFieldWrapper from "./FormFieldWrapper";
import { UserIcon } from "lucide-react";

export function ProfileForm() {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const validate = () => {
    if (!email.includes("@")) {
      setEmailError("Please enter a valid email address.");
      return false;
    }
    setEmailError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // send to API…
      console.log("Submitted:", email);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <FormFieldWrapper
        label="Email Address"
        name="email"
        required
        error={emailError}
        helpText="We’ll never share your email."
        adornmentLeft={<UserIcon size={16} />}
      >
        {/* Plain <input>—FormFieldWrapper will wire up id, name, ARIA attrs, and styling */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormFieldWrapper>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save
      </button>
    </form>
  );
}

import React, { useState } from "react";
import FormFieldWrapper from "./FormFieldWrapper";

export function CountrySelector() {
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");

  return (
    <FormFieldWrapper
      label="Country"
      name="country"
      required
      error={error}
      helpText="Select your country of residence."
    >
      <select value={country} onChange={(e) => setCountry(e.target.value)}>
        <option value="" disabled>
          Choose…
        </option>
        <option value="us">United States</option>
        <option value="ng">Nigeria</option>
        <option value="gb">United Kingdom</option>
        {/* … */}
      </select>
    </FormFieldWrapper>
  );
}

import React, { useState } from "react";
import FormFieldWrapper from "./FormFieldWrapper";

export function AvatarUpload() {
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const f = e.target.files?.[0];
    if (f && f.size > 5 * 1024 * 1024) {
      setError("File must be under 5 MB.");
      setFile(null);
    } else {
      setError("");
      setFile(f);
    }
  };

  return (
    <FormFieldWrapper
      label="Upload Avatar"
      name="avatar"
      required
      error={error}
      helpText={file ? file.name : "Max size: 5 MB."}
    >
      <input type="file" accept="image/*" onChange={handleChange} />
    </FormFieldWrapper>
  );
}

// In each case:

// No RHF imports or control prop are passed.

// You manage value/onChange (and validation) yourself.

// FormFieldWrapper automatically adds the right id, name, ARIA attributes, focus‑on‑error, animated feedback, and styling around your bare <input>, <select>, or anything else you drop in.

// That’s all it takes to get a polished, accessible form UI without any external form‑library!
