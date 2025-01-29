import { useState } from 'react'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import { showcase } from "@/assets/data/dummydata"
import { Title, TitleSm } from "@/components/common/Title"
import { HiArrowLeft } from 'react-icons/hi'
import Head from 'next/head'

const ShowcaseDetail = () => {
  const router = useRouter()
  const { id } = router.query
  const [imageLoaded, setImageLoaded] = useState(false)

  // Only try to find the project if we have an id
  const project = id ? showcase.find(p => p.id === parseInt(id)) : null

  if (!project && id) {
    return (
      <div className="container py">
        <div className="text-center">
          <h2>Project not found</h2>
          <button 
            className="button-primary mt-4"
            onClick={() => router.push('/showcase')}
          >
            Back to Showcase
          </button>
        </div>
      </div>
    )
  }

  // Return null during initial server-side render
  if (!project) {
    return null
  }

  return (
    <>
      <Head>
        <title>{project.title} - Showcase | BluStudiosNepal</title>
      </Head>

      <section className='showcase-detail bg-top'>
        <div className='container'>
          <motion.button
            className='back-button'
            onClick={() => router.back()}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <HiArrowLeft />
            <span>Back to Showcase</span>
          </motion.button>

          <div className='heading-title'>
            <TitleSm title={project.catgeory} />
            <Title title={project.title} className='title-bg' />
          </div>

          <motion.div 
            className='project-content'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className='project-image'>
              <motion.img
                src={project.cover}
                alt={project.title}
                initial={{ opacity: 0 }}
                animate={{ opacity: imageLoaded ? 1 : 0 }}
                transition={{ duration: 0.5 }}
                onLoad={() => setImageLoaded(true)}
              />
            </div>

            <div className='project-info'>
              <div className='info-section'>
                <h3>Project Overview</h3>
                <p>{project.description}</p>
              </div>

              <div className='info-section'>
                <h3>Challenge</h3>
                <p>{project.challenge}</p>
              </div>

              <div className='info-section'>
                <h3>Solution</h3>
                <p>We developed a comprehensive solution that included:</p>
                <ul>
                  {project.solution.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className='info-section'>
                <h3>Results</h3>
                <div className='results-grid'>
                  <div className='result-item'>
                    <span className='number'>{project.results.engagement}</span>
                    <span className='label'>Increase in Engagement</span>
                  </div>
                  <div className='result-item'>
                    <span className='number'>{project.results.conversion}</span>
                    <span className='label'>Conversion Rate</span>
                  </div>
                  <div className='result-item'>
                    <span className='number'>{project.results.growth}</span>
                    <span className='label'>Growth</span>
                  </div>
                </div>
              </div>

              <div className='info-section'>
                <h3>Technologies Used</h3>
                <div className='tech-tags'>
                  {project.technologies.map((tech, index) => (
                    <span key={index} className='tech-tag'>{tech}</span>
                  ))}
                </div>
              </div>

              <div className='project-meta'>
                <div className='meta-item'>
                  <span className='label'>Category</span>
                  <span className='value'>{project.catgeory}</span>
                </div>
                <div className='meta-item'>
                  <span className='label'>Client</span>
                  <span className='value'>{project.client}</span>
                </div>
                <div className='meta-item'>
                  <span className='label'>Date</span>
                  <span className='value'>{project.date}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  )
}

export default ShowcaseDetail