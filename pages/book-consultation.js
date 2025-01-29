import { useState } from 'react'
import { motion } from 'framer-motion'
import Head from 'next/head'
import { Title, TitleSm } from "@/components/common/Title"
import { FiSend } from 'react-icons/fi'
import { supabase } from '@/lib/supabase'

const BookConsultation = () => {
  const [formData, setFormData] = useState({
    email: '',
    companyName: '',
    personName: '',
    contactInfo: '',
    productsServices: '',
    focusProducts: '',
    shortTermGoals: '',
    longTermGoals: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ success: false, message: '' })

    try {
      const { error } = await supabase
        .from('consultations')
        .insert({
          email: formData.email,
          company_name: formData.companyName,
          person_name: formData.personName,
          contact_info: formData.contactInfo,
          products_services: formData.productsServices,
          focus_products: formData.focusProducts,
          short_term_goals: formData.shortTermGoals,
          long_term_goals: formData.longTermGoals
        })

      if (error) throw error

      setSubmitStatus({
        success: true,
        message: 'Thank you! Your consultation request has been submitted successfully. We\'ll contact you soon.'
      })
      setFormData({
        email: '',
        companyName: '',
        personName: '',
        contactInfo: '',
        productsServices: '',
        focusProducts: '',
        shortTermGoals: '',
        longTermGoals: ''
      })
    } catch (error) {
      console.error('Submission error:', error)
      setSubmitStatus({
        success: false,
        message: 'Something went wrong. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Head>
        <title>Book a Consultation - BluStudiosNepal</title>
      </Head>

      <section className='consultation-page bg-top'>
        <div className='container'>
          <div className='heading-title'>
            <TitleSm title='BOOK A CONSULTATION' />
            <Title title="Let's Discuss Your Business Goals" className='title-bg' />
            <p className="subtitle">Fill out the form below to help us understand your business better.</p>
          </div>

          <div className="consultation-form-container">
            <form onSubmit={handleSubmit}>
              <div className='form-grid'>
                <div className='input-group'>
                  <label>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                  />
                </div>

                <div className='input-group'>
                  <label>Company Name *</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    placeholder="Your company name"
                  />
                </div>

                <div className='input-group'>
                  <label>Person Filling The Form *</label>
                  <input
                    type="text"
                    name="personName"
                    value={formData.personName}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                  />
                </div>

                <div className='input-group'>
                  <label>Contact Information *</label>
                  <input
                    type="text"
                    name="contactInfo"
                    value={formData.contactInfo}
                    onChange={handleChange}
                    required
                    placeholder="Phone number or preferred contact method"
                  />
                </div>

                <div className='input-group full-width'>
                  <label>What are your products & services? (tell us about in detail) *</label>
                  <textarea
                    name="productsServices"
                    value={formData.productsServices}
                    onChange={handleChange}
                    required
                    rows="4"
                    placeholder="Describe your current products and services..."
                  ></textarea>
                </div>

                <div className='input-group full-width'>
                  <label>What are the products/services you want to focus the most on? *</label>
                  <textarea
                    name="focusProducts"
                    value={formData.focusProducts}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Tell us about your priority products/services..."
                  ></textarea>
                </div>

                <div className='input-group full-width'>
                  <label>What are your short term goals? *</label>
                  <textarea
                    name="shortTermGoals"
                    value={formData.shortTermGoals}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Describe your goals for the next 6-12 months..."
                  ></textarea>
                </div>

                <div className='input-group full-width'>
                  <label>What are your long term goals? *</label>
                  <textarea
                    name="longTermGoals"
                    value={formData.longTermGoals}
                    onChange={handleChange}
                    required
                    rows="3"
                    placeholder="Describe your goals beyond 12 months..."
                  ></textarea>
                </div>
              </div>

              {submitStatus.message && (
                <div className={`status-message ${submitStatus.success ? 'success' : 'error'}`}>
                  {submitStatus.message}
                </div>
              )}

              <div className="form-footer">
                <button
                  type="submit"
                  className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span>Submitting...</span>
                  ) : (
                    <>
                      <span>Submit Consultation Request</span>
                      <FiSend className="send-icon" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default BookConsultation