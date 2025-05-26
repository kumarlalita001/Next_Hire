import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { FiBriefcase, FiUsers, FiEye, FiCheckCircle, FiPlus, FiChevronRight, FiCalendar, FiEdit, FiTrash2, FiFilter } from 'react-icons/fi'
import { useAuth } from '@context/AuthContext'

// Import dummy data
import { jobsData } from '@data/jobsData'

const RecruiterDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    totalViews: 0,
    shortlisted: 0
  })
  const [jobs, setJobs] = useState([])
  const [candidates, setCandidates] = useState([])
  const [upcomingInterviews, setUpcomingInterviews] = useState([])
  const [jobFormVisible, setJobFormVisible] = useState(false)
  
  useEffect(() => {
    // Simulate API call to fetch recruiter stats
    setTimeout(() => {
      // Generate random stats
      const activeJobs = Math.floor(Math.random() * 5) + 1
      const totalApplications = Math.floor(Math.random() * 50) + 10
      const totalViews = Math.floor(Math.random() * 500) + 100
      const shortlisted = Math.floor(Math.random() * 15) + 5
      
      // Update stats
      setStats({
        activeJobs,
        totalApplications,
        totalViews,
        shortlisted
      })
      
      // Get random jobs for the recruiter
      const recruiterJobs = jobsData
        .slice(0, activeJobs)
        .map(job => ({
          ...job,
          postedDate: getRandomDate(30),
          applications: Math.floor(Math.random() * 20) + 1,
          status: Math.random() > 0.2 ? 'Active' : 'Paused'
        }))
      
      setJobs(recruiterJobs)
      
      // Generate random candidates
      const randomCandidates = Array(5).fill().map((_, index) => ({
        id: `candidate-${index + 1}`,
        name: ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Wilson'][index],
        avatar: `https://i.pravatar.cc/150?img=${index + 10}`,
        jobId: recruiterJobs[0]?.id || 'job-1',
        jobTitle: recruiterJobs[0]?.title || 'Software Engineer',
        status: ['New', 'Reviewing', 'Shortlisted', 'Interview', 'Rejected'][Math.floor(Math.random() * 5)],
        appliedDate: getRandomDate(14)
      }))
      
      setCandidates(randomCandidates)
      
      // Generate upcoming interviews
      const randomInterviews = randomCandidates
        .filter(candidate => candidate.status === 'Interview')
        .map(candidate => ({
          id: `interview-${candidate.id}`,
          candidateId: candidate.id,
          candidateName: candidate.name,
          candidateAvatar: candidate.avatar,
          jobId: candidate.jobId,
          jobTitle: candidate.jobTitle,
          date: getRandomFutureDate(10),
          time: ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'][Math.floor(Math.random() * 4)],
          type: Math.random() > 0.5 ? 'Video Call' : 'In-Person'
        }))
      
      if (randomInterviews.length === 0 && randomCandidates.length > 0) {
        // Ensure at least one interview if we have candidates
        const randomCandidate = randomCandidates[Math.floor(Math.random() * randomCandidates.length)]
        randomInterviews.push({
          id: `interview-${randomCandidate.id}`,
          candidateId: randomCandidate.id,
          candidateName: randomCandidate.name,
          candidateAvatar: randomCandidate.avatar,
          jobId: randomCandidate.jobId,
          jobTitle: randomCandidate.jobTitle,
          date: getRandomFutureDate(10),
          time: ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'][Math.floor(Math.random() * 4)],
          type: Math.random() > 0.5 ? 'Video Call' : 'In-Person'
        })
      }
      
      setUpcomingInterviews(randomInterviews)
    }, 1000)
  }, [])
  
  // Helper function to get random past date (within last X days)
  const getRandomDate = (daysAgo) => {
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo))
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }
  
  // Helper function to get random future date (within next X days)
  const getRandomFutureDate = (daysAhead) => {
    const date = new Date()
    date.setDate(date.getDate() + Math.floor(Math.random() * daysAhead) + 1)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }
  
  // Data for pie chart
  const pieData = [
    { name: 'New', value: candidates.filter(c => c.status === 'New').length, color: '#93c5fd' },
    { name: 'Reviewing', value: candidates.filter(c => c.status === 'Reviewing').length, color: '#bfdbfe' },
    { name: 'Shortlisted', value: candidates.filter(c => c.status === 'Shortlisted').length, color: '#fbbf24' },
    { name: 'Interview', value: candidates.filter(c => c.status === 'Interview').length, color: '#10b981' },
    { name: 'Rejected', value: candidates.filter(c => c.status === 'Rejected').length, color: '#f87171' }
  ].filter(item => item.value > 0)
  
  // Data for bar chart
  const barData = [
    { name: 'Mon', applications: 4 },
    { name: 'Tue', applications: 7 },
    { name: 'Wed', applications: 3 },
    { name: 'Thu', applications: 5 },
    { name: 'Fri', applications: 8 },
    { name: 'Sat', applications: 2 },
    { name: 'Sun', applications: 1 }
  ]
  
  // Get candidate status badge color
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'New':
        return 'badge-secondary'
      case 'Reviewing':
        return 'badge-primary'
      case 'Shortlisted':
        return 'badge-accent'
      case 'Interview':
        return 'badge-success'
      case 'Rejected':
        return 'badge-error'
      default:
        return 'badge-secondary'
    }
  }
  
  // Get job status badge color
  const getJobStatusBadgeClass = (status) => {
    switch(status) {
      case 'Active':
        return 'badge-success'
      case 'Paused':
        return 'badge-accent'
      case 'Closed':
        return 'badge-secondary'
      default:
        return 'badge-secondary'
    }
  }
  
  return (
    <>
      <Helmet>
        <title>Recruiter Dashboard | JobHunt</title>
        <meta name="description" content="Manage job postings, track applications, and connect with candidates all in one place." />
      </Helmet>
      
      <div className="bg-gray-50 min-h-screen pb-12">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white text-3xl font-bold">Recruiter Dashboard</h1>
                <p className="text-white text-opacity-80 mt-2">
                  Welcome back, {user?.name || 'Recruiter'}
                </p>
              </div>
              <button 
                onClick={() => setJobFormVisible(true)}
                className="btn-primary bg-white text-primary-600 hover:bg-gray-100 flex items-center"
              >
                <FiPlus className="mr-2" /> Post New Job
              </button>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 -mt-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Active Jobs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-4">
                  <FiBriefcase size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Jobs</p>
                  <h3 className="text-2xl font-bold">{stats.activeJobs}</h3>
                </div>
              </div>
            </motion.div>
            
            {/* Total Applications */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-secondary-100 text-secondary-500 flex items-center justify-center mr-4">
                  <FiUsers size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Applications</p>
                  <h3 className="text-2xl font-bold">{stats.totalApplications}</h3>
                </div>
              </div>
            </motion.div>
            
            {/* Job Views */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-accent-100 text-accent-500 flex items-center justify-center mr-4">
                  <FiEye size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Job Views</p>
                  <h3 className="text-2xl font-bold">{stats.totalViews}</h3>
                </div>
              </div>
            </motion.div>
            
            {/* Shortlisted Candidates */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-success-100 text-success-500 flex items-center justify-center mr-4">
                  <FiCheckCircle size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Shortlisted</p>
                  <h3 className="text-2xl font-bold">{stats.shortlisted}</h3>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Job Listings */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center">
                    <FiBriefcase className="mr-2 text-primary-500" /> Your Job Postings
                  </h2>
                  <Link to="/dashboard/jobs" className="text-primary-500 text-sm font-medium flex items-center">
                    Manage All <FiChevronRight className="ml-1" />
                  </Link>
                </div>
                <div>
                  {jobs.length > 0 ? (
                    <div className="divide-y">
                      {jobs.map(job => (
                        <div key={job.id} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="sm:flex justify-between items-start">
                            <div className="flex mb-4 sm:mb-0">
                              <img 
                                src={job.company.logo} 
                                alt={job.company.name}
                                className="w-12 h-12 rounded-lg object-contain border border-gray-200 mr-4"
                              />
                              <div>
                                <h3 className="font-bold text-lg hover:text-primary-500 transition-colors">
                                  <Link to={`/dashboard/jobs/${job.id}`}>
                                    {job.title}
                                  </Link>
                                </h3>
                                <p className="text-gray-600">{job.company.name}</p>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <span>Posted on {job.postedDate}</span>
                                  <span className="mx-2">•</span>
                                  <span>{job.applications} Applications</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className={`badge ${getJobStatusBadgeClass(job.status)}`}>
                                {job.status}
                              </span>
                              <div className="flex space-x-2">
                                <button className="p-2 text-gray-500 hover:text-primary-500 transition-colors">
                                  <FiEdit size={18} />
                                </button>
                                <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
                                  <FiTrash2 size={18} />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiBriefcase className="text-gray-400" size={24} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No jobs posted yet</h3>
                      <p className="text-gray-500 mb-4">Create your first job posting to start receiving applications.</p>
                      <button 
                        onClick={() => setJobFormVisible(true)}
                        className="btn-primary"
                      >
                        Post a Job
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Recent Applicants */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center">
                    <FiUsers className="mr-2 text-primary-500" /> Recent Applicants
                  </h2>
                  <Link to="/dashboard/candidates" className="text-primary-500 text-sm font-medium flex items-center">
                    View All <FiChevronRight className="ml-1" />
                  </Link>
                </div>
                <div>
                  {candidates.length > 0 ? (
                    <div className="divide-y">
                      {candidates.map(candidate => (
                        <div key={candidate.id} className="p-6 hover:bg-gray-50 transition-colors">
                          <div className="sm:flex justify-between items-start">
                            <div className="flex mb-4 sm:mb-0">
                              <img 
                                src={candidate.avatar} 
                                alt={candidate.name}
                                className="w-12 h-12 rounded-full object-cover border border-gray-200 mr-4"
                              />
                              <div>
                                <h3 className="font-bold text-lg hover:text-primary-500 transition-colors">
                                  <Link to={`/dashboard/candidates/${candidate.id}`}>
                                    {candidate.name}
                                  </Link>
                                </h3>
                                <p className="text-gray-600">Applied for: {candidate.jobTitle}</p>
                                <div className="flex items-center text-sm text-gray-500 mt-1">
                                  <span>Applied on {candidate.appliedDate}</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center space-x-4">
                              <span className={`badge ${getStatusBadgeClass(candidate.status)}`}>
                                {candidate.status}
                              </span>
                              <Link 
                                to={`/dashboard/candidates/${candidate.id}`}
                                className="text-primary-500"
                              >
                                Details
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiUsers className="text-gray-400" size={24} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No applicants yet</h3>
                      <p className="text-gray-500 mb-4">When candidates apply to your jobs, they'll appear here.</p>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Applications Analytics */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold flex items-center">
                    <FiFilter className="mr-2 text-primary-500" /> Application Analytics
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Applications by Day */}
                    <div>
                      <h3 className="text-md font-semibold mb-4 text-center">Applications by Day</h3>
                      <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={barData}
                            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="applications" fill="#3B82F6" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                    
                    {/* Candidate Status Distribution */}
                    {pieData.length > 0 && (
                      <div>
                        <h3 className="text-md font-semibold mb-4 text-center">Candidate Status</h3>
                        <div className="h-64">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                paddingAngle={5}
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                              >
                                {pieData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="flex flex-wrap justify-center gap-4 mt-4">
                          {pieData.map((entry, index) => (
                            <div key={index} className="flex items-center">
                              <div 
                                className="w-3 h-3 rounded-full mr-2" 
                                style={{ backgroundColor: entry.color }}
                              ></div>
                              <span className="text-sm text-gray-600">
                                {entry.name}: {entry.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Company Profile Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 text-center border-b">
                  <img 
                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800"
                    alt="Company Logo"
                    className="w-20 h-20 rounded-lg object-cover mx-auto mb-4 border border-gray-200"
                  />
                  <h3 className="font-bold text-lg mb-1">Acme Corporation</h3>
                  <p className="text-gray-500">Tech Industry</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">Profile Completion</span>
                        <span className="text-xs font-medium text-primary-500">80%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Complete your company profile to attract more qualified candidates.
                    </p>
                    <Link 
                      to="/dashboard/company-profile" 
                      className="btn-outline w-full text-center py-2 text-sm"
                    >
                      Edit Company Profile
                    </Link>
                  </div>
                </div>
              </motion.div>
              
              {/* Upcoming Interviews */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center">
                    <FiCalendar className="mr-2 text-primary-500" /> Upcoming Interviews
                  </h2>
                  <Link to="/dashboard/interviews" className="text-primary-500 text-sm font-medium flex items-center">
                    View All <FiChevronRight className="ml-1" />
                  </Link>
                </div>
                <div>
                  {upcomingInterviews.length > 0 ? (
                    <div className="divide-y">
                      {upcomingInterviews.map(interview => (
                        <div key={interview.id} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start">
                            <img 
                              src={interview.candidateAvatar} 
                              alt={interview.candidateName}
                              className="w-10 h-10 rounded-full object-cover border border-gray-200 mr-3"
                            />
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 hover:text-primary-500 transition-colors">
                                <Link to={`/dashboard/candidates/${interview.candidateId}`}>
                                  {interview.candidateName}
                                </Link>
                              </h3>
                              <p className="text-sm text-gray-500">{interview.jobTitle}</p>
                              <div className="flex flex-wrap items-center text-xs text-gray-500 mt-1 gap-x-3 gap-y-1">
                                <span className="flex items-center">
                                  <FiCalendar className="mr-1" size={12} /> {interview.date}
                                </span>
                                <span>{interview.time}</span>
                                <span>{interview.type}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-gray-500 mb-4">
                        No upcoming interviews scheduled.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Recent Job Views */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold flex items-center">
                    <FiEye className="mr-2 text-primary-500" /> Recent Job Views
                  </h2>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{jobs[0]?.title || 'Software Engineer'}</h3>
                        <p className="text-sm text-gray-500">Today</p>
                      </div>
                      <span className="text-lg font-semibold">42</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{jobs[1]?.title || 'Product Manager'}</h3>
                        <p className="text-sm text-gray-500">Yesterday</p>
                      </div>
                      <span className="text-lg font-semibold">28</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{jobs[2]?.title || 'UX Designer'}</h3>
                        <p className="text-sm text-gray-500">This Week</p>
                      </div>
                      <span className="text-lg font-semibold">93</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* New Job Modal */}
      {jobFormVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white rounded-xl shadow-xl overflow-auto max-w-2xl w-full max-h-[90vh]"
          >
            <div className="p-6 border-b flex justify-between items-center">
              <h2 className="text-xl font-bold">Post a New Job</h2>
              <button 
                onClick={() => setJobFormVisible(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>
            <div className="p-6">
              <form className="space-y-6">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input 
                    type="text" 
                    id="title" 
                    className="input"
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                      Job Type
                    </label>
                    <select id="type" className="input">
                      <option value="">Select Job Type</option>
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Internship">Internship</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                      Experience Level
                    </label>
                    <select id="experience" className="input">
                      <option value="">Select Experience Level</option>
                      <option value="Entry Level">Entry Level</option>
                      <option value="Mid Level">Mid Level</option>
                      <option value="Senior Level">Senior Level</option>
                      <option value="Executive">Executive</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                      Location
                    </label>
                    <input 
                      type="text" 
                      id="location" 
                      className="input"
                      placeholder="e.g. San Francisco, CA"
                    />
                  </div>
                  <div>
                    <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">
                      Salary Range
                    </label>
                    <input 
                      type="text" 
                      id="salary" 
                      className="input"
                      placeholder="e.g. $80,000 - $100,000"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description
                  </label>
                  <textarea 
                    id="description" 
                    rows="5" 
                    className="input resize-none"
                    placeholder="Describe the job role, responsibilities, and requirements..."
                  ></textarea>
                </div>
                
                <div>
                  <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                    Skills & Tags
                  </label>
                  <input 
                    type="text" 
                    id="tags" 
                    className="input"
                    placeholder="e.g. React, Node.js, JavaScript (comma separated)"
                  />
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button 
                    type="button"
                    onClick={() => setJobFormVisible(false)}
                    className="btn-outline"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button"
                    className="btn-primary"
                    onClick={() => {
                      // In a real app, this would submit the form data
                      setJobFormVisible(false)
                      // Show success message
                      alert('Job posted successfully!')
                    }}
                  >
                    Post Job
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

export default RecruiterDashboard