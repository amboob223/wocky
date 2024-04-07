import React, { useState, useEffect } from "react";

const Signup = () => {
    const [photo, setPhoto] = useState(null);
    const [username, setUsername] = useState('');
    const [address, setAddress] = useState('');
    const [isExistingUser, setIsExistingUser] = useState(false);

    useEffect(() => {
        // Any initialization or side effects can be performed here
    }, []);

    const handlePhotoUpload = (event) => {
        // Handle photo upload logic here
        const uploadedPhoto = event.target.files[0];
        setPhoto(uploadedPhoto);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleSubmit = () => {
        // Handle form submission logic here
        console.log("Photo:", photo);
        console.log("Username:", username);
        console.log("Address:", address);
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
                Username:
                <input type="text" value={username} onChange={handleUsernameChange} />
            </label>
            <br />
            <label>
                Address:
                <input type="text" value={address} onChange={handleAddressChange} />
            </label>
            <br />
            <button onClick={handleSubmit}>Submit</button>
            <br />
            <label>
                Are you an existing user?
                <input type="checkbox" checked={isExistingUser} onChange={() => setIsExistingUser(!isExistingUser)} />
            </label>
        </div>
    );
};

export default Signup;
