// import React, { useState } from "react";
// import styles from "./signUp1.module.css";
// import { useDispatch, useSelector } from "react-redux";
// import { authActions } from "../../store/authSlice";

// const SignUp1 = () => {
//   const dispatch = useDispatch();
//   const { firstName, lastName, email, password, confirmPassword, mobileNo, address, error, step1Complete } = useSelector((state) => state.auth);

//   const [placeholder, setPlaceholder] = useState("Enter Your Email");

//   const handleSelectOption = (event) => {
//     setPlaceholder(`Enter Your ${event.target.value} mail`);
//   };

//   const handleChange = (e) => {
//     dispatch(authActions.updateField({ name: e.target.id, value: e.target.value }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(authActions.validateForm({ formType: "user" }));
//     if (Object.keys(error).length === 0) {
//       dispatch(authActions.setStep1Complete(true));
//     }
//   };

//   return (
//     !step1Complete && (
//       <div className={styles.container}>
//         <div className={styles.heading}>
//           <h2 className={styles.heading}>Open up your account now</h2>
//           <p className={styles.subtext}>
//             Already signed up? <a href="#" className={styles.loginLink}>Login</a>
//           </p>
//         </div>

//         <div className={styles.formWrapper}>
//           <form className={styles.signUpForm} onSubmit={handleSubmit}>
//             <div className={styles.row}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="firstName">First Name</label>
//                 <input type="text" id="firstName" placeholder="Enter Your First Name" value={firstName} onChange={handleChange} required />
//                 {error.firstName && <p className={styles.error}>{error.firstName}</p>}
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="lastName">Last Name</label>
//                 <input type="text" id="lastName" placeholder="Enter Your Last Name" value={lastName} onChange={handleChange} required />
//                 {error.lastName && <p className={styles.error}>{error.lastName}</p>}
//               </div>
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="forUse">For Use</label>
//               <select id="forUse" name="forUse" onChange={handleSelectOption}>
//                 <option value="company">For Company</option>
//                 <option value="personal">For Personal Use</option>
//               </select>
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="email">Email Address</label>
//               <input type="email" id="email" placeholder={placeholder} value={email} onChange={handleChange} required />
//               {error.email && <p className={styles.error}>{error.email}</p>}
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="mobileNo">Contact Number</label>
//               <input type="tel" id="mobileNo" placeholder="Enter Your Contact Number" value={mobileNo} onChange={handleChange} required />
//               {error.mobileNo && <p className={styles.error}>{error.mobileNo}</p>}
//             </div>

//             <div className={styles.formGroup}>
//               <label htmlFor="address">Company Address</label>
//               <input type="text" id="address" placeholder="Enter Your Company Address" value={address} onChange={handleChange} required />
//               {error.address && <p className={styles.error}>{error.address}</p>}
//             </div>

//             <div className={styles.row}>
//               <div className={styles.formGroup}>
//                 <label htmlFor="password">Password</label>
//                 <input type="password" id="password" placeholder="Enter Your Password" value={password} onChange={handleChange} required />
//                 {error.password && <p className={styles.error}>{error.password}</p>}
//               </div>

//               <div className={styles.formGroup}>
//                 <label htmlFor="confirmPassword">Confirm Password</label>
//                 <input type="password" id="confirmPassword" placeholder="Re-enter Your Password" value={confirmPassword} onChange={handleChange} required />
//                 {error.confirmPassword && <p className={styles.error}>{error.confirmPassword}</p>}
//               </div>
//             </div>

//             <button type="submit" className={styles.signUpBtn}>Register</button>
//           </form>
//         </div>
//       </div>
//     )
//   );
// };

// export default SignUp1;
