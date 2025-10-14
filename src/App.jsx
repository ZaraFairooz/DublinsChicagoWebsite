import './App.css'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <img src="/Pics/3.png" alt="Boss Fired Me Logo" className="brand-icon" />
          Boss Fired Me
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="nav desktop-nav">
          <Link to="/#services">Services</Link>
          <Link to="/#how-it-works">How it works</Link>
          <Link to="/#faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
          <Link className="btn btn-primary" to="/employment-case-form">Get Started</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>

        {/* Mobile Navigation */}
        <nav className={`nav mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
          <Link to="/#services" onClick={closeMobileMenu}>Services</Link>
          <Link to="/#how-it-works" onClick={closeMobileMenu}>How it works</Link>
          <Link to="/#faq" onClick={closeMobileMenu}>FAQ</Link>
          <Link to="/contact" onClick={closeMobileMenu}>Contact</Link>
          <Link className="btn btn-primary" to="/employment-case-form" onClick={closeMobileMenu}>Get Started</Link>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="/Pics/vid2.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
      <div className="container hero-inner">
        <img src="/Pics/3.png" alt="Boss Fired Me Logo" className="hero-logo" />
        <h1 className="hero-title">No Fees, Unless You Win</h1>
        <p className="subtitle">Wrongfully terminated or mistreated at work? We connect you with employment attorneys who can help.</p>
        <Link className="btn btn-accent" to="/employment-case-form">Start your case</Link>
      </div>
    </section>
  )
}

function Steps() {
  const stepRefs = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
      rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const rect = entry.boundingClientRect;
        const viewportHeight = window.innerHeight;
        
        // Calculate how much of the element is visible
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const elementHeight = rect.height;
        
        // Calculate visibility percentage
        let visibilityRatio = 0;
        if (elementTop < viewportHeight && elementBottom > 0) {
          const visibleTop = Math.max(0, elementTop);
          const visibleBottom = Math.min(viewportHeight, elementBottom);
          const visibleHeight = visibleBottom - visibleTop;
          visibilityRatio = Math.max(0, Math.min(1, visibleHeight / elementHeight));
        }
        
        // Apply animation based on visibility
        if (visibilityRatio > 0.1) {
          entry.target.classList.add('animate-in');
          entry.target.style.setProperty('--visibility-ratio', visibilityRatio);
        } else {
          entry.target.classList.remove('animate-in');
          entry.target.style.setProperty('--visibility-ratio', 0);
        }
      });
    }, observerOptions);

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      stepRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate visibility based on scroll position
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const elementHeight = rect.height;
        
        // Calculate how much of the element is visible
        let visibilityRatio = 0;
        if (elementTop < viewportHeight && elementBottom > 0) {
          const visibleTop = Math.max(0, elementTop);
          const visibleBottom = Math.min(viewportHeight, elementBottom);
          const visibleHeight = visibleBottom - visibleTop;
          visibilityRatio = Math.max(0, Math.min(1, visibleHeight / elementHeight));
        }
        
        // Apply opacity and scale based on visibility
        const opacity = visibilityRatio > 0.1 ? visibilityRatio : 0;
        const scale = 0.8 + (visibilityRatio * 0.2); // Scale from 0.8 to 1.0
        
        titleRef.current.style.opacity = opacity;
        titleRef.current.style.transform = `scale(${scale})`;
      }
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="how-it-works" className="section steps">
      <div className="container">
        <div className="layout">
          <div className="left">
            <h2 ref={titleRef}>Three Easy Steps</h2>
            <div className="grid three">
              <div 
                ref={(el) => stepRefs.current[0] = el}
                className="card step animate-card"
              >
                <div className="step-num">1</div>
                <div className="step-content">
                  <div className="step-text">
                    <h3>Tell us what happened</h3>
                    <p>Share the basics about your job, what happened, and when. We are here to hear you and help you.</p>
                  </div>
                  <div className="step-image">
                    <img src="/Pics/complaint.gif" alt="Complaint illustration" />
                  </div>
                </div>
              </div>
              <div 
                ref={(el) => stepRefs.current[1] = el}
                className="card step animate-card"
              >
                <div className="step-num">2</div>
                <div className="step-content">
                  <div className="step-image">
                    <img src="/Pics/lawyerMatch.gif" alt="Lawyer match illustration" />
                  </div>
                  <div className="step-text">
                    <h3>Get matched with a lawyer</h3>
                    <p>We find you the best employment attorney that matches exactly what you need.</p>
                  </div>
                </div>
              </div>
              <div 
                ref={(el) => stepRefs.current[2] = el}
                className="card step animate-card"
              >
                <div className="step-num">3</div>
                <div className="step-content">
                  <div className="step-text">
                    <h3>Move forward with confidence</h3>
                    <p>You relax and we handle the rest.</p>
                  </div>
                  <div className="step-image">
                    <img src="/Pics/like.gif" alt="Like illustration" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const serviceRefs = useRef([]);
  const titleRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 0.9, 1],
      rootMargin: '0px 0px -20px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const rect = entry.boundingClientRect;
        const viewportHeight = window.innerHeight;
        
        // Calculate how much of the element is visible
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const elementHeight = rect.height;
        
        // Calculate visibility percentage
        let visibilityRatio = 0;
        if (elementTop < viewportHeight && elementBottom > 0) {
          const visibleTop = Math.max(0, elementTop);
          const visibleBottom = Math.min(viewportHeight, elementBottom);
          const visibleHeight = visibleBottom - visibleTop;
          visibilityRatio = Math.max(0, Math.min(1, visibleHeight / elementHeight));
        }
        
        // Apply animation based on visibility
        if (visibilityRatio > 0.1) {
          entry.target.classList.add('animate-in');
          entry.target.style.setProperty('--visibility-ratio', visibilityRatio);
        } else {
          entry.target.classList.remove('animate-in');
          entry.target.style.setProperty('--visibility-ratio', 0);
        }
      });
    }, observerOptions);

    serviceRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      serviceRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate visibility based on scroll position
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const elementHeight = rect.height;
        
        // Calculate how much of the element is visible
        let visibilityRatio = 0;
        if (elementTop < viewportHeight && elementBottom > 0) {
          const visibleTop = Math.max(0, elementTop);
          const visibleBottom = Math.min(viewportHeight, elementBottom);
          const visibleHeight = visibleBottom - visibleTop;
          visibilityRatio = Math.max(0, Math.min(1, visibleHeight / elementHeight));
        }
        
        // Apply opacity and scale based on visibility
        const opacity = visibilityRatio > 0.1 ? visibilityRatio : 0;
        const scale = 0.8 + (visibilityRatio * 0.2); // Scale from 0.8 to 1.0
        
        titleRef.current.style.opacity = opacity;
        titleRef.current.style.transform = `scale(${scale})`;
      }
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="services" className="section services">
      <div className="container">
        <h2 ref={titleRef}>We Help With Tough Work Situations</h2>
        <div className="grid three">
          <div 
            ref={(el) => serviceRefs.current[0] = el}
            className="card service animate-service-card"
          >
            <h3>Wrongful Termination</h3>
            <p>Fired unfairly or without cause? Learn your rights and options.</p>
          </div>
          <div 
            ref={(el) => serviceRefs.current[1] = el}
            className="card service animate-service-card"
          >
            <h3>Discrimination</h3>
            <p>Race, gender, age, disability, pregnancy—discrimination is illegal.</p>
          </div>
          <div 
            ref={(el) => serviceRefs.current[2] = el}
            className="card service animate-service-card"
          >
            <h3>Harassment</h3>
            <p>Hostile work environment or harassment from a manager or coworker.</p>
          </div>
          <div 
            ref={(el) => serviceRefs.current[3] = el}
            className="card service animate-service-card"
          >
            <h3>Retaliation</h3>
            <p>Demoted or fired after reporting misconduct or taking protected leave.</p>
          </div>
          <div 
            ref={(el) => serviceRefs.current[4] = el}
            className="card service animate-service-card"
          >
            <h3>Wage & Hour</h3>
            <p>Unpaid wages, overtime issues, misclassification, or missed breaks.</p>
          </div>
          <div 
            ref={(el) => serviceRefs.current[5] = el}
            className="card service animate-service-card"
          >
            <h3>Family Medical Leave</h3>
            <p>Protected leave for family or medical reasons—know your rights.</p>
          </div>
        </div>
      </div>
    </section>
  )
}


function FAQ() {
  const titleRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (titleRef.current) {
        const rect = titleRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate visibility based on scroll position
        const elementTop = rect.top;
        const elementBottom = rect.bottom;
        const elementHeight = rect.height;
        
        // Calculate how much of the element is visible
        let visibilityRatio = 0;
        if (elementTop < viewportHeight && elementBottom > 0) {
          const visibleTop = Math.max(0, elementTop);
          const visibleBottom = Math.min(viewportHeight, elementBottom);
          const visibleHeight = visibleBottom - visibleTop;
          visibilityRatio = Math.max(0, Math.min(1, visibleHeight / elementHeight));
        }
        
        // Apply opacity and scale based on visibility
        const opacity = visibilityRatio > 0.1 ? visibilityRatio : 0;
        const scale = 0.8 + (visibilityRatio * 0.2); // Scale from 0.8 to 1.0
        
        titleRef.current.style.opacity = opacity;
        titleRef.current.style.transform = `scale(${scale})`;
      }
    };

    // Initial check
    handleScroll();
    
    // Add scroll listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section id="faq" className="section faq">
      <div className="container">
        <h2 ref={titleRef}>Frequently Asked <span className="gradient-text">Questions</span></h2>
        <div className="faq-content">
          <details>
            <summary>Do I have to pay anything upfront?</summary>
            <p>Using Boss Fired Me is free. Your attorney will explain their fees if you choose to proceed.</p>
          </details>
          <details>
            <summary>How fast can I speak with a lawyer?</summary>
            <p>Many people are matched within 24–48 hours, and urgent cases can be faster.</p>
          </details>
          <details>
            <summary>What if I'm not sure what kind of case I have?</summary>
            <p>That's okay. Share what happened and we'll point you in the right direction.</p>
          </details>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <video className="footer-video" autoPlay muted loop playsInline>
        <source src="/Pics/vid2.mp4" type="video/mp4" />
      </video>
      <div className="footer-overlay"></div>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <img src="/Pics/3.png" alt="Boss Fired Me Logo" className="footer-logo" />
            <div className="brand">Boss Fired Me</div>
            <div className="muted">© {new Date().getFullYear()} Boss Fired Me. All rights reserved.</div>
          </div>
          
          <div className="footer-section">
            <h3>Contact</h3>
            <div className="contact-buttons">
              <a href="mailto:example@bossfiredme.com" className="contact-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                example@bossfiredme.com
              </a>
              <a href="tel:+1234567890" className="contact-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                (123) 456-7890
              </a>
            </div>
          </div>
          
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-buttons">
              <a href="https://linkedin.com/company/bossfiredme" className="social-btn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn
              </a>
              <a href="https://instagram.com/bossfiredme" className="social-btn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                Instagram
              </a>
              <a href="https://facebook.com/bossfiredme" className="social-btn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                Facebook
              </a>
              <a href="https://tiktok.com/@bossfiredme" className="social-btn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                TikTok
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    const onScroll = () => {
      const max = 240;
      const y = Math.min(window.scrollY, max);
      const t = y / max;
      const scale = 1 - t * 0.4; // 1 -> 0.6
      const opacity = 1 - t * 0.25; // 1 -> 0.75
      document.documentElement.style.setProperty('--hero-scale', String(scale));
      document.documentElement.style.setProperty('--hero-opacity', String(opacity));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <Hero />
      <Steps />
      <Services />
      <FAQ />
    </>
  )
}
