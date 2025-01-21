// import React, { useEffect, useState } from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import "../Css/Dropdown.css";

// const Dropdown = () => {
//   const [isLogin, setIsLogin] = useState(false);
//   const location = useLocation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     const currentPath = location.pathname;

//     const publicPaths = ["/signin", "/otp", "/forgot"];

//     if (token && !publicPaths.includes(currentPath)) {
//       setIsLogin(true);
//     } else {
//       setIsLogin(false);
//       if (!publicPaths.includes(currentPath)) {
//         navigate("/login");
//       }
//     }
//   }, [location, navigate]);

//   const handleLogout = () => {
//     if (window.confirm("Are you sure you want to logout?")) {
//       localStorage.removeItem("token");
//       localStorage.removeItem("accessToken");
//       setIsLogin(false);
//       navigate("/login");
//     }
//   };

//   return (
//     <div className="dropdown-list">
//       <ul>
//         <li className="drop-home">
//           {isLogin ? <Link to="/">Home</Link> : <span>Home</span>}
//         </li>
//         <li className="drop-about">
//           {isLogin ? (
//             <Link to="/aboutus">About Us</Link>
//           ) : (
//             <span>About Us</span>
//           )}
//         </li>
//         <li className="drop-contact">
//           {isLogin ? <Link to="/contact">Contact</Link> : <span>Contact</span>}
//         </li>
//         <li className="log">
//           {isLogin ? (
//             <span onClick={handleLogout} style={{ cursor: "pointer" }}>
//               Log Out
//             </span>
//           ) : (
//             <Link to="/login" style={{ textDecoration: "none" }}>
//               Log In
//             </Link>
//           )}
//         </li>
//       </ul>
//     </div>
//   );
// };

// export default Dropdown;
