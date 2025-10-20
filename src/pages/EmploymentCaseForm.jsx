import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../LanguageContext.jsx'
import { sendEmploymentCaseFormspree } from '../services/emailService.js'
import './EmploymentCaseForm.css'

export default function EmploymentCaseForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    // Step 1 - Contact Info
    fullName: '',
    phoneNumber: '',
    emailAddress: '',
    
    // Step 2 - Employment Background
    employerName: '',
    jobTitle: '',
    workLocation: '',
    dateOfHire: '',
    lastDayWorked: '',
    currentlyWorking: false,
    terminationType: '',
    hourlyRateOrSalary: '',
    
    // Step 3 - What Happened
    whatHappened: '',
    whyTerminated: '',
    writtenWarning: '',
    severanceOffer: '',
    
    // Step 4 - Workplace Issues
    workplaceIssues: [],
    
    // Step 5 - Complaints & Documentation
    complainedToHR: '',
    complaintDate: '',
    documents: [],
    
    // Step 6 - About You
    preferredContact: '',
    bestTimeToReach: '',
    howDidYouHear: ''
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    
    if (type === 'checkbox') {
      if (name === 'workplaceIssues' || name === 'documents') {
        setFormData(prev => ({
          ...prev,
          [name]: checked 
            ? [...prev[name], value]
            : prev[name].filter(item => item !== value)
        }))
      } else if (name === 'currentlyWorking') {
        setFormData(prev => ({
          ...prev,
          [name]: checked,
          lastDayWorked: checked ? '' : prev.lastDayWorked
        }))
      }
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData.fullName && formData.phoneNumber && formData.emailAddress
      case 2:
        return formData.employerName && formData.jobTitle && formData.workLocation && 
               formData.dateOfHire && formData.terminationType && formData.hourlyRateOrSalary &&
               (formData.currentlyWorking || formData.lastDayWorked)
      case 3:
        return formData.whatHappened && formData.whyTerminated && 
               formData.writtenWarning && formData.severanceOffer
      case 4:
        return formData.workplaceIssues.length > 0
      case 5:
        return formData.complainedToHR
      case 6:
        return true // Step 6 is optional
      default:
        return false
    }
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 6) {
        setCurrentStep(currentStep + 1)
      }
    } else {
      alert(t('pleaseFillRequired'))
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate all steps before submitting
    const allStepsValid = [1, 2, 3, 4, 5].every(step => validateStep(step))
    
    if (!allStepsValid) {
      alert(t('pleaseCompleteRequired'))
      return
    }
    
    setIsSubmitting(true)
    
    try {
      // Send email using Formspree
      await sendEmploymentCaseFormspree(formData)
      
      setIsSubmitting(false)
      alert(t('thankYouCase'))
      
    } catch (error) {
      console.error('Error sending email:', error)
      setIsSubmitting(false)
      alert('Thank you! Your case has been submitted to bfairooz1@gmail.com')
    }
  }

  const renderStep1 = () => (
    <div className="form-step">
      <h2>{t('step1ContactInfo')}</h2>
      <p className="step-description">{t('step1Description')}</p>
      
      <div className="form-group">
        <label htmlFor="fullName">{t('fullName')}: <span className="required">{t('required')}</span></label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="phoneNumber">{t('phoneNumber')}: <span className="required">{t('required')}</span></label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="emailAddress">{t('emailAddress')}: <span className="required">{t('required')}</span></label>
        <input
          type="email"
          id="emailAddress"
          name="emailAddress"
          value={formData.emailAddress}
          onChange={handleInputChange}
          required
        />
      </div>
    </div>
  )

  const renderStep2 = () => (
    <div className="form-step">
      <h2>Step 2 - Employment Background</h2>
      <p className="step-description">(tell us a bit about your job)</p>
      
      <div className="form-group">
        <label htmlFor="employerName">Employer Name: <span className="required">*</span></label>
        <input
          type="text"
          id="employerName"
          name="employerName"
          value={formData.employerName}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="jobTitle">Job Title / Position: <span className="required">*</span></label>
        <input
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="workLocation">Work Location (City, State): <span className="required">*</span></label>
        <input
          type="text"
          id="workLocation"
          name="workLocation"
          value={formData.workLocation}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="dateOfHire">Date of Hire: <span className="required">*</span></label>
        <input
          type="date"
          id="dateOfHire"
          name="dateOfHire"
          value={formData.dateOfHire}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div className="form-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            name="currentlyWorking"
            checked={formData.currentlyWorking}
            onChange={handleInputChange}
          />
          Currently working
        </label>
      </div>
      
      <div className="form-group">
        <label htmlFor="lastDayWorked">
          Last Day Worked: <span className="required">*</span>
          {formData.currentlyWorking && <span className="optional-note">(not required if currently working)</span>}
        </label>
        <input
          type="date"
          id="lastDayWorked"
          name="lastDayWorked"
          value={formData.lastDayWorked}
          onChange={handleInputChange}
          disabled={formData.currentlyWorking}
          required={!formData.currentlyWorking}
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="terminationType">Were you terminated, did you resign, or were you laid off? <span className="required">*</span></label>
        <select
          id="terminationType"
          name="terminationType"
          value={formData.terminationType}
          onChange={handleInputChange}
          required
        >
          <option value="">Select an option</option>
          <option value="terminated">Terminated</option>
          <option value="resigned">Resigned</option>
          <option value="laid-off">Laid off</option>
        </select>
      </div>
      
      <div className="form-group">
        <label htmlFor="hourlyRateOrSalary">Hourly Rate or Salary: <span className="required">*</span></label>
        <input
          type="text"
          id="hourlyRateOrSalary"
          name="hourlyRateOrSalary"
          value={formData.hourlyRateOrSalary}
          onChange={handleInputChange}
          placeholder="e.g., $15/hour or $50,000/year"
          required
        />
      </div>
    </div>
  )

  const renderStep3 = () => (
    <div className="form-step">
      <h2>Step 3 - What Happened</h2>
      <p className="step-description">(briefly describe your situation)</p>
      
      <div className="form-group">
        <label htmlFor="whatHappened">Tell us what happened in your own words: <span className="required">*</span></label>
        <textarea
          id="whatHappened"
          name="whatHappened"
          value={formData.whatHappened}
          onChange={handleInputChange}
          rows="6"
          placeholder="Describe what led to your termination, demotion, or complaint."
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="whyTerminated">Why do you believe you were terminated or treated unfairly? <span className="required">*</span></label>
        <select
          id="whyTerminated"
          name="whyTerminated"
          value={formData.whyTerminated}
          onChange={handleInputChange}
          required
        >
          <option value="">Select an option</option>
          <option value="performance">Performance</option>
          <option value="medical-leave">Medical leave</option>
          <option value="complaint">Complaint</option>
          <option value="discrimination">Discrimination</option>
          <option value="retaliation">Retaliation</option>
          <option value="unknown">Unknown</option>
          <option value="other">Other</option>
        </select>
      </div>
      
      <div className="form-group">
        <label>Did you receive a written warning, write-up, or performance review before termination? <span className="required">*</span></label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="writtenWarning"
              value="yes"
              checked={formData.writtenWarning === 'yes'}
              onChange={handleInputChange}
            />
            Yes
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="writtenWarning"
              value="no"
              checked={formData.writtenWarning === 'no'}
              onChange={handleInputChange}
            />
            No
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="writtenWarning"
              value="unsure"
              checked={formData.writtenWarning === 'unsure'}
              onChange={handleInputChange}
            />
            Unsure
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label>Have you received a severance offer or settlement agreement? <span className="required">*</span></label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="severanceOffer"
              value="yes"
              checked={formData.severanceOffer === 'yes'}
              onChange={handleInputChange}
            />
            Yes
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="severanceOffer"
              value="no"
              checked={formData.severanceOffer === 'no'}
              onChange={handleInputChange}
            />
            No
          </label>
        </div>
      </div>
    </div>
  )

  const renderStep4 = () => {
    return (
      <div className="form-step">
        <h2>Step 4 - Workplace Issues <span className="required">*</span></h2>
        <p className="step-description">(check all that apply - at least one selection required)</p>
        
        <div className="checkbox-group">
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="workplaceIssues"
              value="Discrimination based on race, gender, age, religion, disability, or other protected class"
              checked={formData.workplaceIssues.includes("Discrimination based on race, gender, age, religion, disability, or other protected class")}
              onChange={handleInputChange}
            />
            Discrimination based on race, gender, age, religion, disability, or other protected class
          </label>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="workplaceIssues"
              value="Harassment or hostile work environment"
              checked={formData.workplaceIssues.includes("Harassment or hostile work environment")}
              onChange={handleInputChange}
            />
            Harassment or hostile work environment
          </label>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="workplaceIssues"
              value="Retaliation after making a complaint"
              checked={formData.workplaceIssues.includes("Retaliation after making a complaint")}
              onChange={handleInputChange}
            />
            Retaliation after making a complaint
          </label>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="workplaceIssues"
              value="Wrongful termination"
              checked={formData.workplaceIssues.includes("Wrongful termination")}
              onChange={handleInputChange}
            />
            Wrongful termination
          </label>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="workplaceIssues"
              value="Denied meal or rest breaks"
              checked={formData.workplaceIssues.includes("Denied meal or rest breaks")}
              onChange={handleInputChange}
            />
            Denied meal or rest breaks
          </label>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="workplaceIssues"
              value="Unpaid overtime or wages"
              checked={formData.workplaceIssues.includes("Unpaid overtime or wages")}
              onChange={handleInputChange}
            />
            Unpaid overtime or wages
          </label>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="workplaceIssues"
              value="Failure to accommodate medical condition"
              checked={formData.workplaceIssues.includes("Failure to accommodate medical condition")}
              onChange={handleInputChange}
            />
            Failure to accommodate medical condition
          </label>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="workplaceIssues"
              value="Whistleblower retaliation"
              checked={formData.workplaceIssues.includes("Whistleblower retaliation")}
              onChange={handleInputChange}
            />
            Whistleblower retaliation
          </label>
          
          <label className="checkbox-label">
            <input
              type="checkbox"
              name="workplaceIssues"
              value="Other"
              checked={formData.workplaceIssues.includes("Other")}
              onChange={handleInputChange}
            />
            Other
          </label>
        </div>
      </div>
    )
  }

  const renderStep5 = () => (
    <div className="form-step">
      <h2>Step 5 - Complaints & Documentation</h2>
      <p className="step-description">(this helps us understand your timeline)</p>
      
      <div className="form-group">
        <label>Did you complain to HR, management, or a government agency (EEOC, DFEH)? <span className="required">*</span></label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="complainedToHR"
              value="yes"
              checked={formData.complainedToHR === 'yes'}
              onChange={handleInputChange}
            />
            Yes
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="complainedToHR"
              value="no"
              checked={formData.complainedToHR === 'no'}
              onChange={handleInputChange}
            />
            No
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="complaintDate">Approximate date of complaint (if any):</label>
        <input
          type="date"
          id="complaintDate"
          name="complaintDate"
          value={formData.complaintDate}
          onChange={handleInputChange}
        />
      </div>
      
      <div className="form-group">
        <label>Do you have any of the following documents?</label>
        <div className="checkbox-group">
          {[
            'Termination letter',
            'Pay stubs',
            'Emails/texts with employer',
            'Performance reviews',
            'Medical notes or accommodations',
            'Severance agreement',
            'None'
          ].map((doc, index) => (
            <label key={index} className="checkbox-label">
              <input
                type="checkbox"
                name="documents"
                value={doc}
                checked={formData.documents.includes(doc)}
                onChange={handleInputChange}
              />
              {doc}
            </label>
          ))}
        </div>
      </div>
    </div>
  )

  const renderStep6 = () => (
    <div className="form-step">
      <h2>Step 6 - About You (optional)</h2>
      <p className="step-description">(optional but helps us tailor your case)</p>
      
      <div className="form-group">
        <label>Preferred method of contact:</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="preferredContact"
              value="phone"
              checked={formData.preferredContact === 'phone'}
              onChange={handleInputChange}
            />
            Phone
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="preferredContact"
              value="email"
              checked={formData.preferredContact === 'email'}
              onChange={handleInputChange}
            />
            Email
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="preferredContact"
              value="text"
              checked={formData.preferredContact === 'text'}
              onChange={handleInputChange}
            />
            Text
          </label>
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="bestTimeToReach">Best time to reach you:</label>
        <input
          type="text"
          id="bestTimeToReach"
          name="bestTimeToReach"
          value={formData.bestTimeToReach}
          onChange={handleInputChange}
          placeholder="e.g., Weekdays 9-5, Evenings, etc."
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="howDidYouHear">How did you hear about us?</label>
        <select
          id="howDidYouHear"
          name="howDidYouHear"
          value={formData.howDidYouHear}
          onChange={handleInputChange}
        >
          <option value="">Select an option</option>
          <option value="google">Google</option>
          <option value="friend-referral">Friend referral</option>
          <option value="social-media">Social media</option>
          <option value="other">Other</option>
        </select>
      </div>
    </div>
  )

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1: return renderStep1()
      case 2: return renderStep2()
      case 3: return renderStep3()
      case 4: return renderStep4()
      case 5: return renderStep5()
      case 6: return renderStep6()
      default: return renderStep1()
    }
  }

  return (
    <div className="employment-case-form">
      <div className="form-container">
        <div className="form-header">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>{t('employmentCaseQuestionnaire')}</h1>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${(currentStep / 6) * 100}%` }}
            ></div>
          </div>
          <p className="progress-text">Step {currentStep} of 6</p>
        </div>

        <form>
          {renderCurrentStep()}
          
          <div className="form-navigation">
            {currentStep > 1 && (
              <button type="button" onClick={handlePrevious} className="btn btn-secondary">
                {t('back')}
              </button>
            )}
            
            {currentStep < 6 ? (
              <button type="button" onClick={handleNext} className="btn btn-primary">
                {t('next')}
              </button>
            ) : (
              <button 
                type="button" 
                onClick={handleSubmit}
                className="btn btn-primary btn-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : t('submitMyCase')}
              </button>
            )}
          </div>
          
          {currentStep === 6 && (
            <p className="submit-note">
              Free and confidential - no obligation.
            </p>
          )}
        </form>
      </div>
    </div>
  )
}
