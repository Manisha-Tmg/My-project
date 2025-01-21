import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserManagement from "./Pages/UserManagement.js";
import AdminDashboard from "./Pages/AdminDashboard.js";
import ComplainManagement from "./Pages/ComplainManagement.js";
import ComplainDetails from "./Pages/ComplainDetails.js";
import UserDetails from "./Pages/UserDetails.js";

import Login from "./Pages/Login.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard />}></Route>
        <Route path="/users" element={<UserManagement />}></Route>
        <Route path="/user/:id" element={<UserDetails />} />
        <Route
          path="/complaint/:complaintId"
          element={<ComplainDetails />}
        ></Route>
        <Route path="/complaints" element={<ComplainManagement />}></Route>
        <Route path="/" element={<Login />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
