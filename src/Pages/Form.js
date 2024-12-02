import React, { useState } from "react";
import "../Css/Form.css";

const Form = () => {
  const [district, setDistrict] = useState("");
  const [tole, setTole] = useState("");
  const [wardnumber, setWardnumber] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [province, setProvince] = useState("");
  const [complainTitle, setcomplainTitle] = useState("");

  const handleForm = () => {
    console.log(
      "button clicked. The given data are",
      district,
      wardnumber,
      location,
      description,
      tole,
      province,
      complainTitle
    );
  };
  return (
    <div className="form-main" onChange={handleForm}>
      <h1 className="heading1" style={{ alignItems: "center" }}>
        Details Of The Complaint
      </h1>

      <h3 className="heading3"> Complaint Details</h3>
      <h4 className="heading4">
        Note: To address the complaint effectively , please provide detailed
        information
      </h4>

      <form className="form-row">
        <div>
          <label for="Title">Complaint Title</label>
          <input
            className="textarea"
            value={complainTitle}
            onChange={(e) => setcomplainTitle(e.target.value)}
          ></input>
          <div class="form-group">
            <label for="district">District</label>
            <select
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
          <div class="form-group">
            <label for="province">Province:</label>
            <select
              className="province"
              value={province}
              onChange={(e) => setProvince(e.target.value)}
            >
              <option value="province1">Province 1</option>
              <option value="province2">Province 2</option>
              <option value="province2">Province 3</option>
              <option value="province2">Province 4</option>
              <option value="province2">Province 5</option>
              <option value="province2">Province 6</option>
              <option value="province2">Province 7</option>
            </select>
          </div>
          <div class="form-group">
            <label for="tole">Tole:</label>
            <input
              className="textarea"
              value={tole}
              onChange={(e) => setTole(e.target.value)}
            ></input>
          </div>
          <div class="form-group">
            <label for="ward">Ward Number:</label>
            <input
              className="textarea"
              value={wardnumber}
              onChange={(e) => setWardnumber(e.target.value)}
            ></input>
          </div>
          <div class="form-group">
            <label for="location">Location:</label>
            <input
              className="textarea"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            ></input>
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div class="form-group">
            <label htmlFor="anonymous" id="anonymous">
              Anonymous
            </label>
            <input type="checkbox" id="anonymous" />
          </div>
        </div>

        <button type="submit" onClick={handleForm}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
