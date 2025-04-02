// import React from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { authActions } from "../../store/authSlice";
// import styles from './signUp2.module.css';

// const SignUp2 = () => {
//   const dispatch = useDispatch();
//   const { companyName, website, goal, error, isAuthenticated, step1Complete } = useSelector((state) => state.auth);

//   const handleChange = (e) => {
//     dispatch(authActions.updateField({ name: e.target.name, value: e.target.value }));
//   };

//   const handleGoalSelection = (goalOption) => {
//     dispatch(authActions.updateField({ name: "goal", value: goalOption }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(authActions.validateForm({ formType: "company" }));
//   };

//   return (
//     step1Complete && (
//       <div className={styles.container}>
//         <h2>Some details about your company</h2>
//         <p>Fill in your company information to continue.</p>

//         <form onSubmit={handleSubmit} className={styles.form}  action='/api/auth/signup'>  
//           <div className={styles.formGroup}>
//             <label htmlFor="companyName">What is the name of your company? *</label>
//             <input
//               type="text"
//               id="companyName"
//               name="companyName"
//               placeholder="Company name"
//               value={companyName}
//               onChange={handleChange}
//               className={error.companyName ? styles.errorInput : ""}
//             />
//             {error.companyName && <p className={styles.error}>{error.companyName}</p>}
//           </div>

//           <div className={styles.formGroup}>
//             <label htmlFor="website">What is your website domain? *</label>
//             <input
//               type="text"
//               id="website"
//               name="website"
//               placeholder="www.acme.com"
//               value={website}
//               onChange={handleChange}
//               className={error.website ? styles.errorInput : ""}
//             />
//             {error.website && <p className={styles.error}>{error.website}</p>}
//           </div>

//           <div className={styles.formGroup}>
//             <label>Which is your main goal with Crisp?</label>
//             <div className={styles.options}>
//               {["Centralize my emails", "Build a chatbot", "Integrate messaging channels", "Chat with my website visitors", "I'm just curious"].map(
//                 (goalOption, index) => (
//                   <button
//                     type="button"
//                     key={index}
//                     className={`${styles.goalButton} ${goal === goalOption ? styles.selected : ""}`}
//                     onClick={() => handleGoalSelection(goalOption)}
//                   >
//                     {goalOption}
//                   </button>
//                 )
//               )}
//             </div>
//           </div>

//           <button type="submit" className={styles.submitButton}>Discover My Dashboard</button>

//           {isAuthenticated && <p className={styles.success}>✅ Successfully Signed Up!</p>}
//         </form>
//       </div>
//     )
//   );
// };

// export default SignUp2;
