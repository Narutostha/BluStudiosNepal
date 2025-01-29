import { teamdata } from "@/assets/data/dummydata"
import { Title, TitleSm } from "@/components/common/Title"
import { motion } from "framer-motion"
import { useState } from "react"

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null)

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
    <section className='team-section'>
      <div className='container'>
        <div className='heading-title'>
          <TitleSm title='MEET OUR TEAM' />
          <Title title='A team of smart & passionate creatives' className='title-bg' />
          <p className="subtitle">Our diverse team brings together expertise from various domains to deliver exceptional results</p>
        </div>

        <motion.div 
          className='team-grid'
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {teamdata.map((member) => (
            <motion.div
              key={member.id}
              className={`team-card ${selectedMember?.id === member.id ? 'active' : ''}`}
              variants={itemVariants}
              onClick={() => setSelectedMember(selectedMember?.id === member.id ? null : member)}
            >
              <div className='card-content'>
                <div className='member-image'>
                  <img src={member.cover} alt={member.title} />
                  <div className='image-overlay'>
                    <span>{member.experience}</span>
                  </div>
                </div>
                <div className='member-info'>
                  <h3>{member.title}</h3>
                  <span className='post'>{member.post}</span>
                  <p className='specialization'>{member.specialization}</p>
                  
                  <div className={`member-details ${selectedMember?.id === member.id ? 'show' : ''}`}>
                    {member.expertise && (
                      <div className='expertise'>
                        <h4>Areas of Expertise</h4>
                        <ul>
                          {member.expertise.map((skill, index) => (
                            <li key={index}>{skill}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {member.education && (
                      <div className='education'>
                        <h4>Education</h4>
                        <p>{member.education}</p>
                      </div>
                    )}
                    
                    {member.achievements && (
                      <div className='achievements'>
                        <h4>Key Achievements</h4>
                        <ul>
                          {member.achievements.map((achievement, index) => (
                            <li key={index}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Team