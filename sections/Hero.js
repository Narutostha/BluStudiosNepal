import { home } from "@/assets/data/dummydata"
import Banner from "@/components/Banner"
import Expertise from "@/components/Expertise"
import ShowCase from "@/components/ShowCase"
import Testimonial from "@/components/Testimonial"
import { Title, TitleLogo, TitleSm } from "@/components/common/Title"
import { BlogCard, Brand } from "@/components/router"
import { motion } from "framer-motion"

const Hero = () => {
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
    <>
      <motion.section 
        className='hero'
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className='container'>
          <motion.div variants={itemVariants}>
            <TitleLogo title='Studios Nepal' caption='Blu' className='logobg' />
          </motion.div>
          <motion.h1 
            className='hero-title'
            variants={itemVariants}
          >
            WE BUILD DIGITAL EXPERIENCES
          </motion.h1>

          <motion.div 
            className='sub-heading'
            variants={itemVariants}
          >
            <TitleSm title='WEBSITES' /> <span>.</span>
            <TitleSm title='BRANDING' /> <span>.</span>
            <TitleSm title='DIGITAL MARKETING' />
          </motion.div>
        </div>
      </motion.section>

      <motion.section 
        className='hero-sec'
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className='container'>
          <motion.div 
            className='heading-title'
            variants={itemVariants}
          >
            <Title title='The last digital agency you ll ever need' />
            <p>Suspendisse ut magna porttitor, sollicitudin ligula at, molestie dolor. Vivamus a ligula ut velit placerat egestas at id leo. Nulla ac volutpat nunc. Nulla facilisi. Pellentesque tempus tellusut magna porttitor scelerisque.</p>
          </motion.div>
          
          {home && home.length > 0 && (
            <motion.div 
              className='hero-content grid-4'
              variants={containerVariants}
            >
              {home.map((item, i) => (
                <motion.div 
                  className='box' 
                  key={i}
                  variants={itemVariants}
                >
                  <span className='green'>{item.icon}</span>
                  <br />
                  <br />
                  <h3>{item.title}</h3>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </motion.section>

      <Expertise />
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