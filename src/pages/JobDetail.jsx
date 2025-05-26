import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { 
  FiMapPin, 
  FiDollarSign, 
  FiBriefcase, 
  FiClock, 
  FiCalendar, 
  FiUsers, 
  FiChevronRight,
  FiBookmark, 
  FiShare2, 
  FiCheck,
  FiHome,
  FiExternalLink
} from 'react-icons/fi'
import { useAuth } from '@context/AuthContext'
import toast from 'react-hot-toast'

// Import dummy data
import { jobsData } from '@data/jobsData'

const JobDetail = () => {
  const { id } = useParams()
  const [job, setJob] = useState(null)
  const [loading, setLoading] = useState(true)
  const [applied, setApplied] = useState(false)
  const [saved, setSaved] = useState(false)
  const [relatedJobs, setRelatedJobs] = useState([])
  const { user } = useAuth()
  const navigate = useNavigate()
  
  useEffect(() => {
    // Simulate API call to fetch job details
    setLoading(true)
    
    setTimeout(() => {
      const foundJob = jobsData.find(job => job.id === id)
      
      if (foundJob) {
        setJob(foundJob)
        
        // Check if the user has applied for this job (simulate from local storage)
        const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]')
        setApplied(appliedJobs.includes(id))
        
        // Check if the job is saved (simulate from local storage)
        const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]')
        setSaved(savedJobs.includes(id))
        
        // Find related jobs (same category or similar tags)
        const filtered = jobsData
          .filter(j => 
            j.id !== id && 
            (j.category === foundJob.category || 
              j.tags.some(tag => foundJob.tags.includes(tag)))
          )
          .slice(0, 3)
        
        setRelatedJobs(filtered)
      }
      
      setLoading(false)
    }, 800)
  }, [id])
  
  // Handle job application
  const handleApply = () => {
    if (!user) {
      toast.error("Please log in to apply for jobs")
      navigate('/login', { state: { from: `/jobs/${id}` } })
      return
    }
    
    // Simulate API call for job application
    toast.promise(
      new Promise(resolve => {
        setTimeout(() => {
          // Store in localStorage for demo purposes
          const appliedJobs = JSON.parse(localStorage.getItem('appliedJobs') || '[]')
          localStorage.setItem('appliedJobs', JSON.stringify([...appliedJobs, id]))
          setApplied(true)
          resolve()
        }, 1000)
      }),
      {
        loading: 'Submitting your application...',
        success: 'Application submitted successfully!',
        error: 'Failed to submit application. Please try again.',
      }
    )
  }
  
  // Handle save/bookmark job
  const handleSaveJob = () => {
    if (!user) {
      toast.error("Please log in to save jobs")
      navigate('/login', { state: { from: `/jobs/${id}` } })
      return
    }
    
    // Toggle saved state
    const savedJobs = JSON.parse(localStorage.getItem('savedJobs') || '[]')
    
    if (saved) {
      // Remove from saved jobs
      const updated = savedJobs.filter(jobId => jobId !== id)
      localStorage.setItem('savedJobs', JSON.stringify(updated))
      setSaved(false)
      toast.success('Job removed from saved list')
    } else {
      // Add to saved jobs
      localStorage.setItem('savedJobs', JSON.stringify([...savedJobs, id]))
      setSaved(true)
      toast.success('Job saved to your list')
    }
  }
  
  // Handle share job
  const handleShareJob = () => {
    if (navigator.share) {
      navigator.share({
        title: job?.title,
        text: `Check out this ${job?.title} job at ${job?.company.name}`,
        url: window.location.href,
      })
      .catch(error => console.log('Error sharing:', error))
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      toast.success('Link copied to clipboard')
    }
  }
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse"></div>
          <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse delay-150"></div>
          <div className="w-4 h-4 bg-primary-500 rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    )
  }
  
  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Job Not Found</h2>
            <p className="text-gray-600 mb-6">
              The job listing you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/jobs" className="btn-primary">
              Browse All Jobs
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <>
      <Helmet>
        <title>{job.title} at {job.company.name} | JobHunt</title>
        <meta name="description" content={`${job.title} job at ${job.company.name}. ${job.description.substring(0, 160)}...`} />
      </Helmet>
      
      <div className="bg-gray-50 min-h-screen py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center text-sm text-gray-500">
            <Link to="/" className="flex items-center hover:text-primary-500">
              <FiHome className="mr-1" /> Home
            </Link>
            <FiChevronRight className="mx-2" />
            <Link to="/jobs" className="hover:text-primary-500">
              Jobs
            </Link>
            <FiChevronRight className="mx-2" />
            <span className="text-gray-900 font-medium line-clamp-1">{job.title}</span>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Job Header */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <div className="sm:flex items-center">
                    {/* Company Logo */}
                    <div className="mb-4 sm:mb-0 sm:mr-6">
                      <img 
                        src={job.company.logo} 
                        alt={job.company.name}
                        className="w-20 h-20 object-contain rounded-md border border-gray-200"
                      />
                    </div>
                    
                    {/* Job Title and Company */}
                    <div className="flex-1">
                      <h1 className="text-2xl md:text-3xl font-bold mb-2">{job.title}</h1>
                      <p className="text-lg text-gray-600 mb-4">
                        <Link to={`/company/${job.company.id}`} className="hover:text-primary-500 transition-colors">
                          {job.company.name}
                        </Link>
                      </p>
                      
                      {/* Job Metadata */}
                      <div className="flex flex-wrap gap-4">
                        <div className="flex items-center text-gray-500">
                          <FiMapPin className="mr-1 text-primary-500" /> 
                          {job.location.city}, {job.location.state}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <FiBriefcase className="mr-1 text-primary-500" /> 
                          {job.type}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <FiDollarSign className="mr-1 text-primary-500" /> 
                          {job.salary.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                        </div>
                        <div className="flex items-center text-gray-500">
                          <FiCalendar className="mr-1 text-primary-500" /> 
                          Posted {job.postedAt}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-4">
                    <button 
                      onClick={handleApply}
                      disabled={applied}
                      className={`flex-1 btn ${
                        applied 
                          ? 'bg-green-100 text-green-700 hover:bg-green-100 cursor-default'
                          : 'btn-primary'
                      }`}
                    >
                      {applied ? (
                        <>
                          <FiCheck className="mr-2" /> Applied
                        </>
                      ) : 'Apply Now'}
                    </button>
                    <button 
                      onClick={handleSaveJob}
                      className={`btn-outline p-3 ${saved ? 'text-primary-500' : ''}`}
                    >
                      <FiBookmark />
                    </button>
                    <button 
                      onClick={handleShareJob}
                      className="btn-outline p-3"
                    >
                      <FiShare2 />
                    </button>
                  </div>
                </div>
              </motion.div>
              
              {/* Job Description */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Job Description</h2>
                  <div className="prose max-w-none text-gray-600">
                    <p className="mb-4">{job.description}</p>
                  </div>
                </div>
              </motion.div>
              
              {/* Responsibilities */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Responsibilities</h2>
                  <ul className="space-y-3 text-gray-600">
                    {job.responsibilities.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-5 h-5 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs mr-3 mt-1">
                          {index + 1}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              
              {/* Requirements */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Requirements</h2>
                  <ul className="space-y-3 text-gray-600">
                    {job.requirements.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheck className="text-primary-500 mr-3 mt-1" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
              
              {/* Benefits */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Benefits</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {job.benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start bg-gray-50 p-4 rounded-lg">
                        <FiCheck className="text-primary-500 mr-3 mt-1" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Application CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-8 text-center text-white">
                  <h2 className="text-2xl font-bold mb-4">Interested in this job?</h2>
                  <p className="mb-6">
                    Apply now and take the next step in your career journey!
                  </p>
                  <button 
                    onClick={handleApply}
                    disabled={applied}
                    className={`btn ${
                      applied 
                        ? 'bg-white bg-opacity-30 text-white cursor-default'
                        : 'bg-white text-primary-600 hover:bg-gray-100'
                    }`}
                  >
                    {applied ? (
                      <>
                        <FiCheck className="mr-2" /> Applied
                      </>
                    ) : 'Apply for this Position'}
                  </button>
                </div>
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* Job Overview */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Job Overview</h2>
                  <ul className="space-y-4">
                    <li className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-4">
                        <FiCalendar />
                      </div>
                      <div>
                        <span className="block text-sm text-gray-500">Posted Date</span>
                        <span className="block font-medium">{job.postedAt}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-4">
                        <FiMapPin />
                      </div>
                      <div>
                        <span className="block text-sm text-gray-500">Location</span>
                        <span className="block font-medium">{job.location.city}, {job.location.state}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-4">
                        <FiBriefcase />
                      </div>
                      <div>
                        <span className="block text-sm text-gray-500">Job Type</span>
                        <span className="block font-medium">{job.type}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-4">
                        <FiClock />
                      </div>
                      <div>
                        <span className="block text-sm text-gray-500">Experience</span>
                        <span className="block font-medium">{job.experience}</span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-4">
                        <FiDollarSign />
                      </div>
                      <div>
                        <span className="block text-sm text-gray-500">Salary</span>
                        <span className="block font-medium">
                          {job.salary.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} / year
                        </span>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-10 h-10 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-4">
                        <FiUsers />
                      </div>
                      <div>
                        <span className="block text-sm text-gray-500">Vacancies</span>
                        <span className="block font-medium">{job.vacancies}</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </motion.div>
              
              {/* Company Information */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">About Company</h2>
                  <div className="flex items-center mb-4">
                    <img 
                      src={job.company.logo} 
                      alt={job.company.name}
                      className="w-16 h-16 object-contain rounded-md border border-gray-200 mr-4"
                    />
                    <div>
                      <h3 className="font-bold">{job.company.name}</h3>
                      <p className="text-sm text-gray-500">{job.company.industry}</p>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{job.company.description}</p>
                  <a 
                    href={job.company.website} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary-500 hover:text-primary-600 flex items-center font-medium"
                  >
                    Visit Website <FiExternalLink className="ml-2" />
                  </a>
                </div>
              </motion.div>
              
              {/* Tags */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-4">Job Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {job.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="badge badge-primary py-1 px-3"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Related Jobs */}
              {relatedJobs.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="p-6">
                    <h2 className="text-xl font-bold mb-4">Similar Jobs</h2>
                    <div className="space-y-4">
                      {relatedJobs.map(relatedJob => (
                        <Link 
                          key={relatedJob.id} 
                          to={`/jobs/${relatedJob.id}`}
                          className="block p-4 border border-gray-100 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-start">
                            <img 
                              src={relatedJob.company.logo} 
                              alt={relatedJob.company.name}
                              className="w-10 h-10 object-contain rounded-md border border-gray-200 mr-3"
                            />
                            <div>
                              <h3 className="font-medium text-gray-900">{relatedJob.title}</h3>
                              <p className="text-sm text-gray-500 mb-2">{relatedJob.company.name}</p>
                              <div className="flex items-center text-xs text-gray-500">
                                <FiMapPin className="mr-1" size={12} /> 
                                {relatedJob.location.city}, {relatedJob.location.state}
                                <span className="mx-2">•</span>
                                <FiDollarSign className="mr-1" size={12} /> 
                                {relatedJob.salary.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
                              </div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobDetail