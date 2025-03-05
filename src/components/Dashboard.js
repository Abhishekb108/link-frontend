import './Dashboard.css';
import { Routes, Route, Link, Outlet, useLocation } from 'react-router-dom';
import Links from './Links.js';
import Appearance from './Appearance.js';
import Settings from './Settings.js';

function Dashboard() {
  const location = useLocation();
  const { state: linksState } = location; // Get state from Links if available

  // Safely handle username splitting or use defaults from state
  const username = linksState?.username || 'Jenny Wilson';
  const [firstName, lastName] = username.split(' ') || ['Jenny', 'Wilson'];
  const email = linksState?.email || 'JennyWilson08@gmail.com';

  return (
    <div className="dashboard-page">
      <div className="dashboard-content">
        <div className="dashboard-nav">
          <div className="logo">SPARK</div>
          <h2>Hi, {username || '[User Name]'}!</h2> {/* Use username or default */}
          <p>Congratulations. You got a great response today.</p>
          <nav>
            <Link to="/dashboard/links" className="nav-link">Links</Link>
            <Link
              to="/dashboard/appearance"
              className="nav-link"
              state={{
                username: username,
                bio: linksState?.bio || '',
                profilePhoto: linksState?.profilePhoto || null,
                links: linksState?.links || [],
                shops: linksState?.shops || [],
              }}
            >
              Appearance
            </Link>
            <Link to="/dashboard/analytics" className="nav-link">Analytics</Link>
            <Link
              to="/dashboard/settings"
              className="nav-link"
              state={{
                firstName: firstName,
                lastName: lastName,
                email: email,
              }}
            >
              Settings
            </Link>
          </nav>
        </div>
        <div className="dashboard-main">
          <Routes>
            <Route path="/links" element={<Links />} />
            <Route path="/appearance" element={<Appearance />} />
            <Route path="/analytics" element={<div>Analytics Page (Coming Soon)</div>} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;