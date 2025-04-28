import { Route, Routes } from "react-router";

import SignUpForm from "./Components/signUp_Login/signUpForm";
import LoginForm from "./Components/signUp_Login/LoginForm";
import { useEffect, useState } from "react";
import axios from "axios";
import Inbox from "./Components/Dashboard/Inbox";
import ForgotPasswordForm from "./Components/signUp_Login/forgot/ForgotPasswordForm";
import ResetPassword from "./Components/signUp_Login/forgot/ResetPassword";

function App() {
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/") // Change to your backend API endpoint
      .then((response) => { setData(response.data) 

        console.log(response)
      })
      .catch((error) => console.error("Error fetching data:", error));

    console.log("hello",data);
  }, []);
  return (
    <div className="App">
      {data}
   

     

      <Routes>
        <Route path="/signup" element={ <SignUpForm />} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path="/inbox" element={<Inbox/>} />
        <Route path="/forgotpassword" element={<ForgotPasswordForm/>} /> 
        <Route path="/resetpassword" element={<ResetPassword/>} /> 
      </Routes>
    </div>
  );
}

export default App;
