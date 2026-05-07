import React from 'react';
import { Link } from 'react-router-dom';


const AboutPage = () => {
  return (
    <div className="container py-5">
      {/* Header: The Marketplace Concept */}
      <div className="text-center mb-5">
        <h1 className="fw-bold">Your One-Stop Tech Destination</h1>
        <p className="text-muted mx-auto" style={{ maxWidth: '600px' }}>
          We bring the world's leading electronics brands together under one roof. 
          From flagship smartphones to professional home setups, we curate the best gear 
          from the names you trust.
        </p>
      </div>

      {/* 3-Column Simple Grid */}
      <div className="row g-4 mb-5">
        <div className="col-md-4 text-center">
          <div className="p-4 border rounded-3 h-100 bg-light">
            <i className="bi bi-cpu-fill fs-1 text-primary mb-3"></i>
            <h5 className="fw-bold">Multi-Brand Selection</h5>
            <p className="small text-muted mb-0">Authorized dealer for 50+ global electronics companies.</p>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <div className="p-4 border rounded-3 h-100 bg-light">
            <i className="bi bi-shield-check fs-1 text-primary mb-3"></i>
            <h5 className="fw-bold">100% Authentic</h5>
            <p className="small text-muted mb-0">Every product is genuine, sealed, and backed by a full warranty.</p>
          </div>
        </div>
        <div className="col-md-4 text-center">
          <div className="p-4 border rounded-3 h-100 bg-light">
            <i className="bi bi-truck fs-1 text-primary mb-3"></i>
            <h5 className="fw-bold">Fast Fulfillment</h5>
            <p className="small text-muted mb-0">Smart shipping from our local hubs directly to your doorstep.</p>
          </div>
        </div>
      </div>

      {/* Simple CTA Section */}
      <div className="bg-dark text-white rounded-4 p-5 text-center">
        <h2 className="fw-bold">Upgrade Your Experience</h2>
        <p className="mb-4">Shop the latest releases from Apple, Samsung, Sony, and more.</p>
       
<Link to="/" className="btn btn-primary px-5 py-2 fw-bold rounded-pill text-decoration-none">
  Go To Home
</Link>
      </div>
    </div>
  );
};

export default AboutPage;