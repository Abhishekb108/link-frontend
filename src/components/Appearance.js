import './Appearance.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Appearance() {
  const location = useLocation();
  const { state } = location;
  const initialUsername = state?.username || 'Username';
  const initialBio = state?.bio || ''; // Default to empty string if not passed
  const initialProfilePhoto = state?.profilePhoto || null; // Fetch profile photo from state
  const initialLinks = state?.links || []; // Fetch links from state
  const initialShops = state?.shops || []; // Fetch shops from state

  const [layout, setLayout] = useState('Stack'); // Default layout
  const [buttonStyle, setButtonStyle] = useState('Fill'); // Default button style
  const [font, setFont] = useState('DM Sans'); // Default font
  const [theme, setTheme] = useState('Air Snow'); // Default theme
  const [links, setLinks] = useState(initialLinks); // Use links from state
  const [shops, setShops] = useState(initialShops); // Use shops from state
  const [profilePhoto, setProfilePhoto] = useState(initialProfilePhoto); // Use profile photo from state
  const [bio, setBio] = useState(initialBio); // Use bio from state

  // If no state is passed, use mock data (you’d fetch or pass real data from Links)
  useEffect(() => {
    if (!initialLinks.length && !initialShops.length) {
      // Mock data if no state is provided (simulate Links screen data)
      setLinks([
        { title: 'Latest YouTube Video', url: 'https://www.youtube.com', enabled: true },
        { title: 'Latest Instagram Reel', url: 'https://www.instagram.com', enabled: true },
      ]);
      setShops([]);
    }
  }, [initialLinks, initialShops]);

  const handleLayoutChange = (e) => {
    setLayout(e.target.value);
  };

  const handleButtonStyleChange = (e) => {
    setButtonStyle(e.target.value);
  };

  const handleFontChange = (e) => {
    setFont(e.target.value);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const getThemeBackgroundColor = () => {
    const themeColors = {
      'Air Snow': '#f0f8ff',
      'Air Grey': '#d3d3d3',
      'Air Smoke': '#666666',
      'Air Black': '#000000',
      'Mineral Blue': '#add8e6',
      'Mineral Green': '#90ee90',
      'Mineral Orange': '#ffa500',
    };
    return themeColors[theme] || '#f0f8ff'; // Default to Air Snow if theme not found
  };

  return (
    <div className="appearance-main">
      <div className="appearance-form-content">
        <div className="option-section">
          <h3>Layout</h3>
          <div className="layout-options">
            <label>
              <input
                type="radio"
                name="layout"
                value="Stack"
                checked={layout === 'Stack'}
                onChange={handleLayoutChange}
              />
              <span className="layout-icon" role="img" aria-label="Stack">≡</span> Stack
            </label>
            <label>
              <input
                type="radio"
                name="layout"
                value="Grid"
                checked={layout === 'Grid'}
                onChange={handleLayoutChange}
              />
              <span className="layout-icon" role="img" aria-label="Grid">⧉</span> Grid
            </label>
            <label>
              <input
                type="radio"
                name="layout"
                value="Carousel"
                checked={layout === 'Carousel'}
                onChange={handleLayoutChange}
              />
              <span className="layout-icon" role="img" aria-label="Carousel">↔</span> Carousel
            </label>
          </div>
        </div>
        <div className="option-section">
          <h3>Buttons</h3>
          <div className="button-options">
            <label>
              <input
                type="radio"
                name="buttonStyle"
                value="Fill"
                checked={buttonStyle === 'Fill'}
                onChange={handleButtonStyleChange}
              />
              <span className="button-icon" role="img" aria-label="Fill">⬜</span> Fill
            </label>
            <label>
              <input
                type="radio"
                name="buttonStyle"
                value="Outline"
                checked={buttonStyle === 'Outline'}
                onChange={handleButtonStyleChange}
              />
              <span className="button-icon" role="img" aria-label="Outline">□</span> Outline
            </label>
            <label>
              <input
                type="radio"
                name="buttonStyle"
                value="Hard Shadow"
                checked={buttonStyle === 'Hard Shadow'}
                onChange={handleButtonStyleChange}
              />
              <span className="button-icon" role="img" aria-label="Hard Shadow">⬛</span> Hard Shadow
            </label>
            <label>
              <input
                type="radio"
                name="buttonStyle"
                value="Soft Shadow"
                checked={buttonStyle === 'Soft Shadow'}
                onChange={handleButtonStyleChange}
              />
              <span className="button-icon" role="img" aria-label="Soft Shadow">⬜</span> Soft Shadow
            </label>
          </div>
        </div>
        <div className="option-section">
          <h3>Fonts</h3>
          <select value={font} onChange={handleFontChange}>
            <option value="DM Sans">DM Sans</option>
            <option value="Arial">Arial</option>
            <option value="Times New Roman">Times New Roman</option>
          </select>
        </div>
        <div className="option-section">
          <h3>Themes</h3>
          <select value={theme} onChange={handleThemeChange}>
            <option value="Air Snow">Air Snow</option>
            <option value="Air Grey">Air Grey</option>
            <option value="Air Smoke">Air Smoke</option>
            <option value="Air Black">Air Black</option>
            <option value="Mineral Blue">Mineral Blue</option>
            <option value="Mineral Green">Mineral Green</option>
            <option value="Mineral Orange">Mineral Orange</option>
          </select>
        </div>
        <button onClick={() => alert('Appearance saved successfully!')} className="save-button">
          Save
        </button>
      </div>
      <div className="preview-mobile">
        <div className={`mobile-screen ${theme.toLowerCase().replace(' ', '-')}`} style={{ backgroundColor: getThemeBackgroundColor() }}>
          <div className="mobile-header">
            <button>↑</button>
            <img src={profilePhoto || 'https://via.placeholder.com/50'} alt="Profile" className="mobile-profile" />
            <p style={{ fontFamily: font }}>@{initialUsername}</p>
          </div>
          <div className={`mobile-links ${layout.toLowerCase()}`} style={{ fontFamily: font }}>
            <button className={`mobile-link ${buttonStyle.toLowerCase().replace(' ', '-')}`}>Link</button>
            <button className={`mobile-shop ${buttonStyle.toLowerCase().replace(' ', '-')}`}>Shop</button>
            {links.filter(link => link.enabled).map((link, index) => (
              <button key={index} className={`mobile-link-item ${buttonStyle.toLowerCase().replace(' ', '-')}`} style={{ fontFamily: font }}>
                {link.title}
              </button>
            ))}
            {shops.filter(shop => shop.enabled).map((shop, index) => (
              <button key={index + links.length} className={`mobile-link-item ${buttonStyle.toLowerCase().replace(' ', '-')}`} style={{ fontFamily: font }}>
                {shop.title}
              </button>
            ))}
            <div className="mobile-bio" style={{ fontFamily: font }}>{bio || 'Bio'}</div>
            <button className={`mobile-connect ${buttonStyle.toLowerCase().replace(' ', '-')}`} style={{ fontFamily: font }}>
              Get Connected
            </button>
          </div>
          <div className="mobile-footer" style={{ fontFamily: font, backgroundColor: getThemeBackgroundColor() }}>SPARK</div>
        </div>
      </div>
    </div>
  );
}

export default Appearance;