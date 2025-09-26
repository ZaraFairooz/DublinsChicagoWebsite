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
        <Link to="/" className="brand">Boss Fired Me</Link>
        
        {/* Desktop Navigation */}
        <nav className="nav desktop-nav">
          <Link to="/#services">Services</Link>
          <Link to="/#how-it-works">How it works</Link>
          <Link to="/#faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
          <a className="btn btn-primary" href="#get-started">Get Started</a>
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
          <a className="btn btn-primary" href="#get-started" onClick={closeMobileMenu}>Get Started</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <h1 className="hero-title">No fees, unless you win</h1>
        <p className="subtitle">Wrongfully terminated or mistreated at work? We connect you with employment attorneys who can help.</p>
        <a className="btn btn-accent" href="#get-started">Start your case</a>
      </div>
    </section>
  )
}

function Steps() {
  const stepRefs = useRef([]);
  const lastScrollY = useRef(0);
  const arrowRef = useRef(null);

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
    let stepsSection = null;
    let sectionTop = 0;
    let sectionHeight = 0;
    let viewportHeight = window.innerHeight;

    // Cache section data for better performance
    const updateSectionData = () => {
      stepsSection = document.getElementById('how-it-works');
      if (stepsSection) {
        sectionTop = stepsSection.offsetTop;
        sectionHeight = stepsSection.offsetHeight;
        viewportHeight = window.innerHeight;
      }
    };

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';
      
          if (arrowRef.current) {
            arrowRef.current.setAttribute('data-direction', scrollDirection);
            
            // Use cached section data for better performance
            if (stepsSection) {
              // Calculate when section starts being visible
              const sectionStart = sectionTop - viewportHeight;
              // Calculate when section ends being visible
              const sectionEnd = sectionTop + sectionHeight;
              
              // Calculate progress from section start to end
              let scrollProgress = 0;
              if (currentScrollY >= sectionStart && currentScrollY <= sectionEnd) {
                scrollProgress = (currentScrollY - sectionStart) / (sectionEnd - sectionStart);
              } else if (currentScrollY > sectionEnd) {
                scrollProgress = 1;
              }
              
              arrowRef.current.style.setProperty('--scroll-progress', Math.max(0, Math.min(1, scrollProgress)));
            } else {
              // Fallback to general scroll progress
              arrowRef.current.style.setProperty('--scroll-progress', Math.min(currentScrollY / 1000, 1));
            }
          }
      
      lastScrollY.current = currentScrollY;
    };

    // Initial setup
    updateSectionData();
    handleScroll();

    // Listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', updateSectionData, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', updateSectionData);
    };
  }, []);

  return (
    <section id="how-it-works" className="section steps">
      <div className="container">
        <div className="layout">
          <div className="left">
            <h2>Three Easy Steps</h2>
            <div className="grid three">
              <div 
                ref={(el) => stepRefs.current[0] = el}
                className="card step animate-card"
              >
                <div className="step-num">1</div>
                <h3>Tell us what happened</h3>
                <p>Share the basics about your job, what happened, and when. We are here to hear you and help you.</p>
              </div>
              <div 
                ref={(el) => stepRefs.current[1] = el}
                className="card step animate-card"
              >
                <div className="step-num">2</div>
                <h3>Get matched with a lawyer</h3>
                <p>We find you the best employment attorney that matches exactly what you need.</p>
              </div>
              <div 
                ref={(el) => stepRefs.current[2] = el}
                className="card step animate-card"
              >
                <div className="step-num">3</div>
                <h3>Move forward with confidence</h3>
                <p>You relax and we handle the rest.</p>
              </div>
            </div>
          </div>
          <div className="right">
            <div ref={arrowRef} className="steps-animation" data-direction="down">
              <div className="animation-container">
                <div className="progress-ring">
                  <svg className="progress-svg" viewBox="0 0 100 100">
                    <circle
                      className="progress-circle-bg"
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.1)"
                      strokeWidth="8"
                    />
                    <circle
                      className="progress-circle"
                      cx="50"
                      cy="50"
                      r="45"
                      fill="none"
                      stroke="var(--accent)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray="283"
                      strokeDashoffset="calc(283 - (283 * var(--scroll-progress, 0)))"
                    />
                  </svg>
                  <div className="progress-content">
                    <div className="step-indicator">1</div>
                    <div className="step-indicator">2</div>
                    <div className="step-indicator">3</div>
                  </div>
                </div>
                <div className="floating-elements">
                  <div className="floating-dot" style={{animationDelay: '0s'}}></div>
                  <div className="floating-dot" style={{animationDelay: '0.5s'}}></div>
                  <div className="floating-dot" style={{animationDelay: '1s'}}></div>
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

  return (
    <section id="services" className="section services">
      <div className="container">
        <h2>We Help With Tough Work Situations</h2>
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
            <h3>Severance Reviews</h3>
            <p>Get a clear read on severance terms before you sign anything.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FundingCTA() {
  return (
    <section id="get-started" className="section cta">
      <div className="container cta-inner">
        <div>
          <h2>Start now! Talk to one of our lawyers. </h2>
          <p>Get a response in as fast as an hour.</p>
        </div>
        <a className="btn btn-primary btn-lg" href="contact">See if you qualify</a>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section id="faq" className="section faq">
      <div className="container">
        <h2>Frequently Asked <span className="gradient-text">Questions</span></h2>
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
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
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
      <FundingCTA />
      <FAQ />
    </>
  )
}
