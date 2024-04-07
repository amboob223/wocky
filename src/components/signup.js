import React, { useState } from "react";

const Signup = () => {
  const [photo, setPhoto] = useState(null);
  const [username, setUsername] = useState('');
  const [isExistingUser, setIsExistingUser] = useState(false);
  const [address,setAddress] = useState("");

  const connectMetamask = async () => {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const account = accounts[0];
     setAddress(account)

  } catch {
    console.log("MetaMask not detected.");
  }}
}






  
  const handlePhotoUpload = (event) => {
    const uploadedPhoto = event.target.files[0];
    setPhoto(uploadedPhoto);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleSubmit = () => {
    console.log("Photo:", photo);
    console.log("Username:", username);
  };

  return (
    <div>
      <h2>Signup</h2>
      <label>
        Upload Photo:
        <input type="file" onChange={handlePhotoUpload} />
      </label>
      <br />
      <label>
        make a Username:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <button onClick={handleSubmit}>Submit</button>
      <br />
      <label>
        Are you an existing user?
        <input type="checkbox" checked={isExistingUser} onChange={() => setIsExistingUser(!isExistingUser)} />
      </label>
      <br />
      <button onClick={connectMetamask}>Connect</button> {/* Call connectMetamask prop function */}
      <h1>{address}</h1>
    </div>
  );
};

export default Signup;
