import React, { useState, useEffect } from "react";
import axios from 'axios';

import '../App.css';

const Signup = ({ setipfs }) => {
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [ipfs, setIpfs] = useState("");
 
  useEffect(() => {
    console.log('Updated IPFS Hash Array:', ipfs);
  }, [ipfs]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "address") setAddress(value);
  };

  const connectMetamask = async (e) => {
    e.preventDefault()
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

  const otherhandlePhotoUpload = async (event) => {
    try {
          if (!event.target.files || event.target.files.length === 0) {
      console.error('No files selected for upload');
      return;
    }

      const uploadedPhoto = event.target.files[0];
      const formData = new FormData();
      formData.append('file', uploadedPhoto);
      formData.append('pinataOptions', '{"cidVersion": 0}');
      formData.append('pinataMetadata', `{"name": "${username}"}`);

      const response = await axios.post('https://api.pinata.cloud/pinning/pinFileToIPFS', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIwNjQ2YmM0MS00YTc3LTRjMjItYTRjYS1hZmY5MWFiOGI0M2MiLCJlbWFpbCI6Im1vbms4ODk2QGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJwaW5fcG9saWN5Ijp7InJlZ2lvbnMiOlt7ImlkIjoiRlJBMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfSx7ImlkIjoiTllDMSIsImRlc2lyZWRSZXBsaWNhdGlvbkNvdW50IjoxfV0sInZlcnNpb24iOjF9LCJtZmFfZW5hYmxlZCI6ZmFsc2UsInN0YXR1cyI6IkFDVElWRSJ9LCJhdXRoZW50aWNhdGlvblR5cGUiOiJzY29wZWRLZXkiLCJzY29wZWRLZXlLZXkiOiI1MTA3M2M3NGZmMmZjODMyMDhjYiIsInNjb3BlZEtleVNlY3JldCI6ImE2YTY3NjQwMmQ3MzI4MTVmYTgzOWI0MGVhMzFjMDlhMWQyNjJhZWQyMmY1OWJkZWNmOTA0OTBhNmQ3OTkyNjAiLCJpYXQiOjE3MTI2NTQ2Mjd9.kBC7EeGHaXaxBOa-sNBao9Tg1Mggom-vAhQmNwyea88`
        }
      });

      if (response.data) {
        const ipfsUrl = `https://gateway.pinata.cloud/ipfs/${response.data.IpfsHash}`;
        setIpfs(ipfsUrl);
      } else {
        console.error('Error uploading file to IPFS: Invalid response');
      }
    } catch (error) {
      console.error('Error uploading file to IPFS:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Only proceed if both username and address are filled
      if (!username || !address) {
        console.error("Please fill in both username and address.");
        return;
      }
      
      // Call other photo upload method to upload to IPFS
      await otherhandlePhotoUpload(e);

      // Form submission
      const formData = new FormData();
      formData.append("username", username);
      formData.append("address", address);
      // formData.append("photo", photo);
      formData.append("ipfs", ipfs);

      const response = await axios.post(`http://localhost:5000/upload`, formData);
      if (response.status === 200) {
        console.log("Form submitted successfully");
        alert("You're all set!");
      } else {
        console.error("Form submission failed:", response.statusText);
      }
    
      
    } catch (error) {
      alert("you already have an address")
      console.error("Error submitting form:", error.message);
    }
  };

  

  return (
    <div>
      <div className="help-container">
        <form onSubmit={handleSubmit}>
          <h1>Sign up and upload</h1>
          <div className="form-group">
            <label htmlFor="username">Username:
             <input
              type="text"
              name="username"
              className="form-control"
              id="username"
              value={username}
              onChange={handleInputChange}
              placeholder="Name"
               style={{ width: "200px", padding: "5px", fontSize: "14px" }}
            />
            </label>
           
          </div>
          <div className="form-group">
            <label htmlFor="address">Connect Wallet:</label>
            <button onClick={connectMetamask}>Connect</button>
            
          </div>
          <div className="form-group">
            <label htmlFor="photo">Upload Photo:</label>
            <input type="file" onChange={otherhandlePhotoUpload} />
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