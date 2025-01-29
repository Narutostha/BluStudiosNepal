import React, { useState } from "react"
import { Title } from "./common/Title"
import { expertise } from "@/assets/data/dummydata"
import { HiOutlineArrowRight } from "react-icons/hi"
import { motion, AnimatePresence } from "framer-motion"

const Expertise = () => {
  const [selectedExpertise, setSelectedExpertise] = useState(null)

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
    <section className='expertise'>
      <div className='container'>
        <motion.div 
          className='heading-title'
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <Title title='Our expertise' />
          <p>We combine creativity, technology, and strategy to deliver exceptional results</p>
        </motion.div>

        <div className='expertise-grid'>
          {!selectedExpertise ? (
            <motion.div 
              className='expertise-cards'
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {expertise && expertise.length > 0 && expertise.map((item) => (
                <motion.div
                  key={item.id}
                  className='expertise-card'
                  onClick={() => setSelectedExpertise(item)}
                  variants={itemVariants}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className='card-header'>
                    <span className='icon'>{item.icon}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <p className='short-desc'>{item.shortDesc}</p>
                  <div className='card-preview'>
                    {item.desc.slice(0, 4).map((service, index) => (
                      <div key={index} className='preview-item'>
                        <HiOutlineArrowRight className="arrow-icon" />
                        <span>{service.text}</span>
                      </div>
                    ))}
                  </div>
                  <button className='learn-more'>Learn More</button>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="expertise-details"
              className='expertise-details'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <button 
                className='back-btn'
                onClick={() => setSelectedExpertise(null)}
              >
                <HiOutlineArrowRight 
                  style={{ 
                    transform: 'rotate(180deg)',
                    color: '#00dc93'
                  }} 
                />
                Back to all expertise
              </button>

              <div className='details-content'>
                <motion.div 
                  className='details-header'
                  variants={itemVariants}
                >
                  <span className='icon'>{selectedExpertise.icon}</span>
                  <h2>{selectedExpertise.title}</h2>
                  <p>{selectedExpertise.shortDesc}</p>
                </motion.div>

                <div className='details-grid'>
                  <div className='services-list'>
                    <h3>Our Services</h3>
                    <div className='services-scroll'>
                      {selectedExpertise.desc.map((service, index) => (
                        <motion.div 
                          key={index} 
                          className='service-item'
                          variants={itemVariants}
                          initial="hidden"
                          animate="visible"
                          custom={index}
                        >
                          <h4>{service.text}</h4>
                          <p>{service.details}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  <div className='details-sidebar'>
                    <div className='technologies'>
                      <h3>Technologies</h3>
                      <div className='tech-tags'>
                        {selectedExpertise.technologies.map((tech, index) => (
                          <motion.span 
                            key={index} 
                            className='tech-tag'
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            custom={index}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    <div className='process'>
                      <h3>Our Process</h3>
                      <div className='process-steps'>
                        {selectedExpertise.process.map((step, index) => (
                          <motion.div 
                            key={index} 
                            className='process-step'
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            custom={index}
                          >
                            <span className='step-number'>{index + 1}</span>
                            <span className='step-name'>{step}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

export default Expertise