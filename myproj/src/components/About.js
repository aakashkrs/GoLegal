import React from 'react'; 
import '../css/style.css';

const AboutUsComponent = () => {
  return (
    <section className="about-us">
      {/* Section 1 */}
      <div className="about-intro">
        <div className="intro-image">
          <img src="img/Designer1.jpeg" alt="Law Image" />
        </div> {/* Placeholder for image */}
        <div className="intro-content">
          <h2>About Us</h2>
          <h1>Go Legal & Advocates Law Firm</h1>
          <p className="main-text">
            At Go Legal & Advocates, we understand that legal matters can be complex and overwhelming. That's why we're here to provide you with straightforward and effective legal solutions tailored to your needs.
          </p>
          <blockquote>
            <p className="quote">"Your journey to legal clarity starts here."</p>
          </blockquote>
          <p className="sub-text">
            With a team of experienced attorneys and advocates, we offer a wide range of legal services, including but not limited to family law, criminal defense, civil litigation, corporate law, and immigration law.
          </p>
          <button className="learn-more">AT YOUR SERVICE</button>
        </div>
      </div>

      {/* Section 2 */}
      <div className="about-stats">
        <div className="stat-item">
          <h3>3200+</h3>
          <p>Lawyers across our global network.</p>
        </div>
        <div className="stat-item">
          <h3>5000+</h3>
          <p>Cases handled annually.</p>
        </div>
        <div className="stat-item">
          <h3>100+</h3>
          <p>Countries we operate in globally.</p>
        </div>
      </div>

      {/* Section 3 */}
      <div className="contact-us">
        <div className="contact-image">
          <img src="img/Designer2.jpeg" alt="Contact Image" />
        </div> {/* Placeholder for image */}
        <div className="contact-content">
        <h2>Are You Looking for Help From a Lawyer?</h2>
<p>Our mission is to make the legal process as smooth and hassle-free as possible for our clients. We prioritize clear communication, personalized attention, and practical advice to help you achieve your legal goals.</p>
<p>Contact us today to schedule a consultation and discover how we can assist you with your legal needs. You can rely on Go Legal & Advocates to advocate for your rights and protect your interests.</p>
<p>Whether you're dealing with a legal dispute or simply seeking proactive guidance, our experienced team is here to provide the support you need. We offer tailored legal strategies to suit your unique circumstances and ensure you’re fully informed at every stage.</p>
<a href="/Contact" class="nav-item nav-link">
  <button className="contact-button">Contact Us</button>
</a>

          
        </div>
      </div>
    </section>
  );
};

export default AboutUsComponent;
