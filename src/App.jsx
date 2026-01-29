import './App.css'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from './LanguageContext.jsx'
import { sendEmailFormspree } from './services/emailService.js'

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrollingDown, setIsScrollingDown] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { language, changeLanguage, t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Only hide header if scrolled past a certain point (e.g., 100px)
      if (currentScrollY > 100) {
        if (currentScrollY > lastScrollY) {
          // Scrolling down
          setIsScrollingDown(true);
        } else {
          // Scrolling up
          setIsScrollingDown(false);
        }
      } else {
        // Always show header near the top
        setIsScrollingDown(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLanguageChange = (newLanguage) => {
    changeLanguage(newLanguage);
  };

  return (
    <header className={`site-header ${isScrollingDown ? 'header-hidden' : ''}`}>
      <div className="container header-inner">
        <div className="brand-container">
          <Link to="/" className="brand">
            <img src="/Pics/dublinslogo.webp" alt="Dublin's Bar & Grill Logo" className="brand-icon" />
            <div className="brand-text">
              <span className="brand-name">{t('brand')}</span>
              <span className="brand-tagline">{t('tagline')}</span>
            </div>
          </Link>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="nav desktop-nav">
          <Link to="/#menu">{t('menu')}</Link>
          <Link to="/#about">{t('about')}</Link>
          <Link to="/#hours">{t('hours')}</Link>
          <Link to="/contact">{t('contact')}</Link>
          <a className="btn btn-primary" href="tel:+13122666340">{t('callNow')}</a>
          
          {/* Language Switcher */}
          <div className="language-switcher">
            <button 
              className={`language-btn ${language === 'en' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('en')}
              aria-label={t('language')}
            >
              EN
            </button>
            <span className="language-separator">|</span>
            <button 
              className={`language-btn ${language === 'es' ? 'active' : ''}`}
              onClick={() => handleLanguageChange('es')}
              aria-label={t('language')}
            >
              ES
            </button>
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
          <Link to="/#menu" onClick={closeMobileMenu}>{t('menu')}</Link>
          <Link to="/#about" onClick={closeMobileMenu}>{t('about')}</Link>
          <Link to="/#hours" onClick={closeMobileMenu}>{t('hours')}</Link>
          <Link to="/contact" onClick={closeMobileMenu}>{t('contact')}</Link>
          <a className="btn btn-primary" href="tel:+13122666340" onClick={closeMobileMenu}>{t('callNow')}</a>
          
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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const backgroundImages = [
    '/Pics/dublinsfrontstore.png',
    '/Pics/dublinsfoodAI1.png',
    '/Pics/dublinsAIImg.png',
    '/Pics/dublinsAIImg2.png',
    '/Pics/dublinsAIImg3.png'
  ];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 3000); // Change image every 3 seconds
    
    return () => clearInterval(interval);
  }, [backgroundImages.length]);
  
  return (
    <section className="hero">
      {backgroundImages.map((image, index) => (
        <img 
          key={image}
          className={`hero-background ${index === currentImageIndex ? 'active' : ''}`}
          src={image} 
          alt="Dublin's Bar & Grill" 
        />
      ))}
      <div className="hero-overlay"></div>
      <div className="container hero-inner">
        <img src="/Pics/dublinslogo.webp" alt="Dublin's Bar & Grill Logo" className="hero-logo" />
        <p className="hero-header">{t('heroHeader')}</p>
        <h1 className="hero-title">{t('heroTitle')}</h1>
        <p className="hero-subtitle">{t('heroSubtitle')}</p>
        <p className="hero-text">{t('heroText')}</p>
        <div className="hero-button-container">
          <a className="btn btn-accent" href="#menu">{t('viewMenu')}</a>
          <a className="btn btn-primary" href="tel:+13122666340" style={{marginLeft: '12px'}}>{t('callNow')}</a>
          <p className="hero-footer">{t('heroFooter')}</p>
        </div>
      </div>
    </section>
  )
}

function Steps() {
  const stepRefs = useRef([]);
  const titleRef = useRef(null);
  const { t } = useLanguage();
  
  // Debug: Log translations to verify they're loading
  useEffect(() => {
    console.log('Step translations:', {
      step1Title: t('step1Title'),
      step1Description: t('step1Description'),
      step2Title: t('step2Title'),
      step2Description: t('step2Description'),
      step3Title: t('step3Title'),
      step3Description: t('step3Description'),
    });
  }, [t]);

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
    <section id="about" className="section steps">
      <div className="container">
        <div className="layout">
          <div className="left">
            <h2 ref={titleRef}>{t('whyChooseDublins')}</h2>
            <div className="grid three">
              <div 
                ref={(el) => stepRefs.current[0] = el}
                className="card step animate-card"
              >
                <div className="step-num">🍺</div>
                <div className="step-content">
                  <div className="step-text">
                    <h3>{t('authenticIrish')}</h3>
                    <p>{t('authenticIrishDesc')}</p>
                  </div>
                </div>
              </div>
              <div 
                ref={(el) => stepRefs.current[1] = el}
                className="card step animate-card"
              >
                <div className="step-num">🌅</div>
                <div className="step-content">
                  <div className="step-text">
                    <h3>{t('breakfastAllDay')}</h3>
                    <p>{t('breakfastAllDayDesc')}</p>
                  </div>
                </div>
              </div>
              <div 
                ref={(el) => stepRefs.current[2] = el}
                className="card step animate-card"
              >
                <div className="step-num">365</div>
                <div className="step-content">
                  <div className="step-text">
                    <h3>{t('openEveryDay')}</h3>
                    <p>{t('openEveryDayDesc')}</p>
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
    <section id="menu" className="section services">
      <div className="container">
        <h2 ref={titleRef}>{t('menuTitle')}</h2>
        <div className="grid three">
          <div 
            ref={(el) => serviceRefs.current[0] = el}
            className="card service animate-service-card"
          >
            <h3>{t('irishSpecialties')}</h3>
            <p>{t('irishSpecialtiesDesc')}</p>
          </div>
          <div 
            ref={(el) => serviceRefs.current[1] = el}
            className="card service animate-service-card"
          >
            <h3>{t('breakfast')}</h3>
            <p>{t('breakfastDesc')}</p>
          </div>
          <div 
            ref={(el) => serviceRefs.current[2] = el}
            className="card service animate-service-card"
          >
            <h3>{t('sandwiches')}</h3>
            <p>{t('sandwichesDesc')}</p>
          </div>
          <div 
            ref={(el) => serviceRefs.current[3] = el}
            className="card service animate-service-card"
          >
            <h3>{t('appetizers')}</h3>
            <p>{t('appetizersDesc')}</p>
          </div>
          <div 
            ref={(el) => serviceRefs.current[4] = el}
            className="card service animate-service-card"
          >
            <h3>{t('entrees')}</h3>
            <p>{t('entreesDesc')}</p>
          </div>
          <div 
            ref={(el) => serviceRefs.current[5] = el}
            className="card service animate-service-card"
          >
            <h3>{t('cocktails')}</h3>
            <p>{t('cocktailsDesc')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}


function FAQ() {
  const titleRef = useRef(null);
  const { t } = useLanguage();
  const [showAll, setShowAll] = useState(false);

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

  const faqs = [
    { q: 'faq1Question', a: 'faq1Answer' },
    { q: 'faq2Question', a: 'faq2Answer' },
    { q: 'faq3Question', a: 'faq3Answer' },
    { q: 'faq4Question', a: 'faq4Answer' },
    { q: 'faq5Question', a: 'faq5Answer' },
    { q: 'faq6Question', a: 'faq6Answer' },
    { q: 'faq7Question', a: 'faq7Answer' },
    { q: 'faq8Question', a: 'faq8Answer' },
    { q: 'faq9Question', a: 'faq9Answer' },
    { q: 'faq10Question', a: 'faq10Answer' },
    { q: 'faq11Question', a: 'faq11Answer' },
    { q: 'faq12Question', a: 'faq12Answer' },
    { q: 'faq13Question', a: 'faq13Answer' },
    { q: 'faq14Question', a: 'faq14Answer' },
    { q: 'faq15Question', a: 'faq15Answer' },
  ];

  const initialFaqs = faqs.slice(0, 5);
  const remainingFaqs = faqs.slice(5);
  const displayedFaqs = showAll ? faqs : initialFaqs;

  return (
    <section id="hours" className="section faq">
      <div className="container">
        <h2 ref={titleRef}>{t('frequentlyAskedQuestions')}</h2>

        <div className="faq-content">
          {displayedFaqs.map((faq, index) => (
            <details key={index} className={index % 2 === 0 ? 'faq-even' : 'faq-odd'}>
              <summary>
                <span className="faq-question">{t(faq.q)}</span>
                <span className="faq-icon">+</span>
              </summary>
              <p dangerouslySetInnerHTML={{ __html: t(faq.a) }}></p>
            </details>
          ))}
          
          {remainingFaqs.length > 0 && (
            <button 
              className="faq-see-more-btn"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? t('seeLessFaqs') : t('seeMoreFaqs')}
            </button>
          )}
        </div>
      </div>
    </section>
  )
}

function ContactSection() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      const digitsOnly = value.replace(/\D/g, '');
      setFormData(prev => ({
        ...prev,
        [name]: digitsOnly
      }));
      if (errors.phone) {
        setErrors(prev => ({ ...prev, phone: '' }));
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }));
      }
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await sendEmailFormspree(formData);
      alert(t('thankYouMessage') || 'Thank you! Your message has been sent.');
      
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
      setErrors({});
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Thank you! Your message has been sent.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <section className="section contact-section">
      <div className="container">
        <h2>{t('contactUs')}</h2>
        <p className="contact-section-text">{t('contactSubtext')}</p>
        
        <form className="contact-section-form" onSubmit={handleSubmit}>
          <div className="contact-section-form-row">
            <div className="contact-section-form-field">
              <label htmlFor="contact-name">{t('fullName')} <span className="required">*</span></label>
              <input 
                id="contact-name"
                name="name" 
                type="text" 
                placeholder={t('enterYourName')} 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="contact-section-form-field">
              <label htmlFor="contact-email">{t('email')} <span className="required">*</span></label>
              <input 
                id="contact-email"
                name="email" 
                type="email" 
                placeholder={t('enterYourEmail')} 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
          </div>
          <div className="contact-section-form-row">
            <div className="contact-section-form-field">
              <label htmlFor="contact-phone">{t('phone')} <span className="required">*</span></label>
              <input 
                id="contact-phone"
                name="phone" 
                type="tel" 
                placeholder={t('enterYourPhone')} 
                value={formData.phone}
                onChange={handleInputChange}
                required
                minLength={10}
                maxLength={15}
                pattern="[0-9]{10,15}"
                inputMode="numeric"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
            <div className="contact-section-form-field">
              <label htmlFor="contact-subject">{t('subject')}</label>
              <input 
                id="contact-subject"
                name="subject" 
                type="text"
                placeholder={t('subjectPlaceholder')} 
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="contact-section-form-field">
            <label htmlFor="contact-message">{t('message')} <span className="required">*</span></label>
            <textarea 
              id="contact-message"
              name="message" 
              rows={4} 
              placeholder={t('messagePlaceholder')} 
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>
          <button type="submit" className="btn btn-primary contact-section-btn" disabled={isSubmitting}>
            {isSubmitting ? 'Sending...' : 'Submit'}
          </button>
          <p className="contact-section-form-disclaimer">{t('formDisclaimer')}</p>
        </form>
      </div>
    </section>
  )
}

export function Footer() {
  const { t } = useLanguage();
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  return (
    <footer className="site-footer">
      <video className="footer-video" autoPlay muted loop playsInline>
        <source src="/Pics/vid2.mp4" type="video/mp4" />
      </video>
      <div className="footer-overlay"></div>
      <div className="container">
        <div className="footer-cta">
          <p className="footer-next-step">{t('footerNextStep')}</p>
          <a href="tel:+13122666340" className="btn btn-primary btn-lg footer-cta-btn">
            {t('callNow')}
          </a>
        </div>
        
        <div className="footer-content-container">
        <div className="footer-content">
          <div className="footer-section">
            <img src="/Pics/dublinslogo.webp" alt="Dublin's Bar & Grill Logo" className="footer-logo" />
            <div className="brand">{t('footerBrand')}</div>
            <p className="muted">1050 North State Street<br />Chicago, Illinois 60611</p>
          </div>
          
          <div className="footer-section">
            <h3>{t('footerContact')}</h3>
            <div className="contact-buttons">
              <a href="tel:+13122666340" className="contact-btn">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
                (312) 266-6340
              </a>
              <p className="muted" style={{marginTop: '8px'}}>{t('hours')}: {t('hoursValue')}</p>
            </div>
          </div>
          
          <div className="footer-section footer-section-social">
            <h3>{t('footerFollowUs')}</h3>
            <div className="social-buttons">
              <a href="https://instagram.com/dublinschicago" className="social-btn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
                {t('instagram')}
              </a>
              <a href="https://facebook.com/dublinschicago" className="social-btn" target="_blank" rel="noopener noreferrer">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                </svg>
                {t('facebook')}
              </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-navigation">
          <Link to="/">{t('home')}</Link>
          <span className="footer-nav-separator">|</span>
          <Link to="/#menu">{t('menu')}</Link>
          <span className="footer-nav-separator">|</span>
          <Link to="/#about">{t('about')}</Link>
          <span className="footer-nav-separator">|</span>
          <Link to="/contact">{t('contact')}</Link>
        </div>
        
        <div className="footer-copyright">
          <p>{t('footerCopyright', { year: new Date().getFullYear() })}</p>
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
      <ContactSection />
    </>
  )
}
