import './Signup.css';
import frame2 from '../images/frame2.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    validateField(name, value);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case 'firstName':
        newErrors.firstName = value.trim() ? '' : 'First name required*';
        break;
      case 'lastName':
        newErrors.lastName = value.trim() ? '' : 'Last name required*';
        break;
      case 'email':
        newErrors.email = value.trim()
          ? /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
            ? ''
            : 'Invalid Email*'
          : 'Email required*';
        break;
      case 'password':
        newErrors.password = value.trim()
          ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value)
            ? ''
            : 'Password must be at least 8 characters long, include a lowercase and uppercase letter, a number, as well as a strong password that includes (@$!%*?&)*'
          : 'Password required*';
        break;
      case 'confirmPassword':
        newErrors.confirmPassword = value.trim()
          ? value === formData.password
            ? ''
            : 'The password you entered does not match*'
          : 'Confirm Password required*';
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(formData).every((field) => field.trim() !== '');
    const noErrors = Object.values(errors).every((error) => error === '');

    if (allFieldsFilled && noErrors) {
      // Simulate saving the user and navigate to Profile Setup
      alert('Signup successful! Please set up your profile.');
      navigate('/profile-setup');
    } else {
      Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-content">
        <div className="signup-form">
          <h2>Sign up to your Spark</h2>
          <a href="/login" className="login-link">Sign in instead</a>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="firstName"
                placeholder="First name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <p className="error">{errors.firstName}</p>}
            </div>
            <div className="form-group">
              <input
                type="text"
                name="lastName"
                placeholder="Last name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <p className="error">{errors.lastName}</p>}
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <p className="error">{errors.password}</p>}
            </div>
            <div className="form-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && <p className="error">{errors.confirmPassword}</p>}
            </div>
            <p className="terms">
              <input type="checkbox" name="terms" /> By creating an account, I agree to our Terms of Use and Privacy Policy.
            </p>
            <button type="submit">Create an account</button>
          </form>
          <p className="captcha">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
        </div>
        <div className="signup-image" style={{ backgroundImage: `url(${frame2})` }}></div>
      </div>
    </div>
  );
}

export default Signup;