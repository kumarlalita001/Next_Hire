import React, { useRef } from 'react'
import { motion } from "framer-motion";

const Hero = () => {
  const targetRef = useRef(null);
  return (
    <section 
        ref={targetRef}
        className="relative  bg-gradient-to-r from-primary-500-800 to-primary-700 h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <div className="video-bg-container ">
          <video 
            className="video-bg absolute inset-0 object-cover w-full h-full "
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={"https://res.cloudinary.com/dnmf6sewr/video/upload/v1750495715/hero-video_kki864.mp4"} type="video/mp4" />
          </video>
          {/* <div className="video-overlay "></div> */}
        </div>
        
        <motion.div
          style={{ y, opacity }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white mb-6 text-4xl font-serif md:text-6xl font-bold"
          >
            Find Your Dream Job <span className="text-primary-500">Today</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-200 text-lg  md:text-xl max-w-3xl mx-auto mb-8"
          >
            Connect with thousands of employers and find the perfect job opportunity that matches your skills, experience, and career goals.
          </motion.p>
          
          {/* Search Box */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-lg shadow-lg p-2 md:p-4 max-w-3xl mx-auto"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Job title, keywords, or company" 
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <Link 
                to="/jobs"
                className="btn-primary px-2 text-center py-3 md:w-auto"
              >
                Search Jobs
              </Link>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg px-6 py-3 text-white">
              <span className="font-bold">10,000+</span> Jobs Available
            </div>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg px-6 py-3 text-white">
              <span className="font-bold">5,000+</span> Companies
            </div>
            <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm rounded-lg px-6 py-3 text-white">
              <span className="font-bold">25,000+</span> Happy Users
            </div>
          </motion.div>
        </motion.div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center p-2"
          >
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-3 bg-white rounded-full"
            />
          </motion.div>
        </div>
      </section>
  )
}

export default Hero
