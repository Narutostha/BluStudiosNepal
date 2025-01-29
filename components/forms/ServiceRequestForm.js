import { useState } from 'react'
import { supabase } from '@/lib/supabase'

const ServiceRequestForm = ({ service, onClose }) => {
  const [formData, setFormData] = useState({
    company_name: '',
    contact_name: '',
    email: '',
    phone: '',
    budget_range: '',
    timeline: '',
    project_details: ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const { error: supabaseError } = await supabase
        .from('service_quote_requests')
        .insert({
          service_id: service.id,
          ...formData
        })

      if (supabaseError) {
        throw supabaseError
      }

      setSuccess(true)
      setFormData({
        company_name: '',
        contact_name: '',
        email: '',
        phone: '',
        budget_range: '',
        timeline: '',
        project_details: ''
      })
    } catch (err) {
      console.error('Form submission error:', err)
      setError('Failed to submit form. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="success-message">
        <h3>Thank you for your request!</h3>
        <p>We'll get back to you shortly.</p>
        <button className="button-primary" onClick={onClose}>Close</button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="service-request-form">
      <div className="form-header">
        <h2>Request {service.title}</h2>
        <p>Please fill out the form below and we'll get back to you shortly.</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="company_name">Company Name</label>
          <input
            type="text"
            id="company_name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Your company name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contact_name">Contact Name *</label>
          <input
            type="text"
            id="contact_name"
            name="contact_name"
            value={formData.contact_name}
            onChange={handleChange}
            required
            placeholder="Your full name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email Address *</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your@email.com"
          />
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Your phone number"
          />
        </div>

        <div className="form-group">
          <label htmlFor="budget_range">Budget Range</label>
          <select
            id="budget_range"
            name="budget_range"
            value={formData.budget_range}
            onChange={handleChange}
          >
            <option value="">Select budget range</option>
            <option value="$1,000 - $5,000">$1,000 - $5,000</option>
            <option value="$5,000 - $10,000">$5,000 - $10,000</option>
            <option value="$10,000 - $25,000">$10,000 - $25,000</option>
            <option value="$25,000+">$25,000+</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="timeline">Project Timeline</label>
          <select
            id="timeline"
            name="timeline"
            value={formData.timeline}
            onChange={handleChange}
          >
            <option value="">Select timeline</option>
            <option value="Less than 1 month">Less than 1 month</option>
            <option value="1-3 months">1-3 months</option>
            <option value="3-6 months">3-6 months</option>
            <option value="6+ months">6+ months</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label htmlFor="project_details">Project Details</label>
          <textarea
            id="project_details"
            name="project_details"
            value={formData.project_details}
            onChange={handleChange}
            rows="4"
            placeholder="Tell us about your project requirements"
          ></textarea>
        </div>
      </div>

      <div className="form-footer">
        <button type="button" className="button-secondary" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="button-primary" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </div>
    </form>
  )
}

export default ServiceRequestForm