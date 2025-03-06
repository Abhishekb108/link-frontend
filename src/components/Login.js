import "./Login.css";
import frame from "../images/frame.jpg";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
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
      case "email":
        newErrors.email = value.trim() ? "" : "email required*";
        break;
      case "password":
        newErrors.password = value.trim() ? "" : "Password required*";
        break;
      default:
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const allFieldsFilled = Object.values(formData).every(
      (field) => field.trim() !== ""
    );
    const noErrors = Object.values(errors).every((error) => error === "");

    if (allFieldsFilled && noErrors) {
      // Simulate login and check if profile is set up (simplified logic)

      //post request
      fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          alert("Login successful! Setting up your profile.");
          
          //save data.token in localstorage
          localStorage.setItem("token", data.token);
          navigate('/profile-setup');
        })
        .catch((error) => {
          console.error("Error:", error);
        });

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
                name="email"
                placeholder="Spark/email"
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
            <button type="submit">Login</button>
          </form>
          <a href="/forgot-password" className="forgot-password">
            Forgot password?
          </a>
          <a href="/signup" className="signup-link">
            Sign up
          </a>
          <p className="captcha">
            This site is protected by reCAPTCHA and the Google Privacy Policy
            and Terms of Service apply.
          </p>
        </div>
        <div
          className="login-image"
          style={{ backgroundImage: `url(${frame})` }}
        ></div>
      </div>
    </div>
  );
}

export default Login;
