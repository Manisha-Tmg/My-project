import Navbar from "./Components/Navbar";
import Aboutus from "./Pages/Aboutus";
import Complain from "./Pages/Complain";
import Contact from "./Pages/Contact";
import Form from "./Pages/Form";
import Login from "./Pages/Login";
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
        <Route path="/profile" element={<Profile />} />
        <Route path="/forgot" element={<Passwordreset />} />
        {/* <Route path="/complain" element={<Home />} /> */}
      </Routes>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
