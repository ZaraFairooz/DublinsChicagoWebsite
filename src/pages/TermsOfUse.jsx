import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../LanguageContext.jsx'
import './PrivacyPolicy.css'

export default function TermsOfUse() {
  const { t } = useLanguage()
  const currentDate = new Date()
  const effectiveDate = "January 1, 2025"
  const lastUpdated = currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="legal-page">
      <div className="legal-container">
        <div className="legal-content">
          <Link to="/" className="back-link">← Back to Home</Link>
          <h1>Terms of Use</h1>
          
          <div className="legal-meta">
            <p><strong>Effective Date:</strong> {effectiveDate}</p>
            <p><strong>Last Updated:</strong> {lastUpdated}</p>
          </div>

          <div className="legal-section">
            <p className="legal-intro">
              Welcome to BossFiredMe.com ("Boss Fired Me," "we," "us," or "our"). These Terms of Use ("Terms") govern your access to and use of our website located at www.bossfiredme.com and any affiliated pages, forms, or communications associated with it (collectively, the "Site"). By visiting or using this Site, you acknowledge that you have read, understood, and agree to be bound by these Terms and by our Privacy Policy. If you do not agree with any part of these Terms, you should discontinue use of the Site immediately.
            </p>
          </div>

          <div className="legal-section">
            <h2>Nature of Our Service</h2>
            <p>
              Boss Fired Me is a California-based business that operates as a marketing and referral platform designed to connect individuals who believe they have been wrongfully terminated, harassed, discriminated against, or otherwise mistreated at work with independent, licensed California employment attorneys. We are not a law firm, we do not practice law, and we do not provide legal advice. The attorneys with whom we connect you are independent professionals who have no employment or ownership relationship with Boss Fired Me. Any attorney-client relationship that may arise is solely between you and the attorney you choose to engage, under a separate written agreement that is entirely outside the scope of these Terms.
            </p>
          </div>

          <div className="legal-section">
            <h2>No Legal Advice</h2>
            <p>
              You understand and agree that the information contained on this Site, including but not limited to text, graphics, blog articles, FAQs, and other materials, is provided for general informational purposes only and should not be relied upon as legal advice. Legal information is not the same as legal advice, which is specific to an individual's particular circumstances. You should always consult directly with a qualified attorney about your specific situation before making any legal decisions or taking any legal action. Use of the Site does not create an attorney-client relationship between you and Boss Fired Me, nor between you and any attorney referenced or contacted through the Site. The formation of an attorney-client relationship can occur only when you have executed a separate written agreement directly with a licensed attorney.
            </p>
          </div>

          <div className="legal-section">
            <h2>No Warranties; Limitation of Liability</h2>
            <p>
              We strive to ensure that the information on this Site is accurate and up-to-date, but we make no representations, warranties, or guarantees as to its completeness, reliability, or accuracy. All use of the Site is at your own risk. We are not responsible for any losses or damages that may result from your reliance on information obtained through the Site or through any linked websites or communications facilitated through the Site. You agree that Boss Fired Me, its owners, employees, agents, contractors, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, exemplary, or punitive damages, including but not limited to loss of profits, loss of data, loss of goodwill, or other intangible losses, arising from or relating to your use of the Site, inability to access the Site, or any communication, interaction, or transaction with any third party or participating attorney. To the fullest extent permitted by law, our total liability to you for any claim arising from or related to your use of the Site shall not exceed one hundred dollars ($100) or the amount you paid, if any, for access to the Site, whichever is less.
            </p>
          </div>

          <div className="legal-section">
            <h2>User Conduct and Restrictions</h2>
            <p>
              By using the Site, you represent and warrant that all information you submit through any form or communication is truthful, accurate, and provided in good faith. You agree not to use the Site for any unlawful purpose or in a manner that could damage, disable, or impair the operation of the Site or interfere with the use of the Site by others. You may not attempt to gain unauthorized access to any portion of the Site or to any systems or networks connected to it. You agree not to use any automated means, including bots, scripts, or crawlers, to collect information from the Site or to submit information to it without our express written consent. We reserve the right to suspend or terminate access to the Site at our discretion, including in cases of suspected abuse, fraud, or violation of these Terms.
            </p>
          </div>

          <div className="legal-section">
            <h2>Referrals and Attorney Matching</h2>
            <p>
              When you submit information through our Site requesting a referral or consultation, you are authorizing Boss Fired Me to share that information with one or more independent California attorneys or law firms for the purpose of determining whether they are able to assist you. We do not endorse, recommend, or guarantee the qualifications, competence, experience, or outcome of any particular attorney or law firm. We make no representations regarding the likelihood of success of any legal claim or the amount of compensation that may be recovered. The decision whether to contact you or to accept your matter rests entirely with the independent attorney or law firm. Boss Fired Me does not control, monitor, or supervise the legal work performed by any attorney and assumes no responsibility for any act or omission by an attorney or for the outcome of any case.
            </p>
          </div>

          <div className="legal-section">
            <h2>Intellectual Property</h2>
            <p>
              All intellectual property on the Site, including but not limited to text, graphics, images, logos, trademarks, service marks, domain names, layout, and design, are owned by or licensed to Boss Fired Me and are protected by United States and international intellectual property laws. You may view and print materials from the Site solely for your personal, noncommercial use, provided that you do not remove any copyright, trademark, or proprietary notices. You may not modify, reproduce, distribute, transmit, display, perform, publish, license, create derivative works from, or otherwise exploit any content from the Site without our prior written permission.
            </p>
          </div>

          <div className="legal-section">
            <h2>Security and Data Transmission</h2>
            <p>
              You acknowledge that communications over the Internet, including the submission of information through the Site, may not be fully secure. While we take reasonable measures to protect your information, we cannot guarantee that unauthorized third parties will never be able to defeat those measures. By using the Site, you accept the inherent risks of transmitting data online. You are solely responsible for maintaining the confidentiality of your information and for restricting access to your device or account, if applicable.
            </p>
          </div>

          <div className="legal-section">
            <h2>Indemnification</h2>
            <p>
              You agree to indemnify, defend, and hold harmless Boss Fired Me, its affiliates, officers, directors, employees, contractors, agents, licensors, and suppliers from and against all claims, actions, demands, liabilities, damages, losses, costs, and expenses, including reasonable attorneys' fees, arising from or relating to your use of the Site, your violation of these Terms, or your violation of any rights of a third party. This indemnity obligation survives termination of your use of the Site.
            </p>
          </div>

          <div className="legal-section">
            <h2>Governing Law and Jurisdiction</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California, without regard to its conflict-of-law principles. Any dispute arising out of or relating to these Terms or to your use of the Site shall be resolved exclusively in the state or federal courts located in Los Angeles County, California. You consent to the personal jurisdiction of those courts and waive any objection to venue or inconvenient forum. You further agree that any cause of action you may have arising out of or relating to the Site must be commenced within one year after the cause of action accrues; otherwise, such cause of action is permanently barred.
            </p>
          </div>

          <div className="legal-section">
            <h2>Modifications to Terms</h2>
            <p>
              We may modify or update these Terms from time to time to reflect changes in our operations, applicable law, or technology. The revised Terms will be posted on this page with an updated effective date. Your continued use of the Site after the posting of any changes constitutes your acceptance of the revised Terms. It is your responsibility to review this page periodically for updates.
            </p>
          </div>

          <div className="legal-section">
            <h2>Severability and Entire Agreement</h2>
            <p>
              If any provision of these Terms is determined to be invalid, illegal, or unenforceable for any reason, the remaining provisions shall remain in full force and effect. Our failure to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. These Terms constitute the entire agreement between you and Boss Fired Me regarding your use of the Site and supersede any prior agreements or understandings, whether written or oral, relating to the same subject matter.
            </p>
          </div>

          <div className="legal-section">
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms or about the Site, you may contact us by email at <a href="mailto:info@bossfiredme.com">info@bossfiredme.com</a>. 
            </p>
          </div>

          <div className="legal-section">
            <p className="legal-intro" style={{ marginTop: '32px', padding: '20px', background: 'rgba(255, 215, 0, 0.1)', borderLeft: '3px solid #FFD700' }}>
              By continuing to access or use BossFiredMe.com, you acknowledge that you have read, understood, and agreed to these Terms of Use, and you affirm that you are at least eighteen years of age and legally competent to enter into this agreement.
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

