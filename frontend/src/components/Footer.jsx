import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-3">
      <div className="container">
        <div className="row g-4">
          
          {/* Brand & Mission */}
          <div className="col-lg-4 col-md-6">
            <h5 className="fw-bold mb-3 text-primary">e-com</h5>
            <p className="text-secondary small">
              Your trusted marketplace for authentic electronics. We bring together the world's 
              leading tech brands to provide a seamless shopping experience for enthusiasts and professionals alike.
            </p>
            <div className="d-flex gap-3 mt-4">
              <a href="#" className="text-secondary fs-5"><i className="bi bi-facebook"></i></a>
              <a href="#" className="text-secondary fs-5"><i className="bi bi-instagram"></i></a>
              <a href="#" className="text-secondary fs-5"><i className="bi bi-twitter-x"></i></a>
              <a href="#" className="text-secondary fs-5"><i className="bi bi-linkedin"></i></a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3">Shop Categories</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/" className="text-secondary text-decoration-none hover-white">Laptops & PCs</Link></li>
              <li className="mb-2"><Link to="/" className="text-secondary text-decoration-none hover-white">Smartphones</Link></li>
              <li className="mb-2"><Link to="/" className="text-secondary text-decoration-none hover-white">Audio & Sound</Link></li>
              <li className="mb-2"><Link to="/" className="text-secondary text-decoration-none hover-white">Wearables</Link></li>
            </ul>
          </div>

          {/* Support Links */}
          <div className="col-lg-2 col-md-6">
            <h6 className="fw-bold mb-3">Customer Support</h6>
            <ul className="list-unstyled small">
              <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none">About Us</Link></li>
              <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none">Shipping Policy</Link></li>
              <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none">Returns & Refunds</Link></li>
              <li className="mb-2"><Link to="/about" className="text-secondary text-decoration-none">FAQs</Link></li>
            </ul>
          </div>

          {/* Newsletter / Contact */}
         

        </div>

        <hr className="my-4 border-secondary opacity-25" />

        {/* Bottom Bar: Payments & Copyright */}
        <div className="row align-items-center">
          <div className="col-md-6 text-center text-md-start">
            <p className="small text-secondary mb-0">
              © 2026 e-com. All rights reserved.
            </p>
          </div>
         
        </div>
      </div>

      <style>{`
        .hover-white:hover {
          color: white !important;
          transition: 0.2s ease;
        }
      `}</style>
    </footer>
  );
};

export default Footer;