import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Clock, 
  Send, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Sparkles,
  ShieldCheck,
  Building2,
  Calendar
} from 'lucide-react';
import './ContactPage.scss';

export const ContactPage: React.FC = () => {
  // Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    inquiryType: 'Order Status & Tracking',
    orderId: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setTicketId(`VLO-CARE-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 900);
  };

  const faqs = [
    {
      q: 'What is covered under the VELO Lifetime Craftsmanship Warranty?',
      a: 'Our warranty guarantees every seam, stitch line, YKK® AquaGuard® zipper track, and forged aluminum buckle against manufacturing structural defects for the natural lifetime of the product. Normal aesthetic wear (like leather patina) is excluded.'
    },
    {
      q: 'Can I schedule a private ergonomic backpack fitting for my child?',
      a: 'Yes, absolutely. Our Mumbai, Bengaluru, and New Delhi flagship studios offer complimentary 20-minute spinal posture fittings where our carrying specialists calibrate strap tension, chest sternum height, and load distribution for your child’s height and textbook weight.'
    },
    {
      q: 'What are your standard and priority air shipping timelines?',
      a: 'Orders placed before 2:00 PM IST dispatch the same day. Standard surface shipping reaches metropolitan cities in 2 to 4 business days. Priority Air Express delivers within 24 to 48 hours nationwide.'
    },
    {
      q: 'Do you offer bespoke corporate gifting and blind debossing?',
      a: 'Yes. For corporate consignments starting from 15 units, our master craftsmen offer hot foil stamping, debossing company crests or executive initials on leather patches, and tailored presentation packaging.'
    },
    {
      q: 'How does the 14-day doorstep return and exchange process work?',
      a: 'If you wish to return an unused item in its original dust bag, simply submit a request via your Account Dashboard or message our Concierge. Our logistics partner collects the parcel from your doorstep with zero return shipping fees.'
    }
  ];

  return (
    <div className="contact-page">
      {/* 1. HERO HEADER */}
      <section className="contact-hero">
        <div className="container">
          <div className="hero-content text-center">
            <span className="hero-eyebrow">CONCIERGE &amp; CLIENT SERVICES</span>
            <h1 className="hero-title">At Your Service. Worldwide.</h1>
            <p className="hero-subtitle">
              Whether you need guidance on laptop sizing, require warranty maintenance, or wish to schedule a bespoke consultation, our carrying specialists are standing by.
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="quick-contact-grid">
            <div className="quick-card">
              <div className="icon-wrapper">
                <Phone size={24} />
              </div>
              <h3>Direct Telephone</h3>
              <p className="primary-text">+91 (800) 835-6260</p>
              <span className="sub-text">Mon–Sat, 9:00 AM – 8:00 PM IST</span>
            </div>

            <div className="quick-card">
              <div className="icon-wrapper">
                <Mail size={24} />
              </div>
              <h3>Electronic Concierge</h3>
              <p className="primary-text">concierge@velo-co.com</p>
              <span className="sub-text">Average response time: &lt; 2 hours</span>
            </div>

            <div className="quick-card">
              <div className="icon-wrapper">
                <MessageSquare size={24} />
              </div>
              <h3>WhatsApp VIP Desk</h3>
              <p className="primary-text">+91 98765 43210</p>
              <span className="sub-text">
                <span className="live-dot" /> Live Advisor Available
              </span>
            </div>

            <div className="quick-card">
              <div className="icon-wrapper">
                <Building2 size={24} />
              </div>
              <h3>Flagship Ateliers</h3>
              <p className="primary-text">3 Experience Hubs</p>
              <span className="sub-text">Mumbai • Bengaluru • New Delhi</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. MAIN FORM & SHOWROOM DETAILS */}
      <section className="contact-main-section">
        <div className="container">
          <div className="contact-split-grid">
            {/* Form Column */}
            <div className="form-column">
              <div className="form-card">
                {isSubmitted ? (
                  <div className="success-state">
                    <div className="success-icon-wrapper">
                      <CheckCircle2 size={44} className="text-emerald" />
                    </div>
                    <span className="success-tag">INQUIRY LOGGED</span>
                    <h2 className="success-title">Thank You. Your Request is Under Care.</h2>
                    <p className="success-desc">
                      A senior client concierge specialist has been assigned to your inquiry and will reach out via email or phone within 2 hours.
                    </p>
                    <div className="ticket-badge">
                      <span>Assigned Case Reference:</span>
                      <strong>{ticketId}</strong>
                    </div>
                    <button 
                      type="button" 
                      className="btn btn-secondary mt-4" 
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          firstName: '',
                          lastName: '',
                          email: '',
                          phone: '',
                          inquiryType: 'Order Status & Tracking',
                          orderId: '',
                          message: ''
                        });
                      }}
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="form-header">
                      <span className="form-eyebrow">ELECTRONIC DOSSIER</span>
                      <h2 className="form-title">Send a Dedicated Message</h2>
                      <p className="form-subtitle">
                        Please provide your details below and select your inquiry type.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="concierge-form">
                      <div className="form-row dual">
                        <div className="form-group">
                          <label htmlFor="firstName">First Name *</label>
                          <input 
                            id="firstName"
                            type="text" 
                            required 
                            placeholder="e.g. Vikram"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="lastName">Last Name *</label>
                          <input 
                            id="lastName"
                            type="text" 
                            required 
                            placeholder="e.g. Mehta"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-row dual">
                        <div className="form-group">
                          <label htmlFor="email">Email Address *</label>
                          <input 
                            id="email"
                            type="email" 
                            required 
                            placeholder="vikram@example.com"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          />
                        </div>

                        <div className="form-group">
                          <label htmlFor="phone">Phone / Mobile *</label>
                          <input 
                            id="phone"
                            type="tel" 
                            required 
                            placeholder="+91 98765 00000"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-row dual">
                        <div className="form-group">
                          <label htmlFor="inquiryType">Inquiry Subject *</label>
                          <select 
                            id="inquiryType"
                            value={formData.inquiryType}
                            onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                          >
                            <option value="Order Status & Tracking">Order Status &amp; Consignment Tracking</option>
                            <option value="School Bag Sizing Consultation">Ergonomic School Bag Sizing &amp; Fitting</option>
                            <option value="Corporate Gifting & B2B">Corporate Bulk &amp; Bespoke Monogramming</option>
                            <option value="Warranty & Atelier Repair">Warranty Claim &amp; Hardware Repair</option>
                            <option value="Private Showroom Appointment">Private Showroom Appointment</option>
                            <option value="Press & Strategic Partnerships">Press &amp; Strategic Partnerships</option>
                          </select>
                        </div>

                        <div className="form-group">
                          <label htmlFor="orderId">Order Reference (Optional)</label>
                          <input 
                            id="orderId"
                            type="text" 
                            placeholder="e.g. VLO-88219"
                            value={formData.orderId}
                            onChange={(e) => setFormData({ ...formData, orderId: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label htmlFor="message">Detailed Message *</label>
                        <textarea 
                          id="message"
                          rows={5} 
                          required 
                          placeholder="How may our carrying specialists assist you today?"
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="btn btn-primary submit-btn" 
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <>
                            <span className="spinner" />
                            Transmitting Dispatch...
                          </>
                        ) : (
                          <>
                            Transmitting To Concierge
                            <Send size={16} />
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

            {/* Atelier & Operating Hours Column */}
            <div className="info-column">
              <div className="hours-card">
                <div className="card-badge">
                  <Clock size={16} />
                  <span>CONCIERGE HOURS</span>
                </div>
                <h3>Standard Operating Windows</h3>
                <div className="schedule-list">
                  <div className="schedule-row">
                    <span className="day">Monday – Friday</span>
                    <span className="hours">09:00 AM – 08:00 PM IST</span>
                  </div>
                  <div className="schedule-row">
                    <span className="day">Saturday</span>
                    <span className="hours">10:00 AM – 06:00 PM IST</span>
                  </div>
                  <div className="schedule-row">
                    <span className="day">Sunday &amp; Gazetted Holidays</span>
                    <span className="hours">Priority WhatsApp Only</span>
                  </div>
                </div>
              </div>

              {/* Showrooms List */}
              <div className="showrooms-card">
                <h3>Flagship Experience Studios</h3>
                <div className="showroom-item">
                  <div className="city-header">
                    <h4>Bandra Kurla Complex (BKC)</h4>
                    <span className="badge">Mumbai</span>
                  </div>
                  <p className="address">
                    Unit 402, G Block, BKC Financial Center, Mumbai, Maharashtra 400051
                  </p>
                  <p className="phone">Tel: +91 (22) 6790-4100</p>
                </div>

                <div className="showroom-item">
                  <div className="city-header">
                    <h4>Indiranagar Atelier</h4>
                    <span className="badge">Bengaluru</span>
                  </div>
                  <p className="address">
                    742, 100 Feet Road, HAL 2nd Stage, Indiranagar, Bengaluru, Karnataka 560038
                  </p>
                  <p className="phone">Tel: +91 (80) 4120-8800</p>
                </div>

                <div className="showroom-item">
                  <div className="city-header">
                    <h4>The Chanakya Diplomatic Hub</h4>
                    <span className="badge">New Delhi</span>
                  </div>
                  <p className="address">
                    Level 1, The Chanakya, Yashwant Place, Chanakyapuri, New Delhi 110021
                  </p>
                  <p className="phone">Tel: +91 (11) 2688-9920</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FREQUENTLY ASKED QUESTIONS */}
      <section className="contact-faq-section">
        <div className="container">
          <div className="section-header text-center">
            <span className="section-eyebrow">COMMON QUERIES</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-subtitle">
              Immediate answers regarding product care, warranties, and dispatch timelines.
            </p>
          </div>

          <div className="faq-accordion-container">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div key={index} className={`faq-card ${isOpen ? 'open' : ''}`}>
                  <button 
                    type="button" 
                    className="faq-question-btn" 
                    onClick={() => toggleFaq(index)}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </button>
                  {isOpen && (
                    <div className="faq-answer-pane">
                      <p>{faq.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

