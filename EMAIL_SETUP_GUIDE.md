# Email Setup Guide for Boss Fired Me

## Current Status
✅ **EmailJS Integration Complete** - Forms are ready to send emails
✅ **Fallback System** - If EmailJS fails, forms will open your email client with pre-filled content

## What You Need to Do

### Step 1: Create EmailJS Account
1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account
3. Verify your email address

### Step 2: Create Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (since you're using bfairooz1@gmail.com)
4. Connect your Gmail account
5. **Copy the Service ID** (you'll need this)

### Step 3: Create Email Templates

#### Contact Form Template:
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Subject:** Contact Form: {{subject}}

**Content:**
```
New Contact Form Submission

Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from Boss Fired Me website
Timestamp: {{timestamp}}
```

4. **Copy the Template ID**

#### Employment Case Form Template:
1. Create another template
2. Use this template:

**Subject:** Employment Case Submission - {{full_name}}

**Content:**
```
EMPLOYMENT CASE SUBMISSION

CONTACT INFORMATION:
Full Name: {{full_name}}
Phone: {{phone_number}}
Email: {{email_address}}

EMPLOYMENT BACKGROUND:
Employer Name: {{employer_name}}
Job Title: {{job_title}}
Work Location: {{work_location}}
Date of Hire: {{date_of_hire}}
Last Day Worked: {{last_day_worked}}
Currently Working: {{currently_working}}
Termination Type: {{termination_type}}
Hourly Rate/Salary: {{hourly_rate_salary}}

WHAT HAPPENED:
Description: {{what_happened}}
Why Terminated: {{why_terminated}}
Written Warning: {{written_warning}}
Severance Offer: {{severance_offer}}

WORKPLACE ISSUES:
{{workplace_issues}}

COMPLAINTS & DOCUMENTATION:
Complained to HR: {{complained_to_hr}}
Complaint Date: {{complaint_date}}
Documents: {{documents}}

ABOUT YOU:
Preferred Contact: {{preferred_contact}}
Best Time to Reach: {{best_time_to_reach}}
How Did You Hear: {{how_did_you_hear}}

---
Sent from Boss Fired Me Employment Case Form
Timestamp: {{timestamp}}
```

### Step 4: Get Your Public Key
1. Go to "Account" in EmailJS dashboard
2. **Copy your Public Key**

### Step 5: Update the Code
Replace these placeholders in your code:

**In Contact.jsx (line 28):**
```javascript
emailjs.init('YOUR_PUBLIC_KEY') // Replace with your actual EmailJS public key
```

**In Contact.jsx (lines 42-45):**
```javascript
const response = await emailjs.send(
  'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
  'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
  templateParams
)
```

**In EmploymentCaseForm.jsx (line 127):**
```javascript
emailjs.init('YOUR_PUBLIC_KEY') // Replace with your actual EmailJS public key
```

**In EmploymentCaseForm.jsx (lines 175-178):**
```javascript
const response = await emailjs.send(
  'YOUR_SERVICE_ID', // Replace with your EmailJS service ID
  'YOUR_TEMPLATE_ID', // Replace with your EmailJS template ID
  templateParams
)
```

## How It Works Now

### ✅ **Primary Method: EmailJS**
- Forms send emails directly to bfairooz1@gmail.com
- Professional email templates
- No user interaction required

### ✅ **Fallback Method: Email Client**
- If EmailJS fails, user's email client opens
- Pre-filled with all form data
- Ready to send to bfairooz1@gmail.com

## Testing
1. Fill out the contact form and click "Send"
2. Fill out the employment case form and click "Submit"
3. Check bfairooz1@gmail.com for emails

## Free EmailJS Limits
- 200 emails per month (free plan)
- Perfect for most small businesses
- Upgrade available if needed

## Need Help?
- EmailJS has excellent documentation
- Their support team is very helpful
- The setup takes about 10 minutes
