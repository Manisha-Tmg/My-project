import React, { useEffect, useState } from "react";
import "../Css/Form.css";
import { APIURL } from "../env";
import { useLocation, useNavigate } from "react-router-dom";
import { storage } from "../firebase"; // Import Firebase storage

const Form = () => {
  const locationn = useLocation();
  const grievanceType = locationn.state?.grievanceType || "";
  const [district, setDistrict] = useState("");
  const [tole, setTole] = useState("");
  const [wardNumber, setWardNumber] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [province, setProvince] = useState("");
  const [complainTitle, setComplainTitle] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [files, setFiles] = useState([]); // State to hold file attachments
  const navigate = useNavigate();

  useEffect(() => {
    if (grievanceType) {
      setComplainTitle(grievanceType);
    }
  }, [grievanceType]);

  // Handle file selection
  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  // Upload files to Firebase Storage
  const uploadFiles = async () => {
    const fileUrls = [];
    const promises = [];

    for (const file of files) {
      const storageRef = storage.ref(`complaints/${file.name}`);
      const uploadTask = storageRef.put(file);

      promises.push(
        uploadTask.then(async (snapshot) => {
          const downloadURL = await snapshot.ref.getDownloadURL();
          fileUrls.push(downloadURL); // Save the URL for each uploaded file
        })
      );
    }

    await Promise.all(promises); // Wait until all files are uploaded
    return fileUrls;
  };

  async function handleFormSubmit(e) {
    e.preventDefault();
    console.log(
      complainTitle,
      district,
      province,
      tole,
      wardNumber,
      location,
      description,
      isAnonymous
    );

    const formData = {
      complainTitle,
      district,
      province,
      tole,
      wardNumber,
      location,
      description,
      isAnonymous,
    };

    const accessToken = localStorage.getItem("accessToken");

    try {
      let fileUrls = [];
      if (files.length > 0) {
        fileUrls = await uploadFiles(); // Upload files and get URLs
      }

      formData.files = fileUrls; // Add file URLs to the form data

      const response = await fetch(`${APIURL}/api/v1/complaint`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      });

      const udata = await response.json();
      if (udata.success) {
        localStorage.setItem("accessToken", udata.data.accessToken);
        localStorage.setItem("token", udata.data.token);
        alert("Complaint submitted successfully!");
        navigate("/complain");
      } else {
        alert("Failed to submit the complaint.");
      }
    } catch (error) {
      console.error("Error submitting the complaint:", error);
      alert("Error submitting the complaint");
    }
  }

  return (
    <div className="form-main">
      <h1 className="heading1">Details Of The Complaint</h1>
      <h3 className="heading3">Complaint Details</h3>
      <h4 className="heading4">
        Note: To address the complaint effectively, please provide detailed
        information.
      </h4>

      <form className="form-row" onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="complainTitle">Complaint Title</label>
          <input
            id="complainTitle"
            className="textarea"
            value={complainTitle}
            onChange={(e) => setComplainTitle(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="province">Province</label>
          <select
            id="province"
            className="province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          >
            <label value="slect province">Select Province</label>
            <option value="province2">Province 2</option>
            <option value="province2">Province 3</option>
            <option value="province2">Province 4</option>
            <option value="province2">Province 5</option>
            <option value="province2">Province 6</option>
            <option value="province2">Province 7</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="district">District</label>
          <select
            id="district"
            className="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          >
            <option value="">Select a district</option>
            <option value="Achham">Achham</option>
            <option value="Arghakhanchi">Arghakhanchi</option>
            <option value="Baglung">Baglung</option>
            <option value="Baitadi">Baitadi</option>
            <option value="Bajhang">Bajhang</option>
            <option value="Bajura">Bajura</option>
            <option value="Banke">Banke</option>
            <option value="Bara">Bara</option>
            <option value="Bardiya">Bardiya</option>
            <option value="Bhaktapur">Bhaktapur</option>
            <option value="Bhojpur">Bhojpur</option>
            <option value="Chitwan">Chitwan</option>
            <option value="Dadeldhura">Dadeldhura</option>
            <option value="Dailekh">Dailekh</option>
            <option value="Dang">Dang</option>
            <option value="Darchula">Darchula</option>
            <option value="Dhading">Dhading</option>
            <option value="Dhankuta">Dhankuta</option>
            <option value="Dhanusha">Dhanusha</option>
            <option value="Dolakha">Dolakha</option>
            <option value="Dolpa">Dolpa</option>
            <option value="Doti">Doti</option>
            <option value="Gorkha">Gorkha</option>
            <option value="Gulmi">Gulmi</option>
            <option value="Humla">Humla</option>
            <option value="Ilam">Ilam</option>
            <option value="Jajarkot">Jajarkot</option>
            <option value="Jhapa">Jhapa</option>
            <option value="Jumla">Jumla</option>
            <option value="Kailali">Kailali</option>
            <option value="Kalikot">Kalikot</option>
            <option value="Kanchanpur">Kanchanpur</option>
            <option value="Kapilvastu">Kapilvastu</option>
            <option value="Kaski">Kaski</option>
            <option value="Kathmandu">Kathmandu</option>
            <option value="Kavrepalanchok">Kavrepalanchok</option>
            <option value="Khotang">Khotang</option>
            <option value="Lalitpur">Lalitpur</option>
            <option value="Lamjung">Lamjung</option>
            <option value="Mahottari">Mahottari</option>
            <option value="Makwanpur">Makwanpur</option>
            <option value="Manang">Manang</option>
            <option value="Morang">Morang</option>
            <option value="Mugu">Mugu</option>
            <option value="Mustang">Mustang</option>
            <option value="Myagdi">Myagdi</option>
            <option value="Nawalpur">Nawalpur</option>
            <option value="Nuwakot">Nuwakot</option>
            <option value="Okhaldhunga">Okhaldhunga</option>
            <option value="Palpa">Palpa</option>
            <option value="Panchthar">Panchthar</option>
            <option value="Parbat">Parbat</option>
            <option value="Parsa">Parsa</option>
            <option value="Pyuthan">Pyuthan</option>
            <option value="Ramechhap">Ramechhap</option>
            <option value="Rasuwa">Rasuwa</option>
            <option value="Rautahat">Rautahat</option>
            <option value="Rolpa">Rolpa</option>
            <option value="Rukum East">Rukum East</option>
            <option value="Rukum West">Rukum West</option>
            <option value="Rupandehi">Rupandehi</option>
            <option value="Salyan">Salyan</option>
            <option value="Sankhuwasabha">Sankhuwasabha</option>
            <option value="Saptari">Saptari</option>
            <option value="Sarlahi">Sarlahi</option>
            <option value="Sindhuli">Sindhuli</option>
            <option value="Sindhupalchok">Sindhupalchok</option>
            <option value="Siraha">Siraha</option>
            <option value="Solukhumbu">Solukhumbu</option>
            <option value="Sunsari">Sunsari</option>
            <option value="Surkhet">Surkhet</option>
            <option value="Syangja">Syangja</option>
            <option value="Tanahun">Tanahun</option>
            <option value="Taplejung">Taplejung</option>
            <option value="Terhathum">Terhathum</option>
            <option value="Udayapur">Udayapur</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="tole">Tole</label>
          <input
            id="tole"
            className="textarea"
            value={tole}
            onChange={(e) => setTole(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="wardNumber">Ward Number</label>
          <input
            id="wardNumber"
            className="textarea"
            value={wardNumber}
            onChange={(e) => setWardNumber(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            id="location"
            className="textarea"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        {/* File input */}
        <div className="form-group">
          <label htmlFor="attachments">Attach Files</label>
          <input
            id="attachments"
            type="file"
            multiple
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label htmlFor="anonymous">Anonymous</label>
          <input
            id="anonymous"
            type="checkbox"
            checked={isAnonymous}
            onChange={() => setIsAnonymous(!isAnonymous)}
          />
        </div>

        <button className="submit">Submit</button>
      </form>
    </div>
  );
};

export default Form;
