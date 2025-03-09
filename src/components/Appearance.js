import './Appearance.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Appearance() {
  const location = useLocation();
  const { state } = location;
  const [fetchData , setFetchData] = useState('')
  const initialUsername = state?.username || 'Username';
  const initialBio = state?.bio || ''; // Default to empty string if not passed
  const initialProfilePhoto = state?.profilePhoto || null; // Fetch profile photo from state
  // const initialLinks = fetchData?.links || []; // Fetch links from state
  // const initialShops = fetchData?.shops || []; // Fetch shops from state

  const [layout, setLayout] = useState(''); // Default layout
  const [buttonStyle, setButtonStyle] = useState(''); // Default button style
  const [font, setFont] = useState(''); // Default font
  const [theme, setTheme] = useState(''); // Default theme
  // const [links, setLinks] = useState(fetchData.links || []); // Use links from state  
  // const [shops, setShops] = useState(fetchData.shops || []) // Use shops from state
  const [profilePhoto, setProfilePhoto] = useState(initialProfilePhoto); // Use profile photo from state
  const [bio, setBio] = useState(initialBio); // Use bio from state

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
  

  // If no state is passed, use mock data (you’d fetch or pass real data from Links)
  // useEffect(() => {
  //   if (!fetchData?.links?.length   && !fetchData?.shops?.length ) {
  //     // Mock data if no state is provided (simulate Links screen data)
  //     setLinks(fetchData.links);
  //     setShops(fetchData.shops);
  //   }
  // }, [fetchData.links, fetchData.shops]);

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

  const handleSave = () => {
    if(layout !== '' && buttonStyle !== '' && font !== '' && theme !== ''){
      const payload = {
        bannerColor: '#1d293b',
        appearanceSettings: {
          layout: layout,
          buttonStyle: buttonStyle,
          font: font,
          theme: theme
        }
      }
      updateAppearance(payload);

  }
}


useEffect(()=>{
  setLayout(fetchData?.appearanceSettings?.layout );  
  setButtonStyle(fetchData?.appearanceSettings?.buttonStyle );
  setFont(fetchData?.appearanceSettings?.font );
  setTheme(fetchData?.appearanceSettings?.theme );
},[fetchData])


const updateAppearance = async (payload) => {
    try {
      const response = await fetch('http://localhost:5000/api/profile/appearance', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        },
        body: JSON.stringify(payload),
      })
      const data = await response.json();
      alert('Appearance updated successfully!');
      fetchData();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }
  }



  


// console.log(links,'links')
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
        <button onClick={() => {handleSave()}} className="save-button">
          Save
        </button>
      </div>
      <div className="preview-mobile">
        <div className={`mobile-screen ${theme?.toLowerCase()?.replace(' ', '-')}`} style={{ backgroundColor: getThemeBackgroundColor() }}>
          <div className="mobile-header">
            <button>↑</button>
            <img src={fetchData.profilePhoto || 'https://via.placeholder.com/50'} alt="Profile" className="mobile-profile" />
            <p style={{ fontFamily: font }}>@{fetchData.username}</p>
          </div>
          <div className={`mobile-links ${layout?.toLowerCase()}`} style={{ fontFamily: font }}>
            <button className={`mobile-link ${buttonStyle?.toLowerCase()?.replace(' ', '-')}`}>Link</button>
            <button className={`mobile-shop ${buttonStyle?.toLowerCase()?.replace(' ', '-')}`}>Shop</button>
            {
              fetchData?.links?.filter(link => link?.enabled)?.map((link, index) => (
                <button key={index} className={`mobile-link-item ${buttonStyle?.toLowerCase()?.replace(' ', '-')}`} style={{ fontFamily: font }}>
                  {link?.title}
                </button>
              ))
            }
          
            {fetchData?.shops?.filter(shop => shop?.enabled)?.map((shop, index) => (
              <button key={index + fetchData?.shops?.length} className={`mobile-link-item ${buttonStyle?.toLowerCase()?.replace(' ', '-')}`} style={{ fontFamily: font }}>
                {shop?.title}
              </button>
            ))}
            <div className="mobile-bio" style={{ fontFamily: font }}>{fetchData.bio || 'Bio'}</div>
            <button className={`mobile-connect ${buttonStyle?.toLowerCase()?.replace(' ', '-')}`} style={{ fontFamily: font }}>
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