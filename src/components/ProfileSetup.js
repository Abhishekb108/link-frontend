import './ProfileSetup.css';
import frame2 from '../images/frame2.jpg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProfileSetup() {
  const [formData, setFormData] = useState({
    username: '',
    category: 'Business', // Default category
  });

  const [errors, setErrors] = useState({
    username: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === 'username') {
      validateUsername(value);
    }
  };

  const validateUsername = (username) => {
    // Simple placeholder for uniqueness check (simulates backend validation)
    const usernamesTaken = ['john', 'jane', 'user1']; // Example list of taken usernames
    let newErrors = { ...errors };
    newErrors.username = username.trim()
      ? usernamesTaken.includes(username.toLowerCase())
        ? 'Username already taken*'
        : ''
      : 'Username required*';
    setErrors(newErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const noErrors = Object.values(errors).every((error) => error === '');

    if (noErrors && formData.username.trim() && formData.category) {
      // Simulate saving the profile and navigate to Dashboard, passing username and category
      alert(`Profile setup successful with username: ${formData.username} and category: ${formData.category}`);
      navigate('/dashboard/links', { state: { username: formData.username, category: formData.category } });
    } else {
      validateUsername(formData.username);
    }
  };

  return (
    <div className="profile-setup-page">
      <div className="profile-setup-content">
        <div className="profile-setup-form">
          <div className="logo">
            <span role="img" aria-label="Spark logo">🔥</span> SPARK
          </div>
          <h2>Tell us about yourself</h2>
          <p>For a personalized Spark experience</p>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="username"
                placeholder="Tell us your username"
                value={formData.username}
                onChange={handleChange}
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>
            <div className="form-group">
              <p>Select one category that best describes your Linktree:</p>
              <div className="category-options">
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value="Business"
                    checked={formData.category === 'Business'}
                    onChange={handleChange}
                  />
                  <span className="category-icon" role="img" aria-label="Business">💼</span> Business
                </label>
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value="Creative"
                    checked={formData.category === 'Creative'}
                    onChange={handleChange}
                  />
                  <span className="category-icon" role="img" aria-label="Creative">🎨</span> Creative
                </label>
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value="Education"
                    checked={formData.category === 'Education'}
                    onChange={handleChange}
                  />
                  <span className="category-icon" role="img" aria-label="Education">📚</span> Education
                </label>
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value="Entertainment"
                    checked={formData.category === 'Entertainment'}
                    onChange={handleChange}
                  />
                  <span className="category-icon" role="img" aria-label="Entertainment">🎭</span> Entertainment
                </label>
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value="Fashion & Beauty"
                    checked={formData.category === 'Fashion & Beauty'}
                    onChange={handleChange}
                  />
                  <span className="category-icon" role="img" aria-label="Fashion & Beauty">👗</span> Fashion & Beauty
                </label>
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value="Food & Beverage"
                    checked={formData.category === 'Food & Beverage'}
                    onChange={handleChange}
                  />
                  <span className="category-icon" role="img" aria-label="Food & Beverage">🍴</span> Food & Beverage
                </label>
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value="Government & Politics"
                    checked={formData.category === 'Government & Politics'}
                    onChange={handleChange}
                  />
                  <span className="category-icon" role="img" aria-label="Government & Politics">🏛️</span> Government & Politics
                </label>
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value="Health & Wellness"
                    checked={formData.category === 'Health & Wellness'}
                    onChange={handleChange}
                  />
                  <span className="category-icon" role="img" aria-label="Health & Wellness">🏋️</span> Health & Wellness
                </label>
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value="Non-Profit"
                    checked={formData.category === 'Non-Profit'}
                    onChange={handleChange}
                  />
                  <span className="category-icon" role="img" aria-label="Non-Profit">❤️</span> Non-Profit
                </label>
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value="Other"
                    checked={formData.category === 'Other'}
                    onChange={handleChange}
                  />
                  <span className="category-icon" role="img" aria-label="Other">❓</span> Other
                </label>
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value="Tech"
                    checked={formData.category === 'Tech'}
                    onChange={handleChange}
                  />
                  <span className="category-icon" role="img" aria-label="Tech">💻</span> Tech
                </label>
                <label className="category-option">
                  <input
                    type="radio"
                    name="category"
                    value="Travel & Tourism"
                    checked={formData.category === 'Travel & Tourism'}
                    onChange={handleChange}
                  />
                  <span className="category-icon" role="img" aria-label="Travel & Tourism">✈️</span> Travel & Tourism
                </label>
              </div>
            </div>
            <button type="submit">Continue</button>
          </form>
        </div>
        <div className="profile-setup-image" style={{ backgroundImage: `url(${frame2})` }}></div>
      </div>
    </div>
  );
}

export default ProfileSetup;