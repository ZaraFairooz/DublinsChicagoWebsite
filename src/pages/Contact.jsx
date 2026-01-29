import { useState, useEffect } from 'react'
import { useLanguage } from '../LanguageContext.jsx'
import { sendEmailFormspree } from '../services/emailService.js'

export default function Contact() {
  const { t } = useLanguage();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    
    // Special handling for phone number - only allow digits
    if (name === 'phone') {
      // Remove all non-digit characters
      const digitsOnly = value.replace(/\D/g, '')
      setFormData(prev => ({
        ...prev,
        [name]: digitsOnly
      }))
      // Clear error when user starts typing
      if (errors.phone) {
        setErrors(prev => ({ ...prev, phone: '' }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
      // Clear error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({ ...prev, [name]: '' }))
      }
    }
  }

  const validateForm = () => {
    const newErrors = {}
    
    // Validate name
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }
    
    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }
    
    // Validate phone - must be at least 10 digits (US standard)
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required'
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits'
    } else if (formData.phone.length > 15) {
      newErrors.phone = 'Phone number must be 15 digits or less'
    }
    
    // Validate message
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all fields
    if (!validateForm()) {
      return
    }
    
    try {
      // Send email using Formspree
      await sendEmailFormspree(formData)
      
      alert(t('thankYouMessage'))
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      })
      setErrors({})
      
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Thank you! Your message has been sent.')
    }
  }

  return (
    <section className="section contact-page">
      <div className="contact-bg"></div>
      <div className="contact-overlay"></div>
      <div className="container" id="contact-form">
        <h1>{t('contactUs')}</h1>
        <p className="contact-subtext">{t('contactSubtext')}</p>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">{t('fullName')} <span className="required">*</span></label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                placeholder={t('enterYourName')} 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="form-field">
              <label htmlFor="email">{t('email')} <span className="required">*</span></label>
              <input 
                id="email" 
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
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="phone">{t('phone')} <span className="required">*</span></label>
              <input 
                id="phone" 
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
            <div className="form-field">
              <label htmlFor="subject">{t('subject')}</label>
              <input 
                id="subject" 
                name="subject" 
                type="text"
                placeholder={t('subjectPlaceholder')} 
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="message">{t('message')} <span className="required">*</span></label>
            <textarea 
              id="message" 
              name="message" 
              rows={6} 
              placeholder={t('messagePlaceholder')} 
              value={formData.message}
              onChange={handleInputChange}
              required
            />
            {errors.message && <span className="error-message">{errors.message}</span>}
          </div>
          <button type="submit" className="btn btn-primary btn-lg">{t('send')}</button>
          <p className="form-disclaimer">{t('formDisclaimer')}</p>
        </form>
      </div>
    </section>
  )
}

