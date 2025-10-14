export default function Contact() {
  return (
    <section className="section contact-page">
      <div className="contact-bg"></div>
      <div className="contact-overlay"></div>
      <div className="container" id="contact-form">
        <h1>Contact us</h1>
        <form className="contact-form">
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="name">Full name</label>
              <input id="name" name="name" type="text" placeholder="Enter your name" required />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="Enter your email" required />
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" placeholder="Enter your phone number" />
            </div>
            <div className="form-field">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" placeholder="Example: Wrongful termination" />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={6} placeholder="Briefly describe what happened" />
          </div>
          <button type="submit" className="btn btn-primary btn-lg">Send</button>
        </form>
      </div>
    </section>
  )
}

