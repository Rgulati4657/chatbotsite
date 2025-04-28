import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginActions } from '../../../store/loginSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; 
import styles from './ResetPassword.module.css';

const ResetPassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { emailForReset } = useSelector(state => state.login);

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [resetSuccess, setResetSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    console.log(newPassword)

    if (newPassword.length < 6) {
      dispatch(loginActions.setForgotError("Password must be at least 6 characters."));
      return;
    }
    if (newPassword !== confirmPassword) {
      dispatch(loginActions.setForgotError("Passwords do not match."));
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/otp/reset-password',
        {
          email: emailForReset,
          newPassword: String(newPassword),
        },
        {
          headers: {
            'Content-Type': 'application/json',
          }
        }
      );

      console.log("Password Reset Response:", response);

      if (response.status === 200) {
      
        dispatch(loginActions.updatePassword({ email: emailForReset, newPassword }));

        dispatch(loginActions.setForgotSuccessMessage("Password reset successfully!"));
        setResetSuccess(true);

        setTimeout(() => {
          dispatch(loginActions.clearForgotPasswordState());
          navigate('/login');  
        }, 2000);
      } else {
        dispatch(loginActions.setForgotError(response.data.message || "Something went wrong. Please try again."));
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Failed to reset password. Please try again later.";
      dispatch(loginActions.setForgotError(errorMessage));
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleResetPassword}>
        <h2 className={styles.heading}>Reset Password</h2>

        <div className={styles.formGroup}>
          <label htmlFor='reset-email'>Email</label>
          <input
            id='reset-email'
            type="email"
            name="email"
            value={emailForReset}
            disabled
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='reset-password'>New Password</label>
          <input
            type="password"
            id="reset-password"
            name="newPassword" 
            placeholder="Enter new password"
            value={newPassword}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor='reset-confirm'>Re-enter New Password</label>
          <input
            type="password"
            id="reset-confirm"
            name="confirmPassword" 
            placeholder="Re-enter new password"
            value={confirmPassword}
            onChange={handleInputChange}
            required
          />
        </div>

        <button className={styles.submitButton} type="submit">Reset Password</button>

        {resetSuccess && (
          <div className={styles.successMessage}>
            <p>Password reset successfully!</p>
            <p>
              <a href="/login">Click here to login</a>
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
