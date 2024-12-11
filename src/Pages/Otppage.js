// import React, { useState } from "react";

// const Otppage = () => {
//   const [otp, setOtp] = useState(["", "", "", "", "", ""]);
//   const [errMsg, setErrMsg] = useState("");

//   const handleChange = (e, index) => {
//     const value = e.target.value;
//     if (!isNaN(value) && value.length <= 1) {
//       const newotp = [...otp];
//       newotp[index] = value;
//       setOtp(newotp);
//       if (value !== "" && e.target.nextSibling) {
//         e.target.nextSibling.onFocus();
//       }
//     }
//   };

//   const handlesub = (e) => {
//     e.preventDefault();
//     const enteredOtp = otp.join(""); //to join all otp
//   };
//   return (
//     <div className="otp-page">
//       <h2>Enter OTP</h2>
//       <form onSubmit={handleSubmit} className="otp-form">
//         <div className="otp-inputs">
//           {otp.map((value, index) => (
//             <input
//               type="numbers"
//               maxLength="1"
//               value={value}
//               onChange={(e) => handleChange(e.target, index)}
//               onFocus={(e) => e.target.select()}
//               className="otp-input"
//             />
//           ))}
//         </div>
//         <button type="submit" className="otp-submit">
//           Submit
//         </button>
//       </form>
//       {message && <p className="otp-message"></p>}
//     </div>
//   );
// };

// export default Otppage;
