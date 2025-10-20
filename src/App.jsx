import './App.css'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from './LanguageContext.jsx'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const { language, changeLanguage, t } = useLanguage();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleLanguageMenu = () => {
    setIsLanguageMenuOpen(!isLanguageMenuOpen);
  };

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
    setIsLanguageMenuOpen(false);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">
          <img src="/Pics/3.png" alt="Boss Fired Me Logo" className="brand-icon" />
          {t('brand')}
        </Link>
        
        {/* Desktop Navigation */}
        <nav className="nav desktop-nav">
          <Link to="/#services">{t('services')}</Link>
          <Link to="/#how-it-works">{t('howItWorks')}</Link>
          <Link to="/#faq">{t('faq')}</Link>
          <Link to="/contact">{t('contact')}</Link>
          <Link className="btn btn-primary" to="/employment-case-form">{t('getStarted')}</Link>
          
          {/* Language Switcher */}
          <div className="language-switcher">
            <button 
              className="language-btn" 
              onClick={toggleLanguageMenu}
              aria-label={t('language')}
            >
              {language === 'en' ? 'EN' : 'ES'}
            </button>
            {isLanguageMenuOpen && (
              <div className="language-menu">
                <button 
                  className={language === 'en' ? 'active' : ''} 
                  onClick={() => handleLanguageChange('en')}
                >
                  {t('english')}
                </button>
                <button 
                  className={language === 'es' ? 'active' : ''} 
                  onClick={() => handleLanguageChange('es')}
                >
                  {t('spanish')}
                </button>
              </div>
            )}
          </div>
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
          <Link to="/#services" onClick={closeMobileMenu}>{t('services')}</Link>
          <Link to="/#how-it-works" onClick={closeMobileMenu}>{t('howItWorks')}</Link>
          <Link to="/#faq" onClick={closeMobileMenu}>{t('faq')}</Link>
          <Link to="/contact" onClick={closeMobileMenu}>{t('contact')}</Link>
          <Link className="btn btn-primary" to="/employment-case-form" onClick={closeMobileMenu}>{t('getStarted')}</Link>
          
          {/* Mobile Language Switcher */}
          <div className="mobile-language-switcher">
            <button 
              className={language === 'en' ? 'active' : ''} 
              onClick={() => handleLanguageChange('en')}
            >
              {t('english')}
            </button>
            <button 
              className={language === 'es' ? 'active' : ''} 
              onClick={() => handleLanguageChange('es')}
            >
              {t('spanish')}
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  const { t } = useLanguage();
  
  return (
    <section className="hero">
      <video className="hero-video" autoPlay muted loop playsInline>
        <source src="/Pics/vid2.mp4" type="video/mp4" />
      </video>
      <div className="hero-overlay"></div>
      <div className="container hero-inner">
        <img src="/Pics/3.png" alt="Boss Fired Me Logo" className="hero-logo" />
        <h1 className="hero-title">{t('heroTitle')}</h1>
        <p className="subtitle">{t('heroSubtitle')}</p>
        <Link className="btn btn-accent" to="/employment-case-form">{t('startYourCase')}</Link>
      </div>
    </section>
  )
}

function Steps() {
  const stepRefs = useRef([]);
  const titleRef = useRef(null);
  const { t } = useLanguage();

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
            <h2 ref={titleRef}>{t('threeEasySteps')}</h2>
            <div className="grid three">
              <div 
                ref={(el) => stepRefs.current[0] = el}
                className="card step animate-card"
              >
                <div className="step-num">1</div>
                <div className="step-content">
                  <div className="step-text">
                    <h3>{t('step1Title')}</h3>
                    <p>{t('step1Description')}</p>
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
                    <h3>{t('step2Title')}</h3>
                    <p>{t('step2Description')}</p>
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
                    <h3>{t('step3Title')}</h3>
                    <p>{t('step3Description')}</p>
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
  const { t } = useLanguage();

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
        <h2 ref={titleRef}>{t('servicesTitle')}</h2>
        <div className="grid three">
          <div 
            ref={(el) => serviceRefs.current[0] = el}
            className="card service animate-service-card"
          >
            <h3>{t('wrongfulTermination')}</h3>
            <p>{t('wrongfulTerminationDesc')}</p>
          </div>
          <div 
            ref={(el) => serviceRefs.current[1] = el}
            className="card service animate-service-card"
          >
            <h3>{t('discrimination')}</h3>
            <p>{t('discriminationDesc')}</p>
          </div>
          <div 
            ref={(el) => serviceRefs.current[2] = el}
            className="card service animate-service-card"
          >
            <h3>{t('harassment')}</h3>
            <p>{t('harassmentDesc')}</p>
          </div>
          <div 
            ref={(el) => serviceRefs.current[3] = el}
            className="card service animate-service-card"
          >
            <h3>{t('retaliation')}</h3>
            <p>{t('retaliationDesc')}</p>
          </div>
          <div 
            ref={(el) => serviceRefs.current[4] = el}
            className="card service animate-service-card"
          >
            <h3>{t('wageHour')}</h3>
            <p>{t('wageHourDesc')}</p>
          </div>
          <div 
            ref={(el) => serviceRefs.current[5] = el}
            className="card service animate-service-card"
          >
            <h3>{t('familyMedicalLeave')}</h3>
            <p>{t('familyMedicalLeaveDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}


function FAQ() {
  const titleRef = useRef(null);
  const { t } = useLanguage();

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
        <h2 ref={titleRef}>{t('frequentlyAskedQuestions')} <span className="gradient-text">{t('questions')}</span></h2>
        <div className="faq-content">
          <details>
            <summary>{t('faq1Question')}</summary>
            <p>{t('faq1Answer')}</p>
          </details>
          <details>
            <summary>{t('faq2Question')}</summary>
            <p>{t('faq2Answer')}</p>
          </details>
          <details>
            <summary>{t('faq3Question')}</summary>
            <p>{t('faq3Answer')}</p>
          </details>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  const { t } = useLanguage();
  
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
            <div className="brand">{t('footerBrand')}</div>
            <div className="muted">{t('footerCopyright', { year: new Date().getFullYear() })}</div>
          </div>
          
          <div className="footer-section">
            <h3>{t('footerContact')}</h3>
            <div className="contact-buttons">
              <a href="mailto:info@bossfiredme.com" className="contact-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
                info@bossfiredme.com
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
            <h3>{t('footerFollowUs')}</h3>
            <div className="social-buttons">
              <a href="https://linkedin.com/company/bossfiredme" className="social-btn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                {t('linkedin')}
              </a>
              <a href="https://instagram.com/bossfiredme" className="social-btn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                {t('instagram')}
              </a>
              <a href="https://facebook.com/bossfiredme" className="social-btn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                {t('facebook')}
              </a>
              <a href="https://tiktok.com/@bossfiredme" className="social-btn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
                {t('tiktok')}
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
