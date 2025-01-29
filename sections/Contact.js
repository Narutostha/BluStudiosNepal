import { useState } from "react"
import { motion } from "framer-motion"
import { Title, TitleSm } from "@/components/common/Title"
import { AiFillBehanceCircle, AiFillInstagram, AiFillLinkedin } from "react-icons/ai"
import { BiUserCircle } from "react-icons/bi"
import { BsFacebook } from "react-icons/bs"
import { FiHeadphones, FiHelpCircle, FiSend } from "react-icons/fi"
import { IoLocationOutline } from "react-icons/io5"
import { HiOutlineArrowRight } from "react-icons/hi"

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    budget: "",
    timeframe: "",
    message: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setSubmitted(true)
    setFormData({
      name: "",
      email: "",
      budget: "",
      timeframe: "",
      message: ""
    })

    // Reset success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000)
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

  return (
    <motion.section 
      className='contact bg-top'
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className='container'>
        <motion.div 
          className='heading-title'
          variants={itemVariants}
        >
          <TitleSm title='CONTACT' />
          <Title title="Let's Create Something Amazing Together!" className='title-bg' />
          <p className="subtitle">We're excited to hear about your project. Drop us a line and let's start a conversation.</p>
        </motion.div>

        <div className='content py flex1'>
          <motion.div 
            className='left w-30'
            variants={containerVariants}
          >
            <div className='contact-details'>
              <motion.div 
                className='box'
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <FiHeadphones size={30} className='icons' />
                <div className="info">
                  <h3>Talk to Us</h3>
                  <p>1-001-234-5678</p>
                  <span>Mon - Fri: 9:00 - 19:00</span>
                </div>
              </motion.div>

              <motion.div 
                className='box'
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <IoLocationOutline size={30} className='icons' />
                <div className="info">
                  <h3>Visit Us</h3>
                  <p>New York Office</p>
                  <span>990 Madison Ave, NY 10022</span>
                </div>
              </motion.div>

              <motion.div 
                className='box'
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <FiHelpCircle size={30} className='icons' />
                <div className="info">
                  <h3>Email Us</h3>
                  <p>info@dream-theme.com</p>
                  <span>We'll respond within 24 hours</span>
                </div>
              </motion.div>

              <motion.div 
                className='box'
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
              >
                <BiUserCircle size={30} className='icons' />
                <div className="info">
                  <h3>Join Our Team</h3>
                  <p>hr@dream-theme.com</p>
                  <span>Careers at Seven Creative</span>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="social-links"
              variants={containerVariants}
            >
              <h3>Connect With Us</h3>
              <div className="social-icons">
                {[
                  { Icon: BsFacebook, link: "#" },
                  { Icon: AiFillBehanceCircle, link: "#" },
                  { Icon: AiFillInstagram, link: "#" },
                  { Icon: AiFillLinkedin, link: "#" }
                ].map((item, index) => (
                  <motion.a
                    key={index}
                    href={item.link}
                    variants={itemVariants}
                    whileHover={{ 
                      scale: 1.2,
                      rotate: 360,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <item.Icon size={25} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            className='right w-70'
            variants={containerVariants}
          >
            <div className="form-container">
              <motion.div 
                className="form-header"
                variants={itemVariants}
              >
                <TitleSm title='Start a Project' />
                <p>Fill out the form below to get started on your project.</p>
              </motion.div>

              <motion.form 
                onSubmit={handleSubmit}
                variants={containerVariants}
              >
                <div className='grid-2'>
                  <motion.div 
                    className='input-group'
                    variants={itemVariants}
                  >
                    <label>Your Name</label>
                    <input
                      type='text'
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="John Doe"
                    />
                  </motion.div>
                  <motion.div 
                    className='input-group'
                    variants={itemVariants}
                  >
                    <label>Email Address</label>
                    <input
                      type='email'
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </motion.div>
                </div>

                <div className='grid-2'>
                  <motion.div 
                    className='input-group'
                    variants={itemVariants}
                  >
                    <label>Project Budget</label>
                    <select 
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select budget range</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                      <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                      <option value="$50,000+">$50,000+</option>
                    </select>
                  </motion.div>
                  <motion.div 
                    className='input-group'
                    variants={itemVariants}
                  >
                    <label>Timeline</label>
                    <select
                      name="timeframe"
                      value={formData.timeframe}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select timeframe</option>
                      <option value="1-2 months">1-2 months</option>
                      <option value="2-4 months">2-4 months</option>
                      <option value="4-6 months">4-6 months</option>
                      <option value="6+ months">6+ months</option>
                    </select>
                  </motion.div>
                </div>

                <motion.div 
                  className='input-group'
                  variants={itemVariants}
                >
                  <label>Project Details</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    placeholder="Tell us about your project goals and requirements..."
                  ></textarea>
                </motion.div>

                <motion.div 
                  className="form-footer"
                  variants={itemVariants}
                >
                  <motion.button
                    className={`submit-button ${isSubmitting ? 'submitting' : ''} ${submitted ? 'submitted' : ''}`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="submitting-text">Sending...</span>
                    ) : submitted ? (
                      <span className="success-text">
                        Message Sent Successfully!
                        <HiOutlineArrowRight className="success-icon" />
                      </span>
                    ) : (
                      <span className="default-text">
                        Send Message
                        <FiSend className="send-icon" />
                      </span>
                    )}
                  </motion.button>
                </motion.div>
              </motion.form>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact