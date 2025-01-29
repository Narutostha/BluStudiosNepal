import React, { useState } from "react"
import { Title, TitleLogo } from "./common/Title"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"

const Banner = () => {
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    requirements: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

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
        .from('callback_requests')
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          requirements: formData.requirements
        })

      if (supabaseError) throw supabaseError

      setSuccess(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        requirements: ''
      })
      setTimeout(() => {
        setShowForm(false)
        setSuccess(false)
      }, 3000)
    } catch (err) {
      console.error('Form submission error:', err)
      setError('Failed to submit request. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className='banner'>
        <div className='container'>
          <div className='banner-content'>
            <Title title='We are looking forward to start a new project' /> <br />
            <TitleLogo title='Lets take your business to the next level!' />
          </div>
          <div className='banner-action'>
            <button 
              className='button-primary'
              onClick={() => setShowForm(true)}
            >
              Request a call-back
            </button>
          </div>

          {showForm && (
            <motion.div 
              className="callback-form-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="callback-form"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
              >
                <button 
                  className="close-button"
                  onClick={() => setShowForm(false)}
                >
                  ×
                </button>

                {success ? (
                  <div className="success-message">
                    <h3>Thank you for your request!</h3>
                    <p>We'll get back to you shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <h2>Request a Callback</h2>
                    <p>Fill out the form below and we'll contact you soon.</p>

                    {error && (
                      <div className="error-message">{error}</div>
                    )}

                    <div className="form-group">
                      <label htmlFor="name">Your Name *</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Reyaham"
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
                        placeholder="reyaham@example.com"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="phone">Phone Number *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="Your phone number"
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="requirements">Project Requirements</label>
                      <textarea
                        id="requirements"
                        name="requirements"
                        value={formData.requirements}
                        onChange={handleChange}
                        rows="4"
                        placeholder="Tell us about your project needs..."
                      ></textarea>
                    </div>

                    <button 
                      type="submit" 
                      className="submit-button"
                      disabled={loading}
                    >
                      {loading ? 'Submitting...' : 'Submit Request'}
                    </button>
                  </form>
                )}
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )
}

export default Banner