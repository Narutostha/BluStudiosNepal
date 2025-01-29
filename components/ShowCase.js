import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { showcase } from "@/assets/data/dummydata"
import { Title, TitleSm } from "@/components/common/Title"
import { HiOutlineArrowRight } from "react-icons/hi"
import { useRouter } from 'next/router'

const ShowCase = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL')
  const router = useRouter()
  
  // Get unique categories
  const categories = ['ALL', ...new Set(showcase.map(item => item.catgeory))]
  
  // Filter projects based on selected category
  const filteredProjects = selectedCategory === 'ALL' 
    ? showcase
    : showcase.filter(project => project.catgeory === selectedCategory)

  const handleProjectClick = (projectId) => {
    router.push(`/showcase/${projectId}`)
  }

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

  return (
    <section className='showcase-section'>
      <div className='container'>
        <div className='heading-title'>
          <TitleSm title='SHOWCASE' />
          <Title title='Our Creative Portfolio' className='title-bg' />
          <p className="subtitle">Explore our diverse range of successful projects and creative solutions</p>
        </div>

        <motion.div 
          className="category-filters"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {categories.map((category) => (
            <motion.button
              key={category}
              className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category)}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {category.toLowerCase()}
              {selectedCategory === category && (
                <motion.span
                  className="active-indicator"
                  layoutId="activeCategory"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        <motion.div 
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="wait">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                className="project-card"
                variants={itemVariants}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                whileHover={{ y: -10 }}
              >
                <div className="card-image">
                  <img src={project.cover} alt={project.title} />
                  <div className="image-overlay">
                    <span className="category-tag">{project.catgeory}</span>
                  </div>
                </div>
                <div className="card-content">
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <motion.button 
                    className="view-project"
                    onClick={() => handleProjectClick(project.id)}
                    whileHover={{ gap: '12px' }}
                  >
                    View Project
                    <HiOutlineArrowRight className="arrow-icon" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}

export default ShowCase