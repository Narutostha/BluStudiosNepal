import React from "react"
import { TitleSm } from "./common/Title"
import Link from "next/link"
import { testimonial } from "@/assets/data/dummydata"
import { HiOutlineArrowRight } from "react-icons/hi"
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import Slider from "react-slick"
import { motion } from "framer-motion"

function SampleNextArrow(props) {
  const { onClick } = props
  return (
    <div className='slick-arrow'>
      <button className='next' onClick={onClick}>
        <RiArrowRightSLine size={25} />
      </button>
    </div>
  )
}

function SamplePrevArrow(props) {
  const { onClick } = props
  return (
    <div className='slick-arrow'>
      <button className='prev' onClick={onClick}>
        <RiArrowLeftSLine size={25} />
      </button>
    </div>
  )
}

const Testimonial = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
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
    <section className='testimonial'>
      <div className='container'>
        <motion.div 
          className='heading-title'
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <TitleSm title='WHAT CLIENTS SAY ABOUT OUR WORK' />
        </motion.div>
        
        {testimonial && testimonial.length > 0 && (
          <motion.div 
            className='cards'
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Slider {...settings}>
              {testimonial.map((user) => (
                <motion.div 
                  key={user.id}
                  variants={itemVariants}
                >
                  <div className='card'>
                    <div className='image'>
                      <div className='img'>
                        <img src={user.cover} alt={user.name} />
                      </div>
                      <div className='img-text'>
                        <h3>{user.name}</h3>
                        <span>{user.post}</span>
                      </div>
                    </div>
                    <div className='details'>
                      <p>{user.desc}</p>
                      <Link href='/#' className="view-case">
                        VIEW CASE <HiOutlineArrowRight className='link-icon' />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </Slider>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default Testimonial