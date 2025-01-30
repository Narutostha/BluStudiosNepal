import { home } from "@/assets/data/dummydata"
import Banner from "@/components/Banner"
import Expertise from "@/components/Expertise"
import ShowCase from "@/components/ShowCase"
import Testimonial from "@/components/Testimonial"
import { Title, TitleLogo, TitleSm } from "@/components/common/Title"
import { BlogCard, Brand } from "@/components/router"
import { motion } from "framer-motion"
import { FaRocket, FaLightbulb, FaChartLine } from 'react-icons/fa'
import { BsStars } from 'react-icons/bs'

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  }

  const scrollToExpertise = () => {
    const expertiseSection = document.getElementById('expertise');
    if (expertiseSection) {
      expertiseSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const statsData = [
    {
      icon: <FaRocket size={35} />,
      number: "10+",
      text: "Years Innovating",
      color: "#FF6B6B",
      description: "Leading digital transformation"
    },
    {
      icon: <FaLightbulb size={35} />,
      number: "50+",
      text: "Creative Solutions",
      color: "#4ECDC4",
      description: "Unique digital experiences"
    },
    {
      icon: <FaChartLine size={35} />,
      number: "100+",
      text: "Success Stories",
      color: "#FFE66D",
      description: "Satisfied global clients"
    },
    {
      icon: <BsStars size={35} />,
      number: "95%",
      text: "Client Success",
      color: "#FF8C42",
      description: "Exceeding expectations"
    }
  ]

  return (
    <>
      <motion.section 
        className='hero'
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className='hero-background'>
          <div className='gradient-overlay'></div>
          <div className='pattern-overlay'></div>
        </div>
        
        <div className='container hero-content'>
          <motion.div 
            className="hero-header"
            variants={itemVariants}
          >
            <TitleLogo title='Studios' caption='Blu ' className='logobg' />
            
            <motion.h1 
              className='hero-title'
              variants={itemVariants}
            >
              <span className="gradient-text">Transform</span> Your Digital Presence
            </motion.h1>

            <motion.p 
              className="hero-subtitle"
              variants={itemVariants}
            >
              We craft exceptional digital experiences that drive growth and innovation
            </motion.p>

            <motion.div 
              className="hero-cta"
              variants={itemVariants}
            >
              <button className="primary-button">
                Get Started
                <motion.span 
                  className="button-arrow"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                >
                  →
                </motion.span>
              </button>
              <button className="secondary-button" onClick={scrollToExpertise}>
                Our Expertise
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            className='stats-grid'
            variants={containerVariants}
          >
            {statsData.map((stat, index) => (
              <motion.div 
                className='stat-card' 
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.03,
                  transition: { type: "spring", stiffness: 300 }
                }}
              >
                <div className='stat-icon' style={{ color: stat.color }}>
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                </div>
                <div className="stat-content">
                  <h2 className='stat-number' style={{ color: stat.color }}>
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {stat.number}
                    </motion.span>
                  </h2>
                  <h3 className='stat-text'>{stat.text}</h3>
                  <p className='stat-description'>{stat.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <div id="expertise">
        <Expertise />
      </div>
      <Banner />
      <Testimonial />
      <ShowCase />
      <Brand />

      <div className='text-center'>
        <Title title='Latest news & articles' />
      </div>
      <BlogCard />
    </>
  )
}

export default Hero