import './Links.css';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function Links() {
  const location = useLocation();
  const { state } = location;
  const initialUsername = state?.username || 'Jenny Wilson'; // Default username from Profile Setup
  const initialFirstName = state?.firstName || 'Jenny'; // Default first name
  const initialLastName = state?.lastName || 'Wilson'; // Default last name
  const initialEmail = state?.email || 'JennyWilson08@gmail.com'; // Default email

  const [profilePhoto, setProfilePhoto] = useState(null);
  const [bio, setBio] = useState('');
  const [links, setLinks] = useState([]);
  const [shops, setShops] = useState([]);
  const [bannerColor, setBannerColor] = useState('#000000'); // Default to black
  const [isBannerEnabled, setIsBannerEnabled] = useState(true); // Default to enabled
  const [showLinkForm, setShowLinkForm] = useState(false);
  const [showShopForm, setShowShopForm] = useState(false);
  const [newLink, setNewLink] = useState({ title: '', url: '', enabled: false });
  const [newShop, setNewShop] = useState({ title: '', url: '', enabled: false });

  const navigate = useNavigate();

  // let userInfomation = JSON.parse(localStorage.getItem('userInformation'));
  let userInfomation = JSON.parse(localStorage.getItem('userInformation'));
  let token = localStorage.getItem('token');

  useEffect(() => {
    // Ensure username and user data are updated if state changes
  }, [state]);

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setProfilePhoto(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setProfilePhoto(null);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleAddLinkClick = () => {
    setShowLinkForm(true);
    setShowShopForm(false);
  };

  const handleAddShopClick = () => {
    setShowShopForm(true);
    setShowLinkForm(false);
  };

  const handleLinkChange = (e) => {
    const { name, value } = e.target;
    setNewLink({ ...newLink, [name]: value });
  };

  const handleShopChange = (e) => {
    const { name, value } = e.target;
    setNewShop({ ...newShop, [name]: value });
  };

  const handleToggleLink = () => {
    if (newLink.title && newLink.url) {
      setLinks([...links, { ...newLink, enabled: !newLink.enabled }]);
      setNewLink({ title: '', url: '', enabled: false });
      setShowLinkForm(false);
    }
  };

  const handleToggleShop = () => {
    if (newShop.title && newShop.url) {
      setShops([...shops, { ...newShop, enabled: !newShop.enabled }]);
      setNewShop({ title: '', url: '', enabled: false });
      setShowShopForm(false);
    }
  };

  const handleDeleteLink = (index) => {
    setLinks(links.filter((_, i) => i !== index));
  };

  const handleDeleteShop = (index) => {
    setShops(shops.filter((_, i) => i !== index));
  };

  const handleBannerColorChange = (e) => {
    setBannerColor(e.target.value); // Update color immediately when selected
  };

  const handleBannerEnable = () => {
    setIsBannerEnabled(!isBannerEnabled); // Toggle enable/disable to apply or revert to default
  };

  const handleSave = () => {

    if(bio.length > 0 || profilePhoto != null){

      const payload = { 
        firstName:  userInfomation.firstName,
        lastName: userInfomation.lastName, 
        bio:  bio, 
        profilePhoto: "https://www.freepik.com/free-photos-vectors/user-profile", 
        username: userInfomation.username, 
        category:userInfomation.category 
      };

      updateProfile(payload);
    }

    if(links.length > 0 && links !== null && links !== undefined){


    
      const payload = links.map((link) => {
        return {
          title: link.title,
          url: link.url,
          enabled: link.enabled,
          clickCount: links.length,
          lastClicked: new Date().toLocaleDateString()
        };
      });
      const result ={
        links:payload
      }
    
      updateLinks(result);
    }

    if(shops.length > 0 && shops !== null && shops !== undefined){


    
      const payload = shops.map((link) => {
        return {
          title: link.title,
          url: link.url,
          enabled: link.enabled,
          clickCount: shops.length,
          lastClicked: new Date().toLocaleDateString()
        };
      });
      const result ={
        shops:payload
      }
    
      updateShops(result);
    }



    //alert('Profile saved successfully!');
    // Here, you would typically send data to a backend (e.g., Node.js/Express with MongoDB)
  };


  const updateProfile = (payload) => {
    //put api
    fetch("http://localhost:5000/api/profile/basic", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Profile updated successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const updateLinks = (payload) => {
    console.log("links payload", payload);
    //put api
    fetch("http://localhost:5000/api/profile/links", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Links updated successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const updateShops = (payload) => {
    console.log("shops payload", payload);
    //put api
    fetch("http://localhost:5000/api/profile/shops", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("shops updated successfully!");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };



  const getBannerBackgroundColor = () => {
    return isBannerEnabled ? bannerColor : '#000000'; // Use selected color if enabled, default to black if disabled
  };

  return (
    <div className="links-main">
      <div className="links-form-content">
        <div className="profile-photo">
          {profilePhoto ? (
            <img src={profilePhoto} alt="Profile" className="profile-preview" />
          ) : (
            <div className="no-photo">No photo uploaded</div>
          )}
          <label className="upload-button">
            Pick an image
            <input type="file" accept="image/*" onChange={handlePhotoUpload} hidden />
          </label>
          {profilePhoto && <button onClick={handleRemovePhoto}>Remove</button>}
        </div>
        <div className="bio-section">
          <input
            type="text"
            placeholder="Bio"
            value={bio}
            onChange={handleBioChange}
          />
        </div>
        <div className="link-section">
          <button onClick={handleAddLinkClick} className="add-link">Add Link</button>
          <button onClick={handleAddShopClick} className="add-shop">Add Shop</button>
          {showLinkForm && (
            <div className="link-form">
              <input
                type="text"
                name="title"
                placeholder="Link title"
                value={newLink.title}
                onChange={handleLinkChange}
              />
              <input
                type="url"
                name="url"
                placeholder="Link URL"
                value={newLink.url}
                onChange={handleLinkChange}
              />
              <label className="toggle-container">
                <input
                  type="checkbox"
                  checked={newLink.enabled}
                  onChange={() => handleToggleLink()}
                />
                <span className="toggle-switch"></span>
              </label>
              <button onClick={() => handleDeleteLink(links.length)} className="delete-button">🗑️</button>
            </div>
          )}
          {showShopForm && (
            <div className="shop-form">
              <input
                type="text"
                name="title"
                placeholder="Shop title"
                value={newShop.title}
                onChange={handleShopChange}
              />
              <input
                type="url"
                name="url"
                placeholder="Shop URL"
                value={newShop.url}
                onChange={handleShopChange}
              />
              <label className="toggle-container">
                <input
                  type="checkbox"
                  checked={newShop.enabled}
                  onChange={() => handleToggleShop()}
                />
                <span className="toggle-switch"></span>
              </label>
              <button onClick={() => handleDeleteShop(shops.length)} className="delete-button">🗑️</button>
            </div>
          )}
          <div className="saved-links">
            {links.map((link, index) => (
              link.enabled && (
                <div key={index} className="saved-link">
                  <span>{link.title}</span>
                  <span>{link.url}</span>
                  <span>0 clicks</span>
                  <button onClick={() => handleDeleteLink(index)} className="delete-button">🗑️</button>
                </div>
              )
            ))}
            {shops.map((shop, index) => (
              shop.enabled && (
                <div key={index + links.length} className="saved-link">
                  <span>{shop.title}</span>
                  <span>{shop.url}</span>
                  <span>0 clicks</span>
                  <button onClick={() => handleDeleteShop(index)} className="delete-button">🗑️</button>
                </div>
              )
            ))}
          </div>
        </div>
        <div className="banner-section">
          <h3>Banner</h3>
          <div className="banner-preview" style={{ backgroundColor: getBannerBackgroundColor() }}>
            {profilePhoto && <img src={profilePhoto} alt="Profile" className="banner-profile" />}
            <p>@{initialUsername}</p>
          </div>
          <label>Custom Background Color</label>
          <input
            type="color"
            value={bannerColor}
            onChange={handleBannerColorChange}
          />
          <button onClick={handleBannerEnable} className="enable-button">
            {isBannerEnabled ? 'Disable' : 'Enable'}
          </button>
        </div>
        <button onClick={handleSave} className="save-button">Save</button>
      </div>
      <div className="preview-mobile">
        <div className="mobile-screen" style={{ backgroundColor: getBannerBackgroundColor() }}>
          <div className="mobile-header">
            <button>↑</button>
            <img src={profilePhoto || 'https://via.placeholder.com/50'} alt="Profile" className="mobile-profile" />
            <p>@{initialUsername}</p>
          </div>
          <div className="mobile-links">
            <button className="mobile-link active">Link</button>
            <button className="mobile-shop">Shop</button>
            {links.filter(link => link.enabled).map((link, index) => (
              <div key={index} className="mobile-link-item">
                <img src={`https://via.placeholder.com/20?text=${link.title[0]}`} alt={link.title} />
                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.title}</a>
              </div>
            ))}
            {shops.filter(shop => shop.enabled).map((shop, index) => (
              <div key={index + links.length} className="mobile-link-item">
                <img src={`https://via.placeholder.com/20?text=${shop.title[0]}`} alt={shop.title} />
                <a href={shop.url} target="_blank" rel="noopener noreferrer">{shop.title}</a>
              </div>
            ))}
            <div className="mobile-bio">{bio || 'Bio'}</div>
            <button className="mobile-connect">Get Connected</button>
          </div>
          <div className="mobile-footer">SPARK</div>
        </div>
      </div>
    </div>
  );
}

export default Links;