import './App.css'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand">Boss Fired Me</Link>
        <nav className="nav">
          <Link to="/#services">Services</Link>
          <Link to="/#how-it-works">How it works</Link>
          <Link to="/#faq">FAQ</Link>
          <Link to="/contact">Contact</Link>
          <a className="btn btn-primary" href="#get-started">Get Started</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <h1 className="hero-title">No fees, unless you win</h1>
        <p className="subtitle">Wrongfully terminated or mistreated at work? We connect you with employment attorneys who can help.</p>
        <a className="btn btn-accent" href="#get-started">Start your case</a>
      </div>
    </section>
  )
}

function Steps() {
  return (
    <section id="how-it-works" className="section steps">
      <div className="container">
        <div className="layout">
          <div className="left">
            <h2>Three easy steps</h2>
            <div className="grid three">
              <div className="card step">
                <div className="step-num">1</div>
                <h3>Tell us what happened</h3>
                <p>Share the basics about your job, what happened, and when. We are here to hear you and help you.</p>
              </div>
              <div className="card step">
                <div className="step-num">2</div>
                <h3>Get matched with a lawyer</h3>
                <p>We find you the best employment attorney that matches exactly what you need.</p>
              </div>
              <div className="card step">
                <div className="step-num">3</div>
                <h3>Move forward with confidence</h3>
                <p>You relax and we handle the rest.</p>
              </div>
            </div>
          </div>
          <div className="right"></div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="section services">
      <div className="container">
        <h2>We help with tough work situations</h2>
        <div className="grid three">
          <div className="card service">
            <h3>Wrongful Termination</h3>
            <p>Fired unfairly or without cause? Learn your rights and options.</p>
          </div>
          <div className="card service">
            <h3>Discrimination</h3>
            <p>Race, gender, age, disability, pregnancy—discrimination is illegal.</p>
          </div>
          <div className="card service">
            <h3>Harassment</h3>
            <p>Hostile work environment or harassment from a manager or coworker.</p>
          </div>
          <div className="card service">
            <h3>Retaliation</h3>
            <p>Demoted or fired after reporting misconduct or taking protected leave.</p>
          </div>
          <div className="card service">
            <h3>Wage & Hour</h3>
            <p>Unpaid wages, overtime issues, misclassification, or missed breaks.</p>
          </div>
          <div className="card service">
            <h3>Severance Reviews</h3>
            <p>Get a clear read on severance terms before you sign anything.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FundingCTA() {
  return (
    <section id="get-started" className="section cta">
      <div className="container cta-inner">
        <div>
          <h2>Start now! Talk to one our lawyers. </h2>
          <p>Get a response in as fast as an hour.</p>
        </div>
        <a className="btn btn-primary btn-lg" href="#contact-form">See if you qualify</a>
      </div>
    </section>
  )
}

function FAQ() {
  return (
    <section id="faq" className="section faq">
      <div className="container">
        <h2>Common questions</h2>
        <details>
          <summary>Do I have to pay anything upfront?</summary>
          <p>Using Boss Fired Me is free. Your attorney will explain their fees if you choose to proceed.</p>
        </details>
        <details>
          <summary>How fast can I speak with a lawyer?</summary>
          <p>Many people are matched within 24–48 hours, and urgent cases can be faster.</p>
        </details>
        <details>
          <summary>What if I’m not sure what kind of case I have?</summary>
          <p>That’s okay. Share what happened and we’ll point you in the right direction.</p>
        </details>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="brand">Boss Fired Me</div>
        <div className="muted">© {new Date().getFullYear()} Boss Fired Me. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default function App() {
  useEffect(() => {
    const onScroll = () => {
      const max = 240;
      const y = Math.min(window.scrollY, max);
      const t = y / max;
      const scale = 1 - t * 0.4; // 1 -> 0.6
      const opacity = 1 - t * 0.25; // 1 -> 0.75
      document.documentElement.style.setProperty('--hero-scale', String(scale));
      document.documentElement.style.setProperty('--hero-opacity', String(opacity));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <>
      <Hero />
      <Steps />
      <Services />
      <FundingCTA />
      <FAQ />
    </>
  )
}
