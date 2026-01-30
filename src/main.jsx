import React, { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useLocation, Link } from 'react-router-dom'
import './index.css'
import App, { Header, Footer } from './App.jsx'
import Contact from './pages/Contact.jsx'
import EmploymentCaseForm from './pages/EmploymentCaseForm.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import ThankYou from './pages/ThankYou.jsx'
import PrivacyPolicy from './pages/PrivacyPolicy.jsx'
import TermsOfUse from './pages/TermsOfUse.jsx'
import DataOptOut from './pages/DataOptOut.jsx'
import Menu from './pages/Menu.jsx'
import { LanguageProvider, useLanguage } from './LanguageContext.jsx'
import { useContext } from 'react'
import { LanguageContext } from './LanguageContext.jsx'

function ScrollToHash() {
  const { hash } = useLocation()
  React.useEffect(() => {
    if (!hash) return
    const id = hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [hash])
  return null
}

function EngagementModalContent({ onClose }) {
  const context = useContext(LanguageContext)
  const t = context ? context.t : (key) => key === 'no' ? 'No' : 'Yes'
  
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-body">
          <h3>Ready to visit Dublin's Bar & Grill?</h3>
        </div>
        <div className="modal-actions">
          <button className="btn" onClick={onClose}>{t('no')}</button>
          <a className="btn btn-primary" href="tel:+13122666340" onClick={onClose}>Call Us</a>
        </div>
      </div>
    </div>
  )
}

function EngagementModal() {
  const [open, setOpen] = useState(false)
  
  useEffect(() => {
    const shown = sessionStorage.getItem('bfm_modal_shown')
    if (shown) return
    const timer = setTimeout(() => {
      setOpen(true)
      sessionStorage.setItem('bfm_modal_shown', '1')
    }, 5000)
    return () => clearTimeout(timer)
  }, [])
  
  if (!open) return null
  
  return <EngagementModalContent onClose={() => setOpen(false)} />
}

function Layout({ children }) {
  return (
    <div className="app">
      <Header />
      <ScrollToHash />
      <EngagementModal />
      {children}
      <Footer />
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Layout>
        <App />
      </Layout>
    ),
  },
  {
    path: '/menu',
    element: (
      <Layout>
        <Menu />
      </Layout>
    ),
  },
  {
    path: '/contact',
    element: (
      <Layout>
        <Contact />
      </Layout>
    ),
  },
  {
    path: '/employment-case-form',
    element: (
      <Layout>
        <EmploymentCaseForm />
      </Layout>
    ),
  },
  {
    path: '/thank-you',
    element: (
      <Layout>
        <ThankYou />
      </Layout>
    ),
  },
  {
    path: '/privacy',
    element: (
      <Layout>
        <PrivacyPolicy />
      </Layout>
    ),
  },
  {
    path: '/terms',
    element: (
      <Layout>
        <TermsOfUse />
      </Layout>
    ),
  },
  {
    path: '/data-opt-out',
    element: (
      <Layout>
        <DataOptOut />
      </Layout>
    ),
  },
  {
    path: '/admin',
    element: (
      <Layout>
        <AdminPanel />
      </Layout>
    ),
  },
])

function AppWithRouter() {
  return <RouterProvider router={router} />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <AppWithRouter />
    </LanguageProvider>
  </StrictMode>,
)
