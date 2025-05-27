import { Helmet } from 'react-helmet-async'
import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { FiSearch, FiBriefcase,FiMapPin , FiUsers, FiAward, FiCheckCircle } from 'react-icons/fi'
import CountUp from 'react-countup'
import { useInView } from 'react-intersection-observer'
import { FiMail,FiPhone } from 'react-icons/fi'
// Import hero background video
import heroVideo from '@assets/videos/hero-video.mp4'

const Home = () => {
  // Intersection observer hooks for animations
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [featuresRef, featuresInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [testimonialRef, testimonialInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  const [contactRef, contactInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })
  
  // Parallax effect for hero section
  const targetRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  // Activate animation elements when they come into view
  useEffect(() => {
    const animateElements = document.querySelectorAll('.animate-on-scroll')
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    }, { threshold: 0.1 })
    
    animateElements.forEach(el => observer.observe(el))
    
    return () => {
      animateElements.forEach(el => observer.unobserve(el))
    }
  }, [])
  
  return (
    <>
      <Helmet>
        <title>JobHunt - Find Your Dream Job</title>
        <meta name="description" content="Find your dream job or the perfect candidate with JobHunt - the premier job posting platform for job seekers and recruiters." />
      </Helmet>
      
      {/* Hero Section with Parallax and Video Background */}
      <section 
        ref={targetRef}
        className="relative  bg-gradient-to-r from-secondary-600 to-primary-600 h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Video Background */}
        <div className="video-bg-container">
          <video 
            className="video-bg"
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={heroVideo} type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>
        
        <motion.div 
          style={{ y, opacity }}
          className="container mx-auto px-4 relative z-10 text-center"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-white mb-6 text-5xl md:text-6xl font-bold"
          >
            Find Your Dream Job <span className="text-primary-500">Today</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto mb-8"
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
      
      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose JobHunt?</h2>
            <p className="text-gray-600">Our platform offers a comprehensive solution for job seekers and recruiters, making the hiring process smoother and more efficient.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden animate-on-scroll"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="p-8">
                <div className="w-12 h-12 bg-primary-500 text-white rounded-lg flex items-center justify-center mb-6">
                  <FiSearch size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Smart Job Matching</h3>
                <p className="text-gray-600 mb-4">
                  Our AI-powered algorithm matches your skills and experience with the perfect job opportunities, saving you time and effort.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FiCheckCircle className="text-primary-500 mt-1 mr-2" />
                    <span>Personalized job recommendations</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-primary-500 mt-1 mr-2" />
                    <span>Skill-based matching</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-primary-500 mt-1 mr-2" />
                    <span>Career path suggestions</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden animate-on-scroll"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="p-8">
                <div className="w-12 h-12 bg-secondary-500 text-white rounded-lg flex items-center justify-center mb-6">
                  <FiBriefcase size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Verified Employers</h3>
                <p className="text-gray-600 mb-4">
                  All employers on our platform are verified, ensuring that you're applying to legitimate job opportunities from reputable companies.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FiCheckCircle className="text-primary-500 mt-1 mr-2" />
                    <span>Company verification process</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-primary-500 mt-1 mr-2" />
                    <span>Trusted employer badges</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-primary-500 mt-1 mr-2" />
                    <span>Employee reviews and ratings</span>
                  </li>
                </ul>
              </div>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className="bg-white rounded-xl shadow-md overflow-hidden animate-on-scroll"
              initial={{ opacity: 0, y: 20 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="p-8">
                <div className="w-12 h-12 bg-accent-400 text-gray-900 rounded-lg flex items-center justify-center mb-6">
                  <FiAward size={24} />
                </div>
                <h3 className="text-xl font-bold mb-4">Career Resources</h3>
                <p className="text-gray-600 mb-4">
                  Access a wide range of resources to help you prepare for job interviews, improve your resume, and advance your career.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <FiCheckCircle className="text-primary-500 mt-1 mr-2" />
                    <span>Resume building tools</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-primary-500 mt-1 mr-2" />
                    <span>Interview preparation guides</span>
                  </li>
                  <li className="flex items-start">
                    <FiCheckCircle className="text-primary-500 mt-1 mr-2" />
                    <span>Salary negotiation tips</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* About Us Section */}
      <section 
        id="about" 
        className="py-20 bg-white"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Image */}
            <div className="lg:w-1/2 animate-on-scroll">
              <img 
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" 
                alt="Team working together" 
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
            
            {/* Content */}
            <div className="lg:w-1/2 animate-on-scroll">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">About JobHunt</h2>
              <p className="text-gray-600 mb-6">
                JobHunt was founded in 2022 with a mission to revolutionize the job search and recruitment process. We believe that finding the right job or candidate should be simple, efficient, and transparent.
              </p>
              <p className="text-gray-600 mb-6">
                Our platform leverages cutting-edge technology and human expertise to create a seamless experience for both job seekers and recruiters. We're committed to helping individuals find fulfilling careers and assisting companies in building strong teams.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="text-xl font-bold mb-2">Our Mission</h4>
                  <p className="text-gray-600">
                    To connect talented individuals with opportunities that match their skills, passions, and career goals.
                  </p>
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Our Vision</h4>
                  <p className="text-gray-600">
                    To create a world where everyone can find meaningful work and companies can build diverse, talented teams.
                  </p>
                </div>
              </div>
              <Link to="/jobs" className="btn-primary">
                Browse Jobs
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-20 bg-gradient-to-r from-primary-600 to-secondary-600 text-white"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {/* Stat 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <CountUp end={1000} suffix="+" enableScrollSpy duration={2.5} />
              </div>
              <p className="text-lg text-gray-100">Companies</p>
            </motion.div>
            
            {/* Stat 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <CountUp end={10000} suffix="+" enableScrollSpy duration={2.5} />
              </div>
              <p className="text-lg text-gray-100">Job Postings</p>
            </motion.div>
            
            {/* Stat 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <CountUp end={25000} suffix="+" enableScrollSpy duration={2.5} />
              </div>
              <p className="text-lg text-gray-100">Happy Users</p>
            </motion.div>
            
            {/* Stat 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={statsInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2">
                <CountUp end={95} suffix="%" enableScrollSpy duration={2.5} />
              </div>
              <p className="text-lg text-gray-100">Satisfaction Rate</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section 
        id="testimonials" 
        ref={testimonialRef}
        className="py-20 bg-testimonials-pattern bg-fixed bg-cover"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-gray-600">
              Hear from job seekers and recruiters who have successfully used JobHunt to find their dream jobs and talented team members.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <motion.div 
              className="bg-white rounded-xl shadow-md p-8 animate-on-scroll"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={testimonialInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" 
                  alt="Sarah J." 
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold">Sarah Johnson</h4>
                  <p className="text-gray-600">Software Engineer</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "I had been searching for a new job for months with no success until I found JobHunt. Within two weeks of creating my profile, I received multiple interview offers and landed my dream job at a top tech company."
              </p>
              <div className="flex text-accent-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </motion.div>
            
            {/* Testimonial 2 */}
            <motion.div 
              className="bg-white rounded-xl shadow-md p-8 animate-on-scroll"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={testimonialInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" 
                  alt="Michael T." 
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold">Michael Thompson</h4>
                  <p className="text-gray-600">HR Director</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "As a recruiter, JobHunt has transformed our hiring process. The quality of candidates we receive is consistently high, and the platform's tools make it easy to filter and communicate with potential hires. Highly recommended!"
              </p>
              <div className="flex text-accent-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </motion.div>
            
            {/* Testimonial 3 */}
            <motion.div 
              className="bg-white rounded-xl shadow-md p-8 animate-on-scroll"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={testimonialInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <div className="flex items-center mb-6">
                <img 
                  src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2" 
                  alt="Jennifer P." 
                  className="w-14 h-14 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-lg font-bold">Jennifer Patel</h4>
                  <p className="text-gray-600">Marketing Specialist</p>
                </div>
              </div>
              <p className="text-gray-700 mb-4">
                "The job matching algorithm on JobHunt is incredible. I was skeptical at first, but the positions it recommended matched my skills and interests perfectly. I'm now working at a company I love with better pay and benefits."
              </p>
              <div className="flex text-accent-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Contact and Map Section */}
      <section 
        id="contact" 
        ref={contactRef}
        className="py-20 bg-gray-50"
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
            <p className="text-gray-600">
              Have questions or feedback? Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Contact Form */}
            <motion.div 
              className="bg-white rounded-xl shadow-md p-8 animate-on-scroll"
              initial={{ opacity: 0, x: -50 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input 
                      type="text" 
                      id="name" 
                      className="input"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      className="input"
                      placeholder="Your email"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <input 
                    type="text" 
                    id="subject" 
                    className="input"
                    placeholder="Message subject"
                  />
                </div>
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Message
                  </label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    className="input resize-none"
                    placeholder="Your message"
                  ></textarea>
                </div>
                <button type="submit" className="btn-primary w-full">
                  Send Message
                </button>
              </form>
            </motion.div>
            
            {/* Map and Contact Info */}
            <motion.div 
              className="animate-on-scroll"
              initial={{ opacity: 0, x: 50 }}
              animate={contactInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5 }}
            >
              {/* Map */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0978136001397!2d-122.39796082356878!3d37.7908829143886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806284e0667d%3A0xaf969f92a79a9620!2sMarket%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1709564873657!5m2!1sen!2sus" 
                  width="100%" 
                  height="300" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
              
              {/* Contact Info */}
              <div className="bg-white rounded-xl shadow-md p-8">
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-4">
                      <FiMapPin size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Address</h4>
                      <p className="text-gray-600">
                        1234 Market Street, Suite 1000<br />
                        San Francisco, CA 94103
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-4">
                      <FiMail size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Email</h4>
                      <p className="text-gray-600">info@jobhunt.com</p>
                      <p className="text-gray-600">support@jobhunt.com</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-4">
                      <FiPhone size={20} />
                    </div>
                    <div>
                      <h4 className="text-lg font-bold">Phone</h4>
                      <p className="text-gray-600">(415) 555-1234</p>
                      <p className="text-gray-600">(800) 555-5678 (Toll Free)</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-secondary-600 to-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Find Your Dream Job?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8">
            Join thousands of satisfied users who have found their perfect career match with JobHunt.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn bg-white text-secondary-600 hover:bg-gray-100">
              Create Your Account
            </Link>
            <Link to="/jobs" className="btn border-2 border-white text-white hover:bg-white hover:text-secondary-600">
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Home