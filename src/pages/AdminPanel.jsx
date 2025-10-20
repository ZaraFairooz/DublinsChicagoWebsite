import { useState, useEffect } from 'react'
import { useLanguage } from '../LanguageContext.jsx'

export default function AdminPanel() {
  const { t } = useLanguage()
  const [submissions, setSubmissions] = useState([])
  const [selectedSubmission, setSelectedSubmission] = useState(null)

  useEffect(() => {
    // Load submissions from localStorage
    const storedSubmissions = JSON.parse(localStorage.getItem('formSubmissions') || '[]')
    setSubmissions(storedSubmissions.reverse()) // Show newest first
  }, [])

  const clearAllSubmissions = () => {
    if (confirm('Are you sure you want to clear all submissions?')) {
      localStorage.removeItem('formSubmissions')
      setSubmissions([])
      setSelectedSubmission(null)
    }
  }

  const exportSubmissions = () => {
    const dataStr = JSON.stringify(submissions, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = `form-submissions-${new Date().toISOString().split('T')[0]}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Form Submissions Admin Panel</h1>
      
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={exportSubmissions}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#007bff', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Export All Submissions
        </button>
        <button 
          onClick={clearAllSubmissions}
          style={{ 
            padding: '10px 20px', 
            backgroundColor: '#dc3545', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Clear All
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
        {/* Submissions List */}
        <div>
          <h2>Submissions ({submissions.length})</h2>
          <div style={{ maxHeight: '600px', overflowY: 'auto', border: '1px solid #ddd', borderRadius: '5px' }}>
            {submissions.length === 0 ? (
              <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
                No submissions yet
              </div>
            ) : (
              submissions.map((submission, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedSubmission(submission)}
                  style={{
                    padding: '15px',
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer',
                    backgroundColor: selectedSubmission === submission ? '#f0f0f0' : 'white'
                  }}
                >
                  <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                    {submission.data.name || submission.data.fullName || 'Unknown Name'}
                  </div>
                  <div style={{ fontSize: '0.9em', color: '#666' }}>
                    {new Date(submission.timestamp).toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.8em', color: '#888', marginTop: '5px' }}>
                    {submission.data.email || submission.data.emailAddress || 'No email'}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Submission Details */}
        <div>
          <h2>Submission Details</h2>
          {selectedSubmission ? (
            <div style={{ 
              padding: '20px', 
              border: '1px solid #ddd', 
              borderRadius: '5px',
              backgroundColor: '#f9f9f9',
              maxHeight: '600px',
              overflowY: 'auto'
            }}>
              <div style={{ marginBottom: '15px' }}>
                <strong>Submitted:</strong> {new Date(selectedSubmission.timestamp).toLocaleString()}
              </div>
              <pre style={{ 
                whiteSpace: 'pre-wrap', 
                fontSize: '14px',
                lineHeight: '1.4',
                backgroundColor: 'white',
                padding: '15px',
                borderRadius: '5px',
                border: '1px solid #ddd'
              }}>
                {JSON.stringify(selectedSubmission.data, null, 2)}
              </pre>
            </div>
          ) : (
            <div style={{ 
              padding: '40px', 
              textAlign: 'center', 
              color: '#666',
              border: '1px solid #ddd',
              borderRadius: '5px'
            }}>
              Select a submission to view details
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
