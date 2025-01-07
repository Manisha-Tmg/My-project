import Navbar from "./Components/Navbar";
import Province from "./Components/Province";
import Aboutus from "./Pages/Aboutus";
import Changepassword from "./Pages/Changepassword";
import Complain from "./Pages/Complain";
import Contact from "./Pages/Contact";
import Form from "./Pages/Form";
import Login from "./Pages/Login";
import Mycomplain from "./Pages/Mycomplain";
import Otppage from "./Pages/Otppage";
import Passwordreset from "./Pages/Passwordreset";
import Profile from "./Pages/Profile";
import Signin from "./Pages/Signin";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/complain" element={<Complain />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/form" element={<Form />} />
        <Route path="/my-complain" element={<Mycomplain />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot-password" element={<Passwordreset />} />
        <Route path="/province" element={<Province />} />
        <Route path="/verify-user" element={<Otppage />} />
        <Route path="/reset-password" element={<Changepassword />} />
      </Routes>
    </Router>
  );
}

export default App;
