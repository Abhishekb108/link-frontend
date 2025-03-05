import './LandingPage.css';

import image2 from '../images/image2.jpg';
import image3 from '../images/image3.jpg';
import image4 from '../images/image4.jpg';
import image5 from '../images/image5.jpg';
import image6 from '../images/image6.jpg';
import image7 from '../images/image7.jpg';
import image8 from '../images/image8.jpg';
import image9 from '../images/image9.jpg';
import image10 from '../images/image10.jpg';
import image11 from '../images/image11.jpg';
import image12 from '../images/image12.jpg';

function LandingPage() {
  return (
    <div className="landing-page">
      <header>
        <nav className="nav">
          <h1>SPARKlink</h1>
          <a href="/signup" className="signup-link">Sign Up</a>
        </nav>
      </header>
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <h2>The easiest place to connect and share your followers on the internet</h2>
          <div className="hero-images">
            
            <img src={image2} alt="Analytics Chart" className="hero-image" />
          </div>
        </section>

        {/* Analyze Audience Section */}
        <section className="analyze-section">
          <h3>Analyze your audience and keep your followers engaged</h3>
          <img src={image3} alt="Audience Analysis" className="section-image" />
        </section>

        {/* Share Content Section */}
        <section className="share-section">
          <h3>Share limitless content in limitless ways</h3>
          <div className="share-images">
            <img src={image4} alt="Content" className="share-image" />
            <img src={image5} alt="Content" className="share-image" />
            <img src={image6} alt="Content" className="share-image" />
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="testimonials-section">
          <h3>Here’s what our customers have to say</h3>
          <div className="testimonials">
            <div className="testimonial">
              <img src="https://via.placeholder.com/50" alt="Customer 1 Avatar" className="avatar" />
              <p>“Amazing tool! Saved me months of work.” – Jane Doe</p>
            </div>
            <div className="testimonial">
              <img src="https://via.placeholder.com/50" alt="Customer 2 Avatar" className="avatar" />
              <p>“A fantastic tool that boosted my engagement.” – John Smith</p>
            </div>
          </div>
        </section>

        {/* Integrations Section */}
        <section className="integrations-section">
          <h3>All Link Apps and Integrations</h3>
          <div className="integrations">
            <img src={image7} alt="Integration" className="integration-icon image7" />
            <img src={image8} alt="Integration" className="integration-icon" />
            <img src={image9} alt="Integration" className="integration-icon" />
            <img src={image10} alt="Integration" className="integration-icon" />
            <img src={image11} alt="Integration" className="integration-icon" />
            <img src={image12} alt="Integration" className="integration-icon" />
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-links">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <div className="social-icons">
            <img src="https://via.placeholder.com/30" alt="Twitter" className="social-icon" />
            <img src="https://via.placeholder.com/30" alt="Instagram" className="social-icon" />
            <img src="https://via.placeholder.com/30" alt="Facebook" className="social-icon" />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;