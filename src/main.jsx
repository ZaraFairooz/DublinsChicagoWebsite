import React, { StrictMode, useEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider, useLocation, Link } from 'react-router-dom'
import './index.css'
import App, { Header, Footer } from './App.jsx'
import Contact from './pages/Contact.jsx'
import EmploymentCaseForm from './pages/EmploymentCaseForm.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import { LanguageProvider, useLanguage } from './LanguageContext.jsx'

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

function EngagementModal() {
  const [open, setOpen] = useState(false)
  const { t } = useLanguage()
  
  useEffect(() => {
    const shown = sessionStorage.getItem('bfm_modal_shown')
    if (shown) return
    const t = setTimeout(() => {
      setOpen(true)
      sessionStorage.setItem('bfm_modal_shown', '1')
    }, 5000)
    return () => clearTimeout(t)
  }, [])
  if (!open) return null
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true">
      <div className="modal">
        <div className="modal-body">
          <h3>Do you have a situation our lawyers can help with?</h3>
        </div>
        <div className="modal-actions">
          <button className="btn" onClick={() => setOpen(false)}>{t('no')}</button>
          <Link className="btn btn-primary" to="/employment-case-form" onClick={() => setOpen(false)}>{t('yes')}</Link>
        </div>
      </div>
    </div>
  )
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
    path: '/admin',
    element: (
      <Layout>
        <AdminPanel />
      </Layout>
    ),
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
      <RouterProvider router={router} />
    </LanguageProvider>
  </StrictMode>,
)
