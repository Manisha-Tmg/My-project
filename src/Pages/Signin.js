import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../Css/Signin.css";
import { APIURL } from "../env";

const Signin = () => {
  const provinces = {
    1: {
      name: "Province1",
      districts: [
        { id: 1, name: "Bhojpur" },
        { id: 2, name: "Dhankuta" },
        { id: 3, name: "Ilam" },
        { id: 4, name: "Jhapa" },
        { id: 5, name: "Khotang" },
        { id: 6, name: "Morang" },
        { id: 7, name: "Okhaldhunga" },
        { id: 8, name: "Panchthar" },
        { id: 9, name: "Sankhuwasabha" },
        { id: 10, name: "Solukhumbu" },
        { id: 11, name: "Sunsari" },
        { id: 12, name: "Taplejung" },
        { id: 13, name: "Terhathum" },
        { id: 14, name: "Udayapur" },
      ],
    },
    2: {
      name: "Province2",
      districts: [
        { id: 15, name: "Bara" },
        { id: 16, name: "Dhanusha" },
        { id: 17, name: "Mahottari" },
        { id: 18, name: "Parsa" },
        { id: 19, name: "Rautahat" },
        { id: 20, name: "Saptari" },
        { id: 21, name: "Sarlahi" },
        { id: 22, name: "Siraha" },
      ],
    },
    3: {
      name: "Province3",
      districts: [
        { id: 23, name: "Bhaktapur" },
        { id: 24, name: "Chitwan" },
        { id: 25, name: "Dhading" },
        { id: 26, name: "Dolakha" },
        { id: 27, name: "Kathmandu" },
        { id: 28, name: "Kavrepalanchok" },
        { id: 29, name: "Lalitpur" },
        { id: 30, name: "Makwanpur" },
        { id: 31, name: "Nuwakot" },
        { id: 32, name: "Ramechhap" },
        { id: 33, name: "Sindhuli" },
        { id: 34, name: "Sindhupalchok" },
      ],
    },
    4: {
      name: "Province4",
      districts: [
        { id: 35, name: "Baglung" },
        { id: 36, name: "Gorkha" },
        { id: 37, name: "Kaski" },
        { id: 38, name: "Lamjung" },
        { id: 39, name: "Manang" },
        { id: 40, name: "Mustang" },
        { id: 41, name: "Myagdi" },
        { id: 42, name: "Nawalpur" },
        { id: 43, name: "Parbat" },
        { id: 44, name: "Syangja" },
        { id: 45, name: "Tanahun" },
      ],
    },
    5: {
      name: "Province5",
      districts: [
        { id: 46, name: "Arghakhanchi" },
        { id: 47, name: "Banke" },
        { id: 48, name: "Bardiya" },
        { id: 49, name: "Dang" },
        { id: 50, name: "Gulmi" },
        { id: 51, name: "Kapilvastu" },
        { id: 52, name: "Nawalparasi" },
        { id: 53, name: "Palpa" },
        { id: 54, name: "Pyuthan" },
        { id: 55, name: "Rolpa" },
        { id: 56, name: "Rupandehi" },
      ],
    },
    6: {
      name: "Province6",
      districts: [
        { id: 57, name: "Dailekh" },
        { id: 58, name: "Dolpa" },
        { id: 59, name: "Humla" },
        { id: 60, name: "Jajarkot" },
        { id: 61, name: "Jumla" },
        { id: 62, name: "Kalikot" },
        { id: 63, name: "Mugu" },
        { id: 64, name: "Rukum (East)" },
        { id: 65, name: "Salyan" },
        { id: 66, name: "Surkhet" },
      ],
    },
    7: {
      name: "Province7",
      districts: [
        { id: 67, name: "Achham" },
        { id: 68, name: "Baitadi" },
        { id: 69, name: "Bajhang" },
        { id: 70, name: "Bajura" },
        { id: 71, name: "Dadeldhura" },
        { id: 72, name: "Darchula" },
        { id: 73, name: "Doti" },
        { id: 74, name: "Kailali" },
        { id: 75, name: "Kanchanpur" },
      ],
    },
  };

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [primaryNumber, setPrimaryNumber] = useState("");
  const [tole, setTole] = useState("");
  const [ward, setWard] = useState("");
  const [provinceId, setProvinceId] = useState("");
  const [districtId, setDistrictId] = useState("");
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleValidation = () => {
    const newErrors = {
      fullname: !fullname,
      email: !email,
      password: !password,
      confirmPassword: !confirmPassword,
      primaryNumber: !primaryNumber,
      tole: !tole,
      ward: !ward,
      provinceId: !provinceId,
      districtId: !districtId,
    };
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const isButtonDisabled = Object.values({
    fullname,
    email,
    password,
    confirmPassword,
    primaryNumber,
    tole,
    ward,
    provinceId,
    districtId,
  }).some((value) => !value);

  async function handleSignup(event) {
    event.preventDefault();

    if (!handleValidation()) return;

    if (password !== confirmPassword) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${APIURL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          fullname,
          email,
          password,
          contact: { primaryNumber },
          address: {
            tole,
            ward: parseInt(ward, 10), // Convert ward to number
            provinceId: parseInt(provinceId, 10), // Convert provinceId to number
            districtId: parseInt(districtId, 10), // Send district ID as number
          },
        }),
      });

      const userData = await res.json();
      if (userData.success) {
        setMsg("User created successfully");
        setFullname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPrimaryNumber("");
        setTole("");
        setWard("");
        setProvinceId("");
        setDistrictId("");
        navigate("/otp");
        // setTimeout(() => navigate("/otp"), 1000);
      } else {
        alert(userData.message);
      }
    } catch (error) {
      alert("Error: 404");
      console.error(error);
    }
  }

  return (
    <div className="body-signin">
      <form className="form-sign" onSubmit={handleSignup}>
        <h2 className="h-22">SIGN UP</h2>
        <div className="m-3">
          <input
            type="text"
            className="form-control"
            placeholder="Full name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
          />
          {errors.fullname && (
            <span className="error">Full name is required</span>
          )}
        </div>
        <div className="m-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <span className="error">Email is required</span>}
        </div>
        <div className="m-3">
          <input
            type="password"
            className="form-control"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <span className="error">Password is required</span>
          )}
        </div>
        <div className="m-3">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {errors.confirmPassword && (
            <span className="error">Please confirm your password</span>
          )}
        </div>
        <div className="m-3">
          <input
            type="text"
            className="form-control"
            placeholder="Primary Contact"
            value={primaryNumber}
            onChange={(e) => setPrimaryNumber(e.target.value)}
          />
          {errors.primaryNumber && (
            <span className="error">Contact number is required</span>
          )}
        </div>
        <div className="m-3">
          <select
            className="form-control"
            value={provinceId}
            onChange={(e) => {
              setProvinceId(e.target.value);
              setDistrictId("");
            }}
          >
            <option value="">Select Province</option>
            {Object.entries(provinces).map(([id, province]) => (
              <option key={id} value={id}>
                {province.name}
              </option>
            ))}
          </select>
          {errors.provinceId && (
            <span className="error">Province is required</span>
          )}
        </div>
        <div className="m-3">
          <select
            className="form-control"
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
            disabled={!provinceId}
          >
            <option value="">Select District</option>
            {provinceId &&
              provinces[provinceId].districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
          </select>
          {errors.districtId && (
            <span className="error">District is required</span>
          )}
        </div>
        <div className="m-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tole"
            value={tole}
            onChange={(e) => setTole(e.target.value)}
          />
          {errors.tole && <span className="error">Tole is required</span>}
        </div>
        <div className="m-3">
          <input
            type="number"
            className="form-control"
            placeholder="Ward no"
            value={ward}
            onChange={(e) => setWard(e.target.value)}
          />
          {errors.ward && <span className="error">Ward is required</span>}
        </div>
        {msg && <p style={{ color: "green" }}>{msg}</p>}
        <button
          type="submit"
          className="btn11"
          disabled={isButtonDisabled}
          style={{
            backgroundColor: isButtonDisabled ? "gray" : "#e82f22",
            cursor: isButtonDisabled ? "not-allowed" : "pointer",
          }}
        >
          Sign Up
        </button>
        <label className="account1">
          Already have an account?{" "}
          <Link to={"/Login"} className="log">
            Login
          </Link>
        </label>
      </form>
    </div>
  );
};

export default Signin;
