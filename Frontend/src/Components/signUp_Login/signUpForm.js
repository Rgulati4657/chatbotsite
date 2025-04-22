import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/authSlice";
import styles from "./signUpForm.module.css";
import axios from "axios";

const goalOptions = [
  "Centralize my emails",
  "Build a chatbot",
  "Integrate messaging channels",
  "Chat with my website visitors",
  "I'm just curious"
];

const SignUpForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { step1Complete, isAuthenticated, error, ...formData } = useSelector((state) => state.auth);

  const [emailPlaceholder, setEmailPlaceholder] = useState("Enter Your Email");
  const [addressPlaceholder, setAddressPlaceholder] = useState("Enter Your Address");
  const [isDomainValidated, setIsDomainValidated] = useState(false);
  const [domainValidationError, setDomainValidationError] = useState("");

  const handleSelectOption = (event) => {
    setEmailPlaceholder(`Enter Your ${event.target.value} mail`);
    setAddressPlaceholder(`Enter Your ${event.target.value} address`);
  };

  const handleChange = (e) => {
    dispatch(authActions.signupUpdate({ name: e.target.name, value: e.target.value }));
    dispatch(authActions.signupValidate({ name: e.target.value }));

    // Reset domain validation if website input is changed
    if (e.target.name === "website") {
      setIsDomainValidated(false);
      setDomainValidationError("");
    }
  };

  async function validateDomain(domain) {
    try {
      const res = await fetch("/api/domain/validate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });

      const data = await res.json();

      if (data.success) {
        setIsDomainValidated(true);
        setDomainValidationError("");
        alert("Domain is valid!");
      } else {
        setIsDomainValidated(false);
        setDomainValidationError(data.message || "Domain validation failed");
      }
    } catch (err) {
      setIsDomainValidated(false);
      setDomainValidationError("Error validating domain. Try again.");
    }
  }

  const handleStep1Submit = (e) => {
    e.preventDefault();
    dispatch(authActions.signupValidate({ formType: "user" }));
  };

  const handleStep2Submit = async (e) => {
    e.preventDefault();

    if (!isDomainValidated) {
      setDomainValidationError("Please validate your website domain before submitting.");
      return;
    }

    dispatch(authActions.signupValidate({ formType: "company" }));

    if (Object.keys(error).length === 0) {
      try {
        const response = await axios.post("http://localhost:5000/api/auth/signup", formData);
        console.log("Registration Success:", response.data);
        navigate("/login");
      } catch (error) {
        console.error("Registration Error:", error);
      }
    } else {
      console.log("Form has errors", error);
    }
  };

  return (
    <div className={styles.form_main_div}>
      <div className={styles.form_imgdiv}>
        {/* <img src={formimg} alt="form image" className={styles.formimg} /> */}
      </div>
      <div className={styles.container}>
        <h2>{step1Complete ? "Some details about your company" : "Open up your account now"}</h2>

        {!step1Complete && (
          <p className={styles.subtext}>
            Already signed up? <a href="#" className={styles.loginLink}>Login</a>
          </p>
        )}

        <form className={styles.form}>
          {!step1Complete && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="forUse">For Use</label>
                <select id="forUse" name="forUse" onChange={handleSelectOption}>
                  <option value="company">For Company</option>
                  <option value="personal">For Personal Use</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter Your First Name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={error.firstName ? styles.errorInput : ""}
                  required
                />
                {error.firstName && <p className={styles.error}>{error.firstName}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter Your Last Name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={error.lastName ? styles.errorInput : ""}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder={emailPlaceholder}
                  value={formData.email}
                  onChange={handleChange}
                  className={error.email ? styles.errorInput : ""}
                  required
                />
                {error.email && <p className={styles.error}>{error.email}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="mobileNo">Contact Number</label>
                <input
                  type="tel"
                  id="mobileNo"
                  name="mobileNo"
                  placeholder="Enter Your Contact Number"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  className={error.mobileNo ? styles.errorInput : ""}
                  required
                />
                {error.mobileNo && <p className={styles.error}>{error.mobileNo}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter Your Password"
                  value={formData.password}
                  onChange={handleChange}
                  className={error.password ? styles.errorInput : ""}
                  required
                />
                {error.password && <p className={styles.error}>{error.password}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter Your Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={error.confirmPassword ? styles.errorInput : ""}
                  required
                />
                {error.confirmPassword && <p className={styles.error}>{error.confirmPassword}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="address">Company Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  placeholder={addressPlaceholder}
                  value={formData.address}
                  onChange={handleChange}
                  className={error.address ? styles.errorInput : ""}
                  required
                />
                {error.address && <p className={styles.error}>{error.address}</p>}
              </div>

              <button type="button" onClick={handleStep1Submit} className={styles.submitButton}>
                Register
              </button>
            </>
          )}

          {step1Complete && (
            <>
              <div className={styles.formGroup}>
                <label htmlFor="companyName">Company Name</label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  placeholder="Enter Your Company Name"
                  value={formData.companyName}
                  onChange={handleChange}
                  className={error.companyName ? styles.errorInput : ""}
                  required
                />
                {error.companyName && <p className={styles.error}>{error.companyName}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="website">Website Domain</label>
                <div className={styles.inputWithButton}>
                  <input
                    type="text"
                    id="website"
                    name="website"
                    placeholder="www.acme.com"
                    value={formData.website}
                    onChange={handleChange}
                    className={error.website ? styles.errorInput : ""}
                    required
                  />
                  <button
                    type="button"
                    className={styles.validateButton}
                    onClick={() => validateDomain(formData.website)}
                  >
                    Validate
                  </button>
                </div>
                {domainValidationError && <p className={styles.error}>{domainValidationError}</p>}
                {error.website && <p className={styles.error}>{error.website}</p>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="goal">Goal</label>
                <select
                  id="goal"
                  name="goal"
                  value={formData.goal}
                  onChange={handleChange}
                  className={error.goal ? styles.errorInput : ""}
                  required
                >
                  <option value="">-- Select your goal --</option>
                  {goalOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {error.goal && <p className={styles.error}>{error.goal}</p>}
              </div>

              <button type="submit" onClick={handleStep2Submit} className={styles.submitButton}>
                Discover My Dashboard
              </button>
            </>
          )}

          {isAuthenticated && <p className={styles.success}>Successfully Signed Up!</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;