import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../LanguageContext.jsx'
import './PrivacyPolicy.css'

export default function PrivacyPolicy() {
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
          <h1>Privacy Policy</h1>
          
          <div className="legal-meta">
            <p><strong>Effective Date:</strong> {effectiveDate}</p>
            <p><strong>Last Updated:</strong> {lastUpdated}</p>
          </div>

          <div className="legal-section">
            <p className="legal-intro">
              This Privacy Policy explains how BossFiredMe.com ("Boss Fired Me," "we," "us," or "our") collects, uses, discloses, and safeguards personal information in connection with your access to and use of our website located at www.bossfiredme.com and any related pages or forms that we operate (collectively, the "Site"). We are based in California and connect individuals with independent, licensed California employment attorneys. We are not a law firm and we do not provide legal advice. By accessing or using the Site, you consent to the practices described in this Privacy Policy. If you do not agree with any term herein, you should discontinue use of the Site.
            </p>
          </div>

          <div className="legal-section">
            <h2>Scope and Who This Policy Covers</h2>
            <p>
              This Privacy Policy covers personal information that relates to an identified or identifiable individual and that we handle in the course of operating the Site and offering our referral and matching services. It applies to information collected directly from you through forms, emails, phone or text communications you initiate with us, and to information collected automatically when you browse the Site. This Policy is intended to meet the requirements of California law, including the California Consumer Privacy Act as amended by the California Privacy Rights Act (together, the "CCPA"). If you reside outside California, the fundamental practices described here still apply to you, but the specific rights and processes described for California residents may not apply or may apply differently.
            </p>
          </div>

          <div className="legal-section">
            <h2>The Information We Collect</h2>
            <p>
              We collect personal information that you provide voluntarily when you choose to interact with the Site or with us. This includes identification and contact data such as your name, email address, telephone number, and any other information you include in a message or form field. Because our Site is intended to connect you with an employment attorney, you may choose to submit facts about your work history and circumstances, dates of events, employer names, job titles, locations, and other information you believe is relevant to an intake or preliminary evaluation. We ask that you share only the information necessary for us to facilitate a referral and that you avoid providing social security numbers, bank account numbers, medical record numbers, or other highly sensitive information unless we specifically request it for a defined purpose and you choose to provide it.
            </p>
            <p>
              We also collect information automatically through cookies, pixel tags, logs, and similar technologies when you visit the Site. This information may include your IP address, device identifiers, browser type and settings, operating system, referring URLs, pages visited, the order and timing of page views, and interactions with forms or buttons. This data helps us operate the Site, maintain security, measure traffic, and improve usability. Depending on your device or browser settings, this information may be associated with your device and, in some circumstances, with you.
            </p>
            <p>
              We obtain information from service providers who support our operations, such as analytics providers that help us understand how the Site is used, and hosting, email, or SMS vendors that enable communications. When you ask us to connect you with an attorney, we may receive limited feedback from the attorney or law firm confirming whether contact was successful and whether additional steps are required; this information allows us to administer the referral, address technical issues, and improve our service.
            </p>
          </div>

          <div className="legal-section">
            <h2>How We Use Personal Information</h2>
            <p>
              We use personal information to operate, maintain, and improve the Site and our referral service; to communicate with you about your inquiry, including acknowledging receipt, asking clarifying questions, and confirming that a referral has been made; to match you with one or more licensed California attorneys or law firms who may be able to evaluate your situation; to comply with law and enforce our Terms of Use; and to protect the security, integrity, and availability of the Site and our systems. When you submit a form describing your situation and asking to be connected with an attorney, we treat that submission as a direction from you to disclose the information you provided to one or more independent attorneys or law firms so that they can review your circumstances and determine whether to contact you for a free consultation.
            </p>
            <p>
              We rely on several legal bases to process personal information, including your consent when you submit information through the Site, our legitimate interests in operating and improving a secure online referral platform, the necessity of processing to perform our service at your request, and compliance with legal obligations such as responding to lawful requests and maintaining appropriate records.
            </p>
          </div>

          <div className="legal-section">
            <h2>How We Disclose Personal Information</h2>
            <p>
              We disclose personal information to service providers and contractors that support our operations and are contractually bound to handle information only for our documented purposes and to maintain appropriate confidentiality and security protections. We also disclose personal information to independent, licensed attorneys or their authorized staff when you request a referral or otherwise direct us to do so. We may disclose personal information when we believe in good faith that disclosure is necessary to comply with law, to respond to legal process, to protect our rights or the rights of others, to investigate or prevent fraud or abuse, or in connection with a corporate transaction such as a merger, acquisition, or asset transfer where the recipient will continue to honor the commitments described in this Policy.
            </p>
            <p>
              We do not sell personal information as that term is defined under the CCPA, and we do not share personal information for cross-context behavioral advertising. If our practices change, we will update this Policy and provide any legally required notices and choices.
            </p>
          </div>

          <div className="legal-section">
            <h2>Cookies, Analytics, and Your Choices</h2>
            <p>
              The Site uses first-party and, in some cases, third-party cookies or similar technologies to keep the Site functioning, to measure usage, and to remember certain choices you make. You can manage cookies by adjusting your browser settings to refuse or delete cookies. Doing so may affect certain features or functions. If you use a browser or plugin that supports the Global Privacy Control signal, we will treat that signal as a request to opt out of any sale or sharing of personal information as defined by California law. Because we do not sell or share personal information for cross-context behavioral advertising, the opt-out will be honored even though it does not change the operation of the Site.
            </p>
          </div>

          <div className="legal-section">
            <h2>Retention of Information</h2>
            <p>
              We retain personal information for as long as reasonably necessary to fulfill the purposes described in this Policy, to provide the requested referral, to comply with legal, tax, or accounting obligations, to resolve disputes, and to enforce our agreements. In general, intake information is retained for a period that allows us to administer the referral and address follow-up communications, after which it is archived or deleted consistent with our data retention schedule. We may retain de-identified or aggregated information that no longer reasonably identifies an individual for analytics or service improvement purposes.
            </p>
          </div>

          <div className="legal-section">
            <h2>Security</h2>
            <p>
              We employ reasonable administrative, technical, and physical safeguards that are designed to protect personal information against accidental, unlawful, or unauthorized access, destruction, loss, alteration, disclosure, or use. No method of transmission over the Internet or method of electronic storage is perfectly secure. Although we take steps to protect your information, we cannot guarantee absolute security. You are responsible for using secure devices and for the accuracy of the contact details you provide.
            </p>
          </div>

          <div className="legal-section">
            <h2>Children's Privacy</h2>
            <p>
              The Site is intended for individuals eighteen years of age or older. We do not knowingly collect personal information from minors. If we learn that we have inadvertently collected personal information from a child under eighteen, we will take appropriate steps to delete such information as required by law.
            </p>
          </div>

          <div className="legal-section">
            <h2>Your California Privacy Rights and How to Exercise Them</h2>
            <p>
              If you are a California resident, you have rights under the CCPA with respect to your personal information. These rights include the right to know the categories of personal information we collect, the sources of that information, our purposes for using it, the categories of recipients to whom information is disclosed, and the criteria we use to determine retention periods. You have the right to request access to the specific pieces of personal information we have collected about you, the right to request deletion of personal information subject to certain legal exceptions, and the right to request correction of inaccurate personal information. You also have the right to opt out of the sale or sharing of personal information for cross-context behavioral advertising and the right to limit the use and disclosure of sensitive personal information. Because we do not sell personal information and do not share personal information for cross-context behavioral advertising, and because we ask you not to submit sensitive personal information beyond what is necessary to facilitate a referral, these particular opt-out and limit rights are not implicated by our current practices.
            </p>
            <p>
              To exercise your California rights, you may contact us by email at <a href="mailto:info@bossfiredme.com">info@bossfiredme.com</a> or by telephone at (123) 456-7890 and indicate the nature of your request. We will take reasonable steps to verify your identity before fulfilling a request, which may include matching certain identifying information you previously provided with information in our records. If you authorize an agent to make a request on your behalf, we will require proof of the authorization and may still need to verify your identity directly. We will respond within the timeframe required by California law and will not discriminate against you for exercising any of your privacy rights.
            </p>
          </div>

          <div className="legal-section">
            <h2>Notice at Collection</h2>
            <p>
              When you submit information through the Site, you are providing identification and contact information, details about your employment circumstances as you choose to describe them, and technical information collected automatically from your device. We use this information to operate the Site, to respond to your inquiry, and to connect you with an independent, licensed California attorney at your request. We disclose this information to service providers that support our operations and to attorneys or law firms to whom you ask us to refer your matter. We do not sell personal information. We retain information for the period necessary to provide the requested service and to comply with our legal obligations. Additional details about our practices are contained throughout this Privacy Policy.
            </p>
          </div>

          <div className="legal-section">
            <h2>International Users</h2>
            <p>
              Our Site is operated from the United States and is intended for individuals located in California. If you access the Site from outside the United States, you understand that your information may be transferred to, stored in, and processed in the United States, where the data protection laws may differ from those in your jurisdiction. By using the Site, you consent to this transfer.
            </p>
          </div>

          <div className="legal-section">
            <h2>Third-Party Websites and Content</h2>
            <p>
              The Site may include links to third-party websites, plug-ins, or content that we do not control. When you click those links or interact with third-party content, you may be providing information directly to the third party. The privacy practices of those third parties are governed by their own policies, and we are not responsible for their actions or omissions.
            </p>
          </div>

          <div className="legal-section">
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in technology, our operations, or legal requirements. When we make material changes, we will update the "Last Updated" date at the top of this page and, when required, provide additional notice such as a banner or email. Your continued use of the Site after an update constitutes your acceptance of the revised Policy.
            </p>
          </div>

          <div className="legal-section">
            <h2>How to Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, our privacy practices, or your California privacy rights, please contact us by email at <a href="mailto:info@bossfiredme.com">info@bossfiredme.com</a> or by telephone at (123) 456-7890. You may also write to us at Boss Fired Me, [Street], [City], California [ZIP].
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

