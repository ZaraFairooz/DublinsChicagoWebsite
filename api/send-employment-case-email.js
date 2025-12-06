import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const formData = req.body;

    // Validate required fields
    if (!formData.fullName || !formData.emailAddress) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER, // Your Gmail address
        pass: process.env.GMAIL_APP_PASSWORD, // Gmail App Password (not regular password)
      },
    });

    // Format the form data into a readable email
    const formatField = (label, value) => {
      if (value === null || value === undefined || value === '') {
        return `${label}: Not provided`;
      }
      if (Array.isArray(value)) {
        return `${label}: ${value.length > 0 ? value.join(', ') : 'None'}`;
      }
      if (typeof value === 'boolean') {
        return `${label}: ${value ? 'Yes' : 'No'}`;
      }
      return `${label}: ${value}`;
    };

    const emailText = `
Employment Case Questionnaire Submission

=== CONTACT INFORMATION ===
${formatField('Full Name', formData.fullName)}
${formatField('Email Address', formData.emailAddress)}
${formatField('Phone Number', formData.phoneNumber)}

=== EMPLOYMENT BACKGROUND ===
${formatField('Employer Name', formData.employerName)}
${formatField('Job Title', formData.jobTitle)}
${formatField('Work Location', formData.workLocation)}
${formatField('Date of Hire', formData.dateOfHire)}
${formatField('Last Day Worked', formData.lastDayWorked)}
${formatField('Currently Working', formData.currentlyWorking)}
${formatField('Termination Type', formData.terminationType)}
${formatField('Hourly Rate/Salary', formData.hourlyRateOrSalary)}

=== WHAT HAPPENED ===
${formatField('What Happened', formData.whatHappened)}
${formatField('Why Terminated', formData.whyTerminated)}
${formatField('Written Warning', formData.writtenWarning)}
${formatField('Severance Offer', formData.severanceOffer)}

=== WORKPLACE ISSUES ===
${formatField('Workplace Issues', formData.workplaceIssues)}

=== COMPLAINTS & DOCUMENTATION ===
${formatField('Complained to HR', formData.complainedToHR)}
${formatField('Complaint Date', formData.complaintDate)}
${formatField('Documents', formData.documents)}

=== ABOUT YOU ===
${formatField('Preferred Contact', formData.preferredContact)}
${formatField('Best Time to Reach', formData.bestTimeToReach)}
${formatField('How Did You Hear About Us', formData.howDidYouHear)}
    `.trim();

    const emailHtml = `
      <h2>Employment Case Questionnaire Submission</h2>
      
      <h3>Contact Information</h3>
      <p><strong>Full Name:</strong> ${formData.fullName || 'Not provided'}</p>
      <p><strong>Email Address:</strong> ${formData.emailAddress || 'Not provided'}</p>
      <p><strong>Phone Number:</strong> ${formData.phoneNumber || 'Not provided'}</p>
      
      <h3>Employment Background</h3>
      <p><strong>Employer Name:</strong> ${formData.employerName || 'Not provided'}</p>
      <p><strong>Job Title:</strong> ${formData.jobTitle || 'Not provided'}</p>
      <p><strong>Work Location:</strong> ${formData.workLocation || 'Not provided'}</p>
      <p><strong>Date of Hire:</strong> ${formData.dateOfHire || 'Not provided'}</p>
      <p><strong>Last Day Worked:</strong> ${formData.lastDayWorked || 'Not provided'}</p>
      <p><strong>Currently Working:</strong> ${formData.currentlyWorking ? 'Yes' : 'No'}</p>
      <p><strong>Termination Type:</strong> ${formData.terminationType || 'Not provided'}</p>
      <p><strong>Hourly Rate/Salary:</strong> ${formData.hourlyRateOrSalary || 'Not provided'}</p>
      
      <h3>What Happened</h3>
      <p><strong>What Happened:</strong></p>
      <p>${(formData.whatHappened || 'Not provided').replace(/\n/g, '<br>')}</p>
      <p><strong>Why Terminated:</strong></p>
      <p>${(formData.whyTerminated || 'Not provided').replace(/\n/g, '<br>')}</p>
      <p><strong>Written Warning:</strong> ${formData.writtenWarning || 'Not provided'}</p>
      <p><strong>Severance Offer:</strong> ${formData.severanceOffer || 'Not provided'}</p>
      
      <h3>Workplace Issues</h3>
      <p>${formData.workplaceIssues && formData.workplaceIssues.length > 0 ? formData.workplaceIssues.join(', ') : 'None'}</p>
      
      <h3>Complaints & Documentation</h3>
      <p><strong>Complained to HR:</strong> ${formData.complainedToHR || 'Not provided'}</p>
      <p><strong>Complaint Date:</strong> ${formData.complaintDate || 'Not provided'}</p>
      <p><strong>Documents:</strong> ${formData.documents && formData.documents.length > 0 ? formData.documents.join(', ') : 'None'}</p>
      
      <h3>About You</h3>
      <p><strong>Preferred Contact:</strong> ${formData.preferredContact || 'Not provided'}</p>
      <p><strong>Best Time to Reach:</strong> ${formData.bestTimeToReach || 'Not provided'}</p>
      <p><strong>How Did You Hear About Us:</strong> ${formData.howDidYouHear || 'Not provided'}</p>
    `;

    // Email content
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: 'info@bossfiredme.com',
      replyTo: formData.emailAddress,
      subject: `Employment Case Submission - ${formData.fullName}`,
      text: emailText,
      html: emailHtml,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ 
      error: 'Failed to send email', 
      details: error.message 
    });
  }
}

