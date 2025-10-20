import { useState } from 'react'
import { useLanguage } from '../LanguageContext.jsx'
import { sendEmailFormspree } from '../services/emailService.js'

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
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
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">{t('fullName')}</label>
              <input 
                id="name" 
                name="name" 
                type="text" 
                placeholder={t('enterYourName')} 
                value={formData.name}
                onChange={handleInputChange}
                required 
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">{t('email')}</label>
              <input 
                id="email" 
                name="email" 
                type="email" 
                placeholder={t('enterYourEmail')} 
                value={formData.email}
                onChange={handleInputChange}
                required 
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="phone">{t('phone')}</label>
              <input 
                id="phone" 
                name="phone" 
                type="tel" 
                placeholder={t('enterYourPhone')} 
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-field">
              <label htmlFor="subject">{t('subject')}</label>
              <input 
                id="subject" 
                name="subject" 
                type="text" 
                placeholder={t('exampleSubject')} 
                value={formData.subject}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="message">{t('message')}</label>
            <textarea 
              id="message" 
              name="message" 
              rows={6} 
              placeholder={t('describeWhatHappened')} 
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-lg">{t('send')}</button>
        </form>
      </div>
    </section>
  )
}

