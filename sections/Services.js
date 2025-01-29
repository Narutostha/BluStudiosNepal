import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useRouter } from 'next/router'
import { serviceCategories, servicesList } from "@/assets/data/dummydata"
import { Title, TitleSm } from "@/components/common/Title"
import { HiArrowLeft, HiOutlineArrowRight } from 'react-icons/hi'
import { RiPulseLine } from 'react-icons/ri'

const Services = () => {
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState(1)
  const [selectedService, setSelectedService] = useState(null)
  const [isNavigating, setIsNavigating] = useState(false)
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  })

  const filteredServices = servicesList.filter(
    service => service.categoryId === selectedCategory
  )

  const handleQuoteRequest = async (serviceId) => {
    if (isNavigating) return
    setIsNavigating(true)
    try {
      await router.push(`/request-quote?serviceId=${serviceId}`)
    } catch (err) {
      console.error('Navigation error:', err)
      setIsNavigating(false)
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
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className='services-section' ref={ref}>
      <motion.div 
        className='container'
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <div className='heading-title'>
          <TitleSm title='SERVICES' />
          <Title title='Transform Your Vision Into Reality' className='title-bg' />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2 }}
          >
            Discover our comprehensive range of services designed to elevate your business
          </motion.p>
        </div>

        <motion.div 
          className='service-categories'
          variants={containerVariants}
        >
          {serviceCategories.map((category) => (
            <motion.button
              key={category.id}
              className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(category.id)
                setSelectedService(null)
              }}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className='icon'>{category.icon}</span>
              <span>{category.name}</span>
              {selectedCategory === category.id && (
                <motion.span
                  className="active-indicator"
                  layoutId="activeCategory"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedService ? (
            <motion.div 
              className='services-grid'
              key="services-grid"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
            >
              {filteredServices.map((service) => (
                <motion.div
                  key={service.id}
                  className='service-card'
                  onClick={() => setSelectedService(service)}
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.03,
                    transition: { duration: 0.2 }
                  }}
                >
                  <div className='card-content'>
                    <motion.div 
                      className='icon-wrapper'
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      {service.icon}
                    </motion.div>
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                    <ul className='features-preview'>
                      {service.features.slice(0, 3).map((feature, index) => (
                        <li key={index}>
                          <RiPulseLine className="pulse-icon" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <motion.button 
                      className='explore-btn'
                      whileHover={{ gap: '1.5rem' }}
                    >
                      Explore Service
                      <HiOutlineArrowRight />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="service-details"
              className='service-details'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <button 
                className='back-btn'
                onClick={() => setSelectedService(null)}
              >
                <HiArrowLeft />
                Back to Services
              </button>

              <div className='details-content'>
                <motion.div 
                  className='details-header'
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className='icon-wrapper'>
                    {selectedService.icon}
                  </div>
                  <h2>{selectedService.title}</h2>
                  <p>{selectedService.description}</p>
                </motion.div>

                <motion.div 
                  className='details-body'
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div className='features-section'>
                    <h3>Key Features</h3>
                    <div className='features-grid'>
                      {selectedService.features.map((feature, index) => (
                        <motion.div
                          key={index}
                          className='feature-item'
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.1 * index }}
                        >
                          <RiPulseLine className="feature-icon" />
                          <span>{feature}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className='tech-process-section'>
                    <div className='technologies'>
                      <h3>Technologies</h3>
                      <div className='tech-tags'>
                        {selectedService.technologies.map((tech, index) => (
                          <motion.span
                            key={index}
                            className='tech-tag'
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.1 * index }}
                            whileHover={{ scale: 1.1 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <motion.div 
                      className='pricing-cta'
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <div className='pricing'>
                        <h3>Investment</h3>
                        <p className='price'>{selectedService.price}</p>
                      </div>
                      <motion.button
                        className='cta-button'
                        onClick={() => handleQuoteRequest(selectedService.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        disabled={isNavigating}
                      >
                        {isNavigating ? 'Loading...' : 'Request a Quote'}
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}

export default Services