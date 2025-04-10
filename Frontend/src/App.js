import { Route, Routes } from "react-router";
// import HomeFeature from "./Components/Home/Home_feature";
// import LeverageChat from './Components/Home/LeverageChat'
// import Pricing from "./Components/Pricing/Pricing";
// import Footer from "./Components/Footer/Footer";
// import SignUp1 from "./Components/signUp_Login/SignUp1";
// import SignUp2 from "./Components/signUp_Login/signUp2";
import SignUpForm from "./Components/signUp_Login/signUpForm";
import LoginForm from "./Components/signUp_Login/LoginForm";
import { useEffect, useState } from "react";
import axios from "axios";
import Inbox from "./Components/Dashboard/Inbox";

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
      {/* <Navbar/> */}
      {/* <NavBar/> */}
      {/* <HomeFeature />
      <LeverageChat/>
      <Pricing/>
      <Footer/> */}

      {/* <SignUp1/> */}
      {/* <SignUp2/> */}

     

      <Routes>
        <Route path="/signup" element={ <SignUpForm />} />
        <Route path='/login' element={<LoginForm/>} />
        <Route path="/inbox" element={<Inbox/>} />
          
          {/* <Route path="/" element={<Navbar />} /> */}
          {/* <Route path="/apps" element= */}
        
      </Routes>
    </div>
  );
}

export default App;
