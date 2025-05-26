import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { FiBriefcase, FiBookmark, FiClock, FiCheck, FiX, FiAward, FiTrendingUp, FiMessageSquare, FiCalendar, FiChevronRight } from 'react-icons/fi'
import { useAuth } from '@context/AuthContext'

// Import dummy data
import { jobsData } from '@data/jobsData'

const JobSeekerDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalApplications: 0,
    pending: 0,
    interviews: 0,
    rejected: 0,
    offers: 0,
    savedJobs: 0
  })
  const [recentApplications, setRecentApplications] = useState([])
  const [savedJobs, setSavedJobs] = useState([])
  const [upcomingInterviews, setUpcomingInterviews] = useState([])
  
  useEffect(() => {
    // Simulate API call to fetch user stats
    setTimeout(() => {
      // Get saved jobs from local storage
      const savedJobIds = JSON.parse(localStorage.getItem('savedJobs') || '[]')
      const savedJobsList = jobsData.filter(job => savedJobIds.includes(job.id)).slice(0, 3)
      
      // Get applied jobs from local storage
      const appliedJobIds = JSON.parse(localStorage.getItem('appliedJobs') || '[]')
      
      // Generate random stats
      const pending = Math.floor(Math.random() * 5) + 1
      const interviews = Math.floor(Math.random() * 3)
      const rejected = Math.floor(Math.random() * 4)
      const offers = Math.floor(Math.random() * 2)
      const totalApplications = pending + interviews + rejected + offers
      
      // Update stats
      setStats({
        totalApplications,
        pending,
        interviews,
        rejected,
        offers,
        savedJobs: savedJobIds.length
      })
      
      // Recent applications
      const recentApps = jobsData
        .filter(job => appliedJobIds.includes(job.id))
        .slice(0, 5)
        .map(job => ({
          ...job,
          status: getRandomStatus(),
          appliedDate: getRandomDate(60)
        }))
      
      setRecentApplications(recentApps)
      
      // Saved jobs
      setSavedJobs(savedJobsList)
      
      // Upcoming interviews (random)
      if (interviews > 0) {
        const interviewsList = recentApps
          .filter(app => app.status === 'Interview')
          .map(job => ({
            ...job,
            interviewDate: getRandomFutureDate(14),
            interviewType: Math.random() > 0.5 ? 'Video Call' : 'In-Person'
          }))
        
        setUpcomingInterviews(interviewsList)
      }
    }, 1000)
  }, [])
  
  // Helper function to get random application status
  const getRandomStatus = () => {
    const statuses = ['Pending', 'Reviewing', 'Interview', 'Rejected', 'Offer']
    const randomIndex = Math.floor(Math.random() * statuses.length)
    return statuses[randomIndex]
  }
  
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
    { name: 'Pending', value: stats.pending, color: '#93c5fd' },
    { name: 'Interviews', value: stats.interviews, color: '#fbbf24' },
    { name: 'Rejected', value: stats.rejected, color: '#f87171' },
    { name: 'Offers', value: stats.offers, color: '#10b981' }
  ]
  
  // Data for bar chart
  const barData = [
    { name: 'Week 1', applications: 3 },
    { name: 'Week 2', applications: 5 },
    { name: 'Week 3', applications: 2 },
    { name: 'Week 4', applications: 7 },
    { name: 'Week 5', applications: 4 }
  ]
  
  // Get application status badge color
  const getStatusBadgeClass = (status) => {
    switch(status) {
      case 'Pending':
        return 'badge-secondary'
      case 'Reviewing':
        return 'badge-accent'
      case 'Interview':
        return 'badge-primary'
      case 'Rejected':
        return 'badge-error'
      case 'Offer':
        return 'badge-success'
      default:
        return 'badge-secondary'
    }
  }
  
  return (
    <>
      <Helmet>
        <title>Job Seeker Dashboard | JobHunt</title>
        <meta name="description" content="Track your job applications, upcoming interviews, and job search progress in one place." />
      </Helmet>
      
      <div className="bg-gray-50 min-h-screen pb-12">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-8">
          <div className="container mx-auto px-4">
            <h1 className="text-white text-3xl font-bold">Dashboard</h1>
            <p className="text-white text-opacity-80 mt-2">
              Welcome back, {user?.name || 'User'}
            </p>
          </div>
        </div>
        
        <div className="container mx-auto px-4 -mt-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {/* Total Applications */}
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
                  <p className="text-sm text-gray-500">Total Applications</p>
                  <h3 className="text-2xl font-bold">{stats.totalApplications}</h3>
                </div>
              </div>
            </motion.div>
            
            {/* Active Applications */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-accent-100 text-accent-500 flex items-center justify-center mr-4">
                  <FiClock size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Applications</p>
                  <h3 className="text-2xl font-bold">{stats.pending + stats.interviews}</h3>
                </div>
              </div>
            </motion.div>
            
            {/* Interview Invites */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-success-100 text-success-500 flex items-center justify-center mr-4">
                  <FiCheck size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Interview Invites</p>
                  <h3 className="text-2xl font-bold">{stats.interviews}</h3>
                </div>
              </div>
            </motion.div>
            
            {/* Saved Jobs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-secondary-100 text-secondary-500 flex items-center justify-center mr-4">
                  <FiBookmark size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Saved Jobs</p>
                  <h3 className="text-2xl font-bold">{stats.savedJobs}</h3>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Application Overview */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold flex items-center">
                    <FiBriefcase className="mr-2 text-primary-500" /> Application Overview
                  </h2>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Status Pie Chart */}
                    <div>
                      <h3 className="text-md font-semibold mb-4 text-center">Application Status</h3>
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
                    
                    {/* Weekly Applications Bar Chart */}
                    <div>
                      <h3 className="text-md font-semibold mb-4 text-center">Weekly Applications</h3>
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
                  </div>
                </div>
              </motion.div>
              
              {/* Recent Applications */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center">
                    <FiClock className="mr-2 text-primary-500" /> Recent Applications
                  </h2>
                  <Link to="/dashboard/applications" className="text-primary-500 text-sm font-medium flex items-center">
                    View All <FiChevronRight className="ml-1" />
                  </Link>
                </div>
                <div className="divide-y">
                  {recentApplications.length > 0 ? (
                    recentApplications.map(application => (
                      <div key={application.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="sm:flex justify-between items-start">
                          <div className="flex mb-4 sm:mb-0">
                            <img 
                              src={application.company.logo} 
                              alt={application.company.name}
                              className="w-12 h-12 rounded-lg object-contain border border-gray-200 mr-4"
                            />
                            <div>
                              <h3 className="font-bold text-lg line-clamp-1 hover:text-primary-500 transition-colors">
                                <Link to={`/jobs/${application.id}`}>
                                  {application.title}
                                </Link>
                              </h3>
                              <p className="text-gray-600">{application.company.name}</p>
                              <div className="flex items-center text-sm text-gray-500 mt-1">
                                <span>Applied on {application.appliedDate}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`badge ${getStatusBadgeClass(application.status)}`}>
                              {application.status}
                            </span>
                            <Link to={`/dashboard/applications/${application.id}`} className="text-primary-500">
                              Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-8 text-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FiBriefcase className="text-gray-400" size={24} />
                      </div>
                      <h3 className="text-lg font-medium text-gray-900 mb-1">No applications yet</h3>
                      <p className="text-gray-500 mb-4">Start applying to jobs to see your applications here.</p>
                      <Link to="/jobs" className="btn-primary">
                        Browse Jobs
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Upcoming Interviews */}
              {upcomingInterviews.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl shadow-md overflow-hidden"
                >
                  <div className="p-6 border-b">
                    <h2 className="text-xl font-bold flex items-center">
                      <FiCalendar className="mr-2 text-primary-500" /> Upcoming Interviews
                    </h2>
                  </div>
                  <div className="divide-y">
                    {upcomingInterviews.map(interview => (
                      <div key={interview.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="sm:flex justify-between items-start">
                          <div className="flex mb-4 sm:mb-0">
                            <img 
                              src={interview.company.logo} 
                              alt={interview.company.name}
                              className="w-12 h-12 rounded-lg object-contain border border-gray-200 mr-4"
                            />
                            <div>
                              <h3 className="font-bold text-lg line-clamp-1 hover:text-primary-500 transition-colors">
                                <Link to={`/jobs/${interview.id}`}>
                                  {interview.title}
                                </Link>
                              </h3>
                              <p className="text-gray-600">{interview.company.name}</p>
                              <div className="flex items-center text-sm text-gray-500 mt-1 space-x-3">
                                <span className="flex items-center">
                                  <FiCalendar className="mr-1" size={14} /> {interview.interviewDate}
                                </span>
                                <span className="flex items-center">
                                  <FiMessageSquare className="mr-1" size={14} /> {interview.interviewType}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div>
                            <Link 
                              to={`/dashboard/interviews/${interview.id}`} 
                              className="btn-primary py-2 px-4 text-sm"
                            >
                              Prepare
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Profile Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 text-center border-b">
                  <img 
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'User'}&background=random`} 
                    alt={user?.name || 'User'}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-primary-100"
                  />
                  <h3 className="font-bold text-lg mb-1">{user?.name || 'User'}</h3>
                  <p className="text-gray-500">{user?.email || 'user@example.com'}</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm text-gray-500">Profile Completion</span>
                        <span className="text-xs font-medium text-primary-500">65%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary-500 h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">
                      Complete your profile to increase your chances of getting hired.
                    </p>
                    <Link 
                      to="/dashboard/profile" 
                      className="btn-outline w-full text-center py-2 text-sm"
                    >
                      Complete Profile
                    </Link>
                  </div>
                </div>
              </motion.div>
              
              {/* Saved Jobs */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center">
                    <FiBookmark className="mr-2 text-primary-500" /> Saved Jobs
                  </h2>
                  <Link to="/dashboard/saved-jobs" className="text-primary-500 text-sm font-medium flex items-center">
                    View All <FiChevronRight className="ml-1" />
                  </Link>
                </div>
                <div>
                  {savedJobs.length > 0 ? (
                    <div className="divide-y">
                      {savedJobs.map(job => (
                        <div key={job.id} className="p-4 hover:bg-gray-50 transition-colors">
                          <div className="flex items-start">
                            <img 
                              src={job.company.logo} 
                              alt={job.company.name}
                              className="w-10 h-10 rounded-lg object-contain border border-gray-200 mr-3"
                            />
                            <div>
                              <h3 className="font-medium text-gray-900 line-clamp-1 hover:text-primary-500 transition-colors">
                                <Link to={`/jobs/${job.id}`}>
                                  {job.title}
                                </Link>
                              </h3>
                              <p className="text-sm text-gray-500">{job.company.name}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-6 text-center">
                      <p className="text-gray-500 mb-4">
                        You haven't saved any jobs yet.
                      </p>
                      <Link to="/jobs" className="btn-primary py-2 px-4 text-sm">
                        Browse Jobs
                      </Link>
                    </div>
                  )}
                </div>
              </motion.div>
              
              {/* Career Tips */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold flex items-center">
                    <FiTrendingUp className="mr-2 text-primary-500" /> Career Tips
                  </h2>
                </div>
                <div className="divide-y">
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <Link to="#" className="block">
                      <h3 className="font-medium text-gray-900 hover:text-primary-500 transition-colors mb-1">
                        10 Tips for a Successful Job Interview
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        Learn how to make a great impression and ace your next job interview.
                      </p>
                    </Link>
                  </div>
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <Link to="#" className="block">
                      <h3 className="font-medium text-gray-900 hover:text-primary-500 transition-colors mb-1">
                        How to Create a Standout Resume
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        Tips and tricks to make your resume catch the attention of recruiters.
                      </p>
                    </Link>
                  </div>
                  <div className="p-4 hover:bg-gray-50 transition-colors">
                    <Link to="#" className="block">
                      <h3 className="font-medium text-gray-900 hover:text-primary-500 transition-colors mb-1">
                        Negotiating Your Salary: A Complete Guide
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        Learn how to negotiate the salary you deserve with confidence.
                      </p>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default JobSeekerDashboard