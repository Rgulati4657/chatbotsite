import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { authActions } from "../../store/userSlice"; 
import { loginActions } from "../../store/loginSlice";
import styles from './LoginForm.module.css';
import axios from "axios";

const LoginForm = () => {
  const dispatch = useDispatch();
  const { error, isAuthenticated } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });

  const [localError, setLocalError] = useState({
    password: "",
  });

  // Handle input change and live password validation
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Real-time password validation
    if (name === "password") {
      if (value.length < 6) {
        setLocalError((prev) => ({
          ...prev,
          password: "Password must be at least 6 characters",
        }));
      } else {
        setLocalError((prev) => ({
          ...prev,
          password: "",
        }));
      }
    }
  };

  const handleLoginSubmit = async(e) => {
    e.preventDefault();
    dispatch(loginActions.login(formData));
    // console.log(formData)

    if (Object.keys(error).length === 0) {
        try {
          // Send data to backend for registration
          const response = await axios.post("http://localhost:5000/api/auth/login", formData);
          console.log("Login Success:", response.data);
          dispatch(loginActions.login(formData)); // Ensure completion of the second step
        } catch (error) {
          console.error("Login Error:", error);
        }
      } else {
        console.log("Form has errors", error); // Optionally show the error to the user
      }
  };

  return (
    <div className={styles.form_main_div}>
      <div className={styles.container}>
        <h2>Welcome Back!</h2>
        <p className={styles.subtext}>
          Don't have an account? <a href="#" className={styles.signupLink}>Sign Up</a>
        </p>

        <form className={styles.form} onSubmit={handleLoginSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="usernameOrEmail">Username or Email</label>
            <input
              type="text"
              id="usernameOrEmail"
              name="usernameOrEmail"
              placeholder="Enter your username or email"
              value={formData.usernameOrEmail}
              onChange={handleChange}
              className={error.usernameOrEmail ? styles.errorInput : ""}
              required
            />
            {error.usernameOrEmail && <p className={styles.error}>{error.usernameOrEmail}</p>}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className={(error.password || localError.password) ? styles.errorInput : ""}
              required
            />
            {(error.password || localError.password) && (
              <p className={styles.error}>
                {localError.password || error.password}
              </p>
            )}
          </div>

          <button type="submit" className={styles.submitButton}>Login</button>

          <p className={styles.forgotPassword}>
            <a href="#">Forgot Password?</a>
          </p>

          {isAuthenticated && <p className={styles.success}>Successfully Logged In!</p>}
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
