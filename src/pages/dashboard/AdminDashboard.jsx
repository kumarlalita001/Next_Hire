import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, AreaChart, Area } from 'recharts'
import { FiUsers, FiBriefcase, FiUserCheck, FiDollarSign, FiUserPlus, FiBell, FiFlag, FiTrendingUp, FiActivity, FiSettings } from 'react-icons/fi'
import { useAuth } from '@context/AuthContext'

const AdminDashboard = () => {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    totalUsers: 0,
    jobSeekers: 0,
    recruiters: 0,
    activeJobs: 0,
    totalRevenue: 0,
    newUsersToday: 0
  })
  const [notificationCount, setNotificationCount] = useState(0)
  const [recentUsers, setRecentUsers] = useState([])
  const [reports, setReports] = useState([])
  
  useEffect(() => {
    // Simulate API call to fetch admin stats
    setTimeout(() => {
      // Generate random stats
      const totalUsers = Math.floor(Math.random() * 5000) + 10000
      const jobSeekers = Math.floor(totalUsers * 0.8)
      const recruiters = totalUsers - jobSeekers
      const activeJobs = Math.floor(Math.random() * 5000) + 5000
      const totalRevenue = Math.floor(Math.random() * 50000) + 100000
      const newUsersToday = Math.floor(Math.random() * 50) + 20
      
      // Update stats
      setStats({
        totalUsers,
        jobSeekers,
        recruiters,
        activeJobs,
        totalRevenue,
        newUsersToday
      })
      
      // Random notifications count
      setNotificationCount(Math.floor(Math.random() * 10) + 1)
      
      // Generate random recent users
      const userTypes = ['Job Seeker', 'Recruiter', 'Job Seeker', 'Job Seeker', 'Recruiter']
      const names = ['John Doe', 'Jane Smith', 'Robert Johnson', 'Emily Davis', 'Michael Wilson']
      
      const randomUsers = Array(5).fill().map((_, index) => ({
        id: `user-${index + 1}`,
        name: names[index],
        email: `${names[index].toLowerCase().replace(' ', '.')}@example.com`,
        type: userTypes[index],
        avatar: `https://i.pravatar.cc/150?img=${index + 10}`,
        joinedDate: getRandomDate(7)
      }))
      
      setRecentUsers(randomUsers)
      
      // Generate random reports
      const reportReasons = [
        'Inappropriate content', 
        'Fake job posting', 
        'Spam', 
        'Misleading information', 
        'Discriminatory content'
      ]
      
      const randomReports = Array(5).fill().map((_, index) => ({
        id: `report-${index + 1}`,
        reason: reportReasons[index],
        reportedBy: `user-${Math.floor(Math.random() * 1000) + 1}`,
        targetType: Math.random() > 0.5 ? 'Job' : 'User',
        targetId: `${Math.random() > 0.5 ? 'job' : 'user'}-${Math.floor(Math.random() * 1000) + 1}`,
        status: ['Pending', 'Reviewing', 'Resolved'][Math.floor(Math.random() * 3)],
        reportedDate: getRandomDate(14)
      }))
      
      setReports(randomReports)
    }, 1000)
  }, [])
  
  // Helper function to get random past date (within last X days)
  const getRandomDate = (daysAgo) => {
    const date = new Date()
    date.setDate(date.getDate() - Math.floor(Math.random() * daysAgo))
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  }
  
  // Data for new users chart (last 7 days)
  const newUsersData = [
    { name: 'Mon', users: 42 },
    { name: 'Tue', users: 54 },
    { name: 'Wed', users: 37 },
    { name: 'Thu', users: 48 },
    { name: 'Fri', users: 65 },
    { name: 'Sat', users: 39 },
    { name: 'Sun', users: 27 }
  ]
  
  // Data for jobs posted chart (last 7 days)
  const jobsPostedData = [
    { name: 'Mon', jobs: 12 },
    { name: 'Tue', jobs: 18 },
    { name: 'Wed', jobs: 15 },
    { name: 'Thu', jobs: 20 },
    { name: 'Fri', jobs: 22 },
    { name: 'Sat', jobs: 8 },
    { name: 'Sun', jobs: 5 }
  ]
  
  // Data for revenue chart (last 12 months)
  const revenueData = Array(12).fill().map((_, i) => {
    const month = new Date(0, i).toLocaleString('default', { month: 'short' })
    return {
      name: month,
      revenue: Math.floor(Math.random() * 15000) + 5000
    }
  })
  
  // Get report status badge color
  const getReportStatusBadgeClass = (status) => {
    switch(status) {
      case 'Pending':
        return 'badge-secondary'
      case 'Reviewing':
        return 'badge-primary'
      case 'Resolved':
        return 'badge-success'
      default:
        return 'badge-secondary'
    }
  }
  
  return (
    <>
      <Helmet>
        <title>Admin Dashboard | JobHunt</title>
        <meta name="description" content="Manage the JobHunt platform, monitor user activity, and maintain platform integrity." />
      </Helmet>
      
      <div className="bg-gray-50 min-h-screen pb-12">
        {/* Dashboard Header */}
        <div className="bg-gradient-to-r from-primary-600 to-secondary-600 py-8">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-white text-3xl font-bold">Admin Dashboard</h1>
                <p className="text-white text-opacity-80 mt-2">
                  Welcome back, {user?.name || 'Admin'}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <button className="p-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors">
                    <FiBell size={20} />
                    {notificationCount > 0 && (
                      <span className="absolute top-0 right-0 transform translate-x-1/2 -translate-y-1/2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </button>
                </div>
                <div>
                  <button className="p-2 bg-white bg-opacity-20 text-white rounded-lg hover:bg-opacity-30 transition-colors">
                    <FiSettings size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 -mt-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6 mb-8">
            {/* Total Users */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-4">
                  <FiUsers size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Users</p>
                  <h3 className="text-2xl font-bold">{stats.totalUsers.toLocaleString()}</h3>
                </div>
              </div>
            </motion.div>
            
            {/* Job Seekers */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-secondary-100 text-secondary-500 flex items-center justify-center mr-4">
                  <FiUserCheck size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Job Seekers</p>
                  <h3 className="text-2xl font-bold">{stats.jobSeekers.toLocaleString()}</h3>
                </div>
              </div>
            </motion.div>
            
            {/* Recruiters */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-accent-100 text-accent-500 flex items-center justify-center mr-4">
                  <FiUserCheck size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Recruiters</p>
                  <h3 className="text-2xl font-bold">{stats.recruiters.toLocaleString()}</h3>
                </div>
              </div>
            </motion.div>
            
            {/* Active Jobs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-success-100 text-success-500 flex items-center justify-center mr-4">
                  <FiBriefcase size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Active Jobs</p>
                  <h3 className="text-2xl font-bold">{stats.activeJobs.toLocaleString()}</h3>
                </div>
              </div>
            </motion.div>
            
            {/* Revenue */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-error-100 text-error-500 flex items-center justify-center mr-4">
                  <FiDollarSign size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Revenue</p>
                  <h3 className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</h3>
                </div>
              </div>
            </motion.div>
            
            {/* New Users Today */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="bg-white rounded-xl shadow-md p-6"
            >
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-primary-100 text-primary-500 flex items-center justify-center mr-4">
                  <FiUserPlus size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">New Today</p>
                  <h3 className="text-2xl font-bold">{stats.newUsersToday}</h3>
                </div>
              </div>
            </motion.div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* New Users Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center">
                    <FiUserPlus className="mr-2 text-primary-500" /> New User Registrations
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Last 7 days</span>
                    <button className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                      <FiActivity size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={newUsersData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Area type="monotone" dataKey="users" stroke="#3B82F6" fill="#93c5fd" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
              
              {/* Reports Table */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center">
                    <FiFlag className="mr-2 text-primary-500" /> Recent Reports
                  </h2>
                  <Link to="/admin/reports" className="text-primary-500 text-sm font-medium">
                    View All
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reason
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Target
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Reported On
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Action
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {reports.map((report) => (
                        <tr key={report.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{report.reason}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {report.targetType}: #{report.targetId}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{report.reportedDate}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`badge ${getReportStatusBadgeClass(report.status)}`}>
                              {report.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link to={`/admin/reports/${report.id}`} className="text-primary-500 hover:text-primary-600">
                              Review
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
              
              {/* Revenue Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center">
                    <FiTrendingUp className="mr-2 text-primary-500" /> Revenue Trends
                  </h2>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Last 12 months</span>
                    <button className="p-1.5 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors">
                      <FiActivity size={16} />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={revenueData}
                        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip 
                          formatter={(value) => ['$' + value.toLocaleString(), 'Revenue']}
                        />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#10B981" 
                          strokeWidth={2}
                          dot={{ r: 4 }}
                          activeDot={{ r: 6 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </motion.div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Admin Profile Card */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 text-center border-b">
                  <img 
                    src={user?.avatar || `https://ui-avatars.com/api/?name=${user?.name || 'Admin'}&background=random`} 
                    alt={user?.name || 'Admin'}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-primary-100"
                  />
                  <h3 className="font-bold text-lg mb-1">{user?.name || 'Admin User'}</h3>
                  <p className="text-gray-500">System Administrator</p>
                </div>
                <div className="p-6">
                  <Link 
                    to="/admin/settings" 
                    className="btn-outline w-full text-center py-2 text-sm flex items-center justify-center"
                  >
                    <FiSettings className="mr-2" /> System Settings
                  </Link>
                </div>
              </motion.div>
              
              {/* Recent Users */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b flex justify-between items-center">
                  <h2 className="text-xl font-bold flex items-center">
                    <FiUserPlus className="mr-2 text-primary-500" /> New Users
                  </h2>
                  <Link to="/admin/users" className="text-primary-500 text-sm font-medium">
                    View All
                  </Link>
                </div>
                <div className="divide-y">
                  {recentUsers.map(user => (
                    <div key={user.id} className="p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover border border-gray-200 mr-3"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900 line-clamp-1">
                            {user.name}
                          </h3>
                          <p className="text-xs text-gray-500">{user.email}</p>
                          <div className="flex items-center mt-1">
                            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                              {user.type}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">
                              Joined {user.joinedDate}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
              
              {/* Jobs Posted Chart */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold flex items-center">
                    <FiBriefcase className="mr-2 text-primary-500" /> Jobs Posted
                  </h2>
                </div>
                <div className="p-6">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={jobsPostedData}
                        margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="jobs" fill="#10B981" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="mt-4 text-center">
                    <span className="text-sm font-medium text-gray-500">Last 7 days</span>
                  </div>
                </div>
              </motion.div>
              
              {/* Quick Actions */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl shadow-md overflow-hidden"
              >
                <div className="p-6 border-b">
                  <h2 className="text-xl font-bold">Quick Actions</h2>
                </div>
                <div className="p-4 space-y-2">
                  <Link 
                    to="/admin/users/new" 
                    className="btn-primary bg-white border border-primary-500 text-primary-500 hover:bg-primary-50 w-full text-center py-2.5 flex items-center justify-center"
                  >
                    <FiUserPlus className="mr-2" /> Add New User
                  </Link>
                  <Link 
                    to="/admin/reports" 
                    className="btn-primary bg-white border border-primary-500 text-primary-500 hover:bg-primary-50 w-full text-center py-2.5 flex items-center justify-center"
                  >
                    <FiFlag className="mr-2" /> Review Reports
                  </Link>
                  <Link 
                    to="/admin/jobs" 
                    className="btn-primary bg-white border border-primary-500 text-primary-500 hover:bg-primary-50 w-full text-center py-2.5 flex items-center justify-center"
                  >
                    <FiBriefcase className="mr-2" /> Manage Jobs
                  </Link>
                  <Link 
                    to="/admin/analytics" 
                    className="btn-primary bg-white border border-primary-500 text-primary-500 hover:bg-primary-50 w-full text-center py-2.5 flex items-center justify-center"
                  >
                    <FiTrendingUp className="mr-2" /> View Analytics
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminDashboard