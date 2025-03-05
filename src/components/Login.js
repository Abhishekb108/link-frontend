import './Login.css';
import frame from '../images/frame.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    username: '',
    password: '',
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
      case 'username':
        newErrors.username = value.trim() ? '' : 'Username required*';
        break;
      case 'password':
        newErrors.password = value.trim() ? '' : 'Password required*';
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
      // Simulate login and check if profile is set up (simplified logic)
      alert('Login successful! Setting up your profile.');
      navigate('/profile-setup'); // Navigate to profile setup after login
    } else {
      Object.keys(formData).forEach((key) => validateField(key, formData[key]));
    }
  };

  return (
    <div className="login-page">
      <div className="login-content">
        <div className="login-form">
          <h2>Sign in to your Spark</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Spark/Username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p className="error">{errors.username}</p>}
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
            <button type="submit">Login</button>
          </form>
          <a href="/forgot-password" className="forgot-password">Forgot password?</a>
          <a href="/signup" className="signup-link">Sign up</a>
          <p className="captcha">This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.</p>
        </div>
        <div className="login-image" style={{ backgroundImage: `url(${frame})` }}></div>
      </div>
    </div>
  );
}

export default Login;