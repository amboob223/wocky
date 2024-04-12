import React, { useState } from "react";
import axios from 'axios';

const Signup = () => {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [photo, setPhoto] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "address") setAddress(value);
  };

  const handlePhotoUpload = (event) => {
    const uploadedPhoto = event.target.files[0];
    setPhoto(uploadedPhoto);
  };

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setAddress(account);
      } catch {
        console.log("MetaMask not detected.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("address", address);
      formData.append("photo", photo);
      const response = await axios.post(`http://localhost:5000/upload`, formData);
      if (response.status === 200) {
        console.log("form went through");
        alert("You good bro");
      } else {
        console.error("form submission failed", response.statusText);
      }
    } catch (error) {
      console.error("error submit form", error.message);
    }
  };

  return (
    <div>
      <div className="help-container">
        
        <form onSubmit={handleSubmit}>
          <h1> Let us Help </h1>
          <div className="form-group">
            <label htmlFor="username">Name:</label>
            <input
              type="text"
              name="username"
              className="form-control"
              id="username"
              value={username}
              onChange={handleInputChange}
              placeholder="Name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Wallet:</label>
            <button onClick={connectMetamask}>Connect</button>
            <h1>{address}</h1>
          </div>
          <div className="form-group">
            <label htmlFor="photo">Upload Photo:</label>
            <input type="file" onChange={handlePhotoUpload} />
          </div>
          <button className="btn btn-warning" type="submit" id="btn">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
