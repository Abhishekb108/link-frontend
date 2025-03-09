import './Settings.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Settings() {
  const location = useLocation();
  const { state } = location;
  const initialFirstName = state?.firstName || 'Jenny'; // Default first name
  const initialLastName = state?.lastName || 'Wilson'; // Default last name
  const initialEmail = state?.email || 'JennyWilson08@gmail.com'; // Default email

  const [firstName, setFirstName] = useState(initialFirstName);
  const [lastName, setLastName] = useState(initialLastName);
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fetchData  , setFetchData] = useState('')

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  let userInfomation = JSON.parse(localStorage.getItem('userInformation'));
  let token = localStorage.getItem('token');



  useEffect(()=>{
    const fetchData = async () => {
      const response = await fetch('http://localhost:5000/api/me',{
   method: 'GET',
   headers: {
     'Content-Type': 'application/json',
     'Authorization': token
   }
      }
        
  
      );
      const data = await response.json();
      setFetchData(data);
      
    };
    fetchData();
  
  },[])

  useEffect(() => {
    setFirstName(fetchData.firstName);
    setLastName(fetchData.lastName);
    setEmail(fetchData.email);
  },[fetchData]);






  const handleSave = () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    alert('Profile updated successfully! First Name: ' + firstName + ', Last Name: ' + lastName + ', Email: ' + email);
    // Here, you would typically send data to a backend (e.g., Node.js/Express with MongoDB)
  };

  return (
    <div className="settings-main">
      <div className="settings-form-content">
        <h2>Edit Profile</h2>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            value={firstName}
            onChange={handleFirstNameChange}
            placeholder="First Name"
          />
        </div>
        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={handleLastNameChange}
            placeholder="Last Name"
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="Email"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Password"
          />
        </div>
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            placeholder="Confirm Password"
          />
        </div>
        <button onClick={handleSave} className="save-button">Save</button>
      </div>
    </div>
  );
}

export default Settings;