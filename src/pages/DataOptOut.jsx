import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../LanguageContext.jsx'
import './PrivacyPolicy.css'

export default function DataOptOut() {
  const { t } = useLanguage()
  const currentDate = new Date()
  const effectiveDate = "December 6, 2025"
  const lastUpdated = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-content">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>Data Opt Out</h1>
          
          <div className="legal-meta">
            <p><strong>Effective Date:</strong> {effectiveDate}</p>
            <p><strong>Last Updated:</strong> {lastUpdated}</p>
          </div>

          <div className="legal-section">
            <p className="legal-intro">
              BossFiredMe.com ("Boss Fired Me," "we," "us," or "our") respects your privacy and is committed to protecting your personal information. In accordance with the California Consumer Privacy Act (CCPA), as amended by the California Privacy Rights Act (CPRA), California residents have the right to direct us not to sell or share their personal information with third parties.
            </p>
            <p>
              This page explains what opting out means, how to make an opt-out request, and how we will process and confirm your request.
            </p>
          </div>

          <div className="legal-section">
            <h2>What Opting Out Means</h2>
            <p>
              Opting out means that once we receive and process your verified request, Boss Fired Me will not sell or share your personal information with any third parties for marketing, advertising, or other commercial purposes.
            </p>
            <p>
              We do not sell personal information for monetary compensation, but under California law, "sell" and "share" can also include certain data exchanges for advertising or analytics purposes. Submitting an opt-out request ensures that even those activities will cease unless they are necessary to operate the Site, provide a service you have specifically requested, or comply with applicable law.
            </p>
            <p>
              Please note that opting out does not affect disclosures to independent, licensed attorneys or law firms when you request that we connect you with one. Those disclosures are made at your direction and are essential to fulfill your request for a legal referral.
            </p>
            <p>
              Additionally, opting out will not stop you from receiving all advertisements or communications. You may still see contextual ads or messages based on general information such as your location or the pages you visit on our Site.
            </p>
          </div>

          <div className="legal-section">
            <h2>How to Submit an Opt-Out Request</h2>
            <p>
              If you are a California resident and wish to exercise your right to opt out of the sale or sharing of your personal information, you may do so at any time using one of the methods below.
            </p>
            
            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#FFD700', marginTop: '24px', marginBottom: '12px' }}>1. Email Request</h3>
            <p>
              Send an email to <a href="mailto:privacy@bossfiredme.com">privacy@bossfiredme.com</a> with the subject line "Opt-Out of Sale or Sharing of Personal Information."
            </p>
            <p>
              In your message, please include your full name, email address, and any additional information that can help us locate your record. This information will be used only to verify and process your request.
            </p>

            <h3 style={{ fontSize: '18px', fontWeight: 600, color: '#FFD700', marginTop: '24px', marginBottom: '12px' }}>2. Submit a Request Online</h3>
            <p>
              You may also submit a request through our online privacy form at <a href="https://www.bossfiredme.com/do-not-sell-my-info" target="_blank" rel="noopener noreferrer">https://www.bossfiredme.com/do-not-sell-my-info</a>.
            </p>
            <p>
              Follow the instructions on the form to provide your identifying information so we can process your request.
            </p>
            <p>
              Once your request has been received, we will acknowledge it promptly and begin verification. To protect your privacy and the integrity of our records, we may need to verify your identity or the authority of any authorized agent before completing your request.
            </p>
          </div>

          <div className="legal-section">
            <h2>Verification and Confirmation Process</h2>
            <p>
              Upon receipt of your request, we will confirm it within the time period required by California law and respond within the statutory deadline. You will receive a written confirmation when your request has been successfully processed. If we cannot verify your identity with reasonable certainty, we may request additional information or decline to fulfill the request as permitted by law, but we will explain our decision in writing.
            </p>
            <p>
              If you submit an opt-out request on behalf of another person, we may require written authorization or proof of power of attorney. All verified opt-out requests will be honored within the legally required timeframe and maintained on record for compliance purposes.
            </p>
          </div>

          <div className="legal-section">
            <h2>Further Assistance and Contact Information</h2>
            <p>
              If you have any questions about this process or need additional assistance regarding your California privacy rights, please contact us by email at <a href="mailto:privacy@bossfiredme.com">privacy@bossfiredme.com</a> or by mail at Boss Fired Me, [Street Address], [City], California [ZIP].
            </p>
            <p>
              You may also reach us by telephone at [Insert phone number] during regular business hours.
            </p>
            <p>
              We are committed to honoring your privacy preferences and to ensuring that your personal information is handled responsibly and in compliance with California privacy laws.
            </p>
            <p>
              <strong>Please Note:</strong> Opting out of the sale or sharing of personal information does not eliminate all data collection or advertising. It simply ensures that personal information we collect about you will not be sold or shared with third parties for marketing, analytics, or cross-context behavioral advertising purposes. We may continue to use your information internally to operate, maintain, and improve the Site, to fulfill your requests, or to comply with applicable laws and regulations.
            </p>
          </div>

          <div className="legal-section">
            <h2>Notice at Collection of Personal Information</h2>
            <p>
              This Notice at Collection explains the categories of personal information that BossFiredMe.com ("Boss Fired Me," "we," "us," or "our") collects from you, the purposes for which that information is used, the categories of recipients to whom it may be disclosed, and your rights under the California Consumer Privacy Act and California Privacy Rights Act (collectively, the "CCPA"). This notice applies at or before the time personal information is collected from you through our website, including any contact or intake forms you choose to submit. By providing personal information, you acknowledge that you have read and understand this Notice.
            </p>
            <p>
              When you use our Site or submit an inquiry, we collect personal information such as your name, email address, telephone number, and any additional details you voluntarily provide regarding your employment circumstances. This may include information about your job title, employer, dates of employment, and the nature of the workplace issues you are experiencing. We also collect certain technical information automatically from your device, such as your IP address, browser type, operating system, device identifiers, and browsing interactions, through cookies and similar technologies. This technical information helps us ensure the Site is functioning properly, maintain security, and understand how users navigate our pages.
            </p>
            <p>
              We collect this information for specific, limited purposes. The primary purpose is to respond to your inquiry and, at your direction, connect you with one or more independent, licensed California employment attorneys who may be able to evaluate your situation and provide a free consultation. We also use your information to operate, maintain, and improve our Site; to communicate with you; to facilitate security and fraud-prevention efforts; and to comply with legal obligations. Any disclosure of your information to a participating attorney occurs only because you have asked us to facilitate a referral and therefore constitutes a disclosure made at your direction. Aside from such referrals, we disclose personal information only to service providers who assist us with hosting, analytics, communication tools, and operational support, and those service providers may not use your information for any purpose other than assisting us with our activities.
            </p>
            <p>
              We do not sell your personal information as the term "sell" is defined under the CCPA, nor do we share your personal information for cross-context behavioral advertising. If our practices ever change, we will update this Notice and provide any required rights or opt-out mechanisms. We do not collect or request sensitive personal information beyond what you choose to provide voluntarily in describing your situation, and we do not use any sensitive personal information for purposes that require an opportunity to limit its use under California law.
            </p>
            <p>
              You have important privacy rights under the CCPA. These rights include the right to request access to the personal information we have collected about you, the right to request that we delete personal information subject to certain legal exceptions, and the right to request correction of inaccurate personal information. You also have the right to opt out of any sale or sharing of personal information, although we do not engage in such activities. You will not be discriminated against for exercising any of your rights. To exercise your rights, or to ask questions about this Notice, you may contact us at <a href="mailto:privacy@bossfiredme.com">privacy@bossfiredme.com</a> or by telephone at [insert phone number]. We may need to verify your identity before responding to certain requests in order to protect the security of your information.
            </p>
            <p>
              We retain personal information only for as long as reasonably necessary to fulfill the purposes described above, including responding to your inquiry, completing the referral you requested, maintaining required business records, addressing technical or security issues, and complying with legal obligations. After the retention period ends, we delete or de-identify personal information in accordance with our internal data retention policies.
            </p>
            <p>
              By using the Site or submitting information through any form on the Site, you acknowledge that you have received this Notice at Collection and that you understand why and how your personal information is collected, used, and disclosed.
            </p>
          </div>

          <div className="legal-footer">
            <p>Last updated: {lastUpdated}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

