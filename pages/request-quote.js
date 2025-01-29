import { useState } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Title, TitleSm } from "@/components/common/Title"
import { supabase } from '@/lib/supabase'
import { motion } from 'framer-motion'
import { FiSend } from 'react-icons/fi'

const RequestQuote = () => {
  const router = useRouter()
  const { serviceId } = router.query
  
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
          service_id: parseInt(serviceId),
          ...formData
        })

      if (supabaseError) throw supabaseError

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  }

  if (success) {
    return (
      <section className='quote-request-page'>
        <div className='container'>
          <motion.div 
            className="success-message"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <h3>Thank you for your request!</h3>
            <p>We'll get back to you shortly with a detailed quote.</p>
            <button 
              className="button-primary"
              onClick={() => router.push('/services')}
            >
              Back to Services
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <>
      <Head>
        <title>Request a Quote - BluStudiosNepal</title>
      </Head>

      <section className='quote-request-page'>
        <div className='container'>
          <motion.div 
            className='heading-title'
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <TitleSm title='REQUEST A QUOTE' />
            <Title title="Let's Discuss Your Project" className='title-bg' />
            <p className="subtitle">Fill out the form below and we'll get back to you with a customized quote.</p>
          </motion.div>

          <motion.form 
            onSubmit={handleSubmit}
            className="quote-request-form"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {error && (
              <motion.div 
                className="error-message"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {error}
              </motion.div>
            )}

            <div className='form-grid'>
              <motion.div className='form-group' variants={itemVariants}>
                <label htmlFor="company_name">Company Name</label>
                <input
                  type="text"
                  id="company_name"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  placeholder="Your company name"
                />
              </motion.div>

              <motion.div className='form-group' variants={itemVariants}>
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
              </motion.div>

              <motion.div className='form-group' variants={itemVariants}>
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
              </motion.div>

              <motion.div className='form-group' variants={itemVariants}>
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your phone number"
                />
              </motion.div>

              <motion.div className='form-group' variants={itemVariants}>
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
              </motion.div>

              <motion.div className='form-group' variants={itemVariants}>
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
              </motion.div>

              <motion.div className='form-group full-width' variants={itemVariants}>
                <label htmlFor="project_details">Project Details</label>
                <textarea
                  id="project_details"
                  name="project_details"
                  value={formData.project_details}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us about your project requirements"
                ></textarea>
              </motion.div>
            </div>

            <motion.div 
              className="form-footer"
              variants={itemVariants}
            >
              <button 
                type="button" 
                className="button-secondary"
                onClick={() => router.push('/services')}
              >
                Back to Services
              </button>
              <button 
                type="submit" 
                className="button-primary"
                disabled={loading}
              >
                {loading ? (
                  <span>Submitting...</span>
                ) : (
                  <>
                    <span>Submit Request</span>
                    <FiSend />
                  </>
                )}
              </button>
            </motion.div>
          </motion.form>
        </div>
      </section>
    </>
  )
}

export default RequestQuote