import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, RefreshCw, Truck, Award } from 'lucide-react';
import './Footer.scss';

export const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      {/* Brand Value Pillars */}
      <div className="footer-pillars">
        <div className="container pillars-grid">
          <div className="pillar-item">
            <Shield className="pillar-icon" size={28} />
            <div>
              <h4 className="pillar-title">Engineered Lifetime Integrity</h4>
              <p className="pillar-desc">Multi-year comprehensive manufacturer craftsmanship warranty.</p>
            </div>
          </div>

          <div className="pillar-item">
            <Truck className="pillar-icon" size={28} />
            <div>
              <h4 className="pillar-title">Free Express Dispatch</h4>
              <p className="pillar-desc">Complimentary shipping on all cart totals exceeding ₹999.</p>
            </div>
          </div>

          <div className="pillar-item">
            <RefreshCw className="pillar-icon" size={28} />
            <div>
              <h4 className="pillar-title">Hassle-Free 14-Day Returns</h4>
              <p className="pillar-desc">Instant doorstep pickup with zero interrogation refund policies.</p>
            </div>
          </div>

          <div className="pillar-item">
            <Award className="pillar-icon" size={28} />
            <div>
              <h4 className="pillar-title">Ergonomic Certified</h4>
              <p className="pillar-desc">Endorsed by spinal health experts for safe everyday student load bearing.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="footer-main">
        <div className="container footer-grid">
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo">
              <span className="logo-main">VELO</span>
              <span className="logo-sub">&amp; CO.</span>
            </Link>
            <p className="brand-manifesto">
              Architectural carry gear engineered for modern academics, corporate leaders, and global nomads. Designed with military-grade resilience and understated luxury.
            </p>
            <div className="newsletter-box">
              <p className="newsletter-title">The Velocity Dispatch</p>
              <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to VIP dispatch!'); }} className="newsletter-form">
                <input type="email" placeholder="Enter your corporate or personal email" required />
                <button type="submit" className="newsletter-btn" aria-label="Subscribe">
                  <ArrowRight size={18} />
                </button>
              </form>
            </div>
          </div>

          <div className="footer-links-col">
            <h5 className="footer-col-title">School &amp; Academic</h5>
            <ul>
              <li><Link to="/category/school-bags">Ergonomic School Backpacks</Link></li>
              <li><Link to="/category/school-bags">Junior Explorer Kids Packs</Link></li>
              <li><Link to="/category/school-bags">Water-Resistant Tiffin Sleeves</Link></li>
              <li><Link to="/category/school-bags">High-Reflectivity Safety Bags</Link></li>
              <li><Link to="/category/school-bags">Large Capacity High-School Packs</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h5 className="footer-col-title">Work &amp; Executive</h5>
            <ul>
              <li><Link to="/category/laptop-bags">15.6" Anti-Theft Tech Packs</Link></li>
              <li><Link to="/category/office-bags">Tuscan Leather Briefcases</Link></li>
              <li><Link to="/category/office-bags">Urban Messenger Bags</Link></li>
              <li><Link to="/category/laptop-bags">TSA Checkpoint Clamshell Packs</Link></li>
              <li><Link to="/category/accessories">Modular Tech Organizers</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h5 className="footer-col-title">Travel &amp; Lifestyle</h5>
            <ul>
              <li><Link to="/category/travel-bags">Cabin Polycarbonate Spinners</Link></li>
              <li><Link to="/category/duffle-bags">Expandable Weekender Duffles</Link></li>
              <li><Link to="/category/handbags">Sculpted Architectural Totes</Link></li>
              <li><Link to="/category/sling-bags">AeroFlex Modular Crossbody</Link></li>
              <li><Link to="/category/accessories">Slim RFID Bifold Wallets</Link></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h5 className="footer-col-title">Customer Care</h5>
            <ul>
              <li><Link to="/about">About Us &amp; Craftsmanship</Link></li>
              <li><Link to="/contact">Contact Us &amp; Concierge</Link></li>
              <li><Link to="/track-order/VLO-88219">Track Order Consignment</Link></li>
              <li><Link to="/account/returns">Returns &amp; Replacement</Link></li>
              <li><Link to="/faq">Warranty Registration</Link></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container bottom-inner">
          <p className="copyright">
            &copy; {new Date().getFullYear()} VELO &amp; CO. Carry Systems Ltd. All intellectual property reserved.
          </p>
          <div className="bottom-meta-links">
            <Link to="/about">About</Link>
            <span className="dot">•</span>
            <Link to="/contact">Contact</Link>
            <span className="dot">•</span>
            <Link to="/faq">Privacy Policy</Link>
            <span className="dot">•</span>
            <Link to="/faq">Terms of Service</Link>
            <span className="dot">•</span>
            <Link to="/faq">Security Standards</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

