import React from "react";

//This is the Services page. It lists three services with images and descriptions.
export default function Services() {
  return (
    <div className="services-page">
      <h2>Services I Offer</h2>
      <div className="services-list">
        {/* Web Development service */}
        <div className="service-item">
          <img src="/Service1.jpg" alt="Web Development" style={{width: '250px'}} />
          <h3>Web Development</h3>
          <p>Building responsive and modern websites using React, HTML, CSS, and JavaScript.</p>
        </div>
        {/* General Programming service */}
        <div className="service-item">
          <img src="/Service2.jpg" alt="Programming" style={{width: '100px'}} />
          <h3>General Programming</h3>
          <p>Develop programs, scripts, and problem-solving in Python, JavaScript, and more.</p>
        </div>
        {/* Mobile Apps service */}
        <div className="service-item">
          <img src="/service3.jpg" alt="SQL Database Development" style={{width: '100px'}} />
          <h3>SQL Database Development</h3>
          <p>Designing and developing SQL databases for efficient data storage and retrieval.</p>
        </div>
      </div>
    </div>
  );
}
