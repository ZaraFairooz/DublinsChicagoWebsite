// Formspree email service - works immediately without setup
export const sendEmailFormspree = async (formData) => {
  try {
    // Contact form endpoint
    const response = await fetch('https://formspree.io/f/mnngynag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name || formData.fullName,
        email: formData.email || formData.emailAddress,
        phone: formData.phone || formData.phoneNumber,
        subject: formData.subject || `Employment Case - ${formData.fullName}`,
        message: formData.message || JSON.stringify(formData, null, 2),
        _replyto: formData.email || formData.emailAddress,
        _subject: formData.subject || `New Submission - ${formData.name || formData.fullName}`,
        _next: window.location.href
      })
    });

    if (response.ok) {
      return { success: true };
    } else {
      throw new Error('Formspree failed');
    }
  } catch (error) {
    console.error('Formspree error:', error);
    throw error;
  }
};

// Employment case form endpoint
export const sendEmploymentCaseFormspree = async (formData) => {
  try {
    const response = await fetch('https://formspree.io/f/mnngynag', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Contact Information
        full_name: formData.fullName,
        phone_number: formData.phoneNumber,
        email_address: formData.emailAddress,
        
        // Employment Background
        employer_name: formData.employerName,
        job_title: formData.jobTitle,
        work_location: formData.workLocation,
        date_of_hire: formData.dateOfHire,
        last_day_worked: formData.lastDayWorked,
        currently_working: formData.currentlyWorking ? 'Yes' : 'No',
        termination_type: formData.terminationType,
        hourly_rate_salary: formData.hourlyRateOrSalary,
        
        // What Happened
        what_happened: formData.whatHappened,
        why_terminated: formData.whyTerminated,
        written_warning: formData.writtenWarning,
        severance_offer: formData.severanceOffer,
        
        // Workplace Issues
        workplace_issues: formData.workplaceIssues.join(', '),
        
        // Complaints & Documentation
        complained_to_hr: formData.complainedToHR,
        complaint_date: formData.complaintDate,
        documents: formData.documents.join(', '),
        
        // About You
        preferred_contact: formData.preferredContact,
        best_time_to_reach: formData.bestTimeToReach,
        how_did_you_hear: formData.howDidYouHear,
        
        // Formspree settings
        _replyto: formData.emailAddress,
        _subject: `Employment Case Submission - ${formData.fullName}`,
        _next: window.location.href,
        _cc: 'bfairooz1@gmail.com'
      })
    });

    if (response.ok) {
      return { success: true };
    } else {
      throw new Error('Formspree failed');
    }
  } catch (error) {
    console.error('Formspree error:', error);
    throw error;
  }
};
