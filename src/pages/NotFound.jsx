import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { FiArrowLeft, FiHome, FiBriefcase } from 'react-icons/fi'

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Page Not Found | JobHunt</title>
        <meta name="description" content="The page you're looking for cannot be found." />
      </Helmet>
      
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-md w-full text-center"
        >
          <div className="mb-8">
            <span className="inline-block text-primary-500 text-9xl font-bold">404</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Page Not Found</h1>
          <p className="text-gray-600 mb-8">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <Link 
              to="/"
              className="btn-primary flex items-center justify-center"
            >
              <FiHome className="mr-2" /> Go Home
            </Link>
            <Link 
              to="/jobs"
              className="btn-outline flex items-center justify-center"
            >
              <FiBriefcase className="mr-2" /> Browse Jobs
            </Link>
          </div>
          <Link 
            to="javascript:history.back()"
            className="inline-flex items-center text-primary-500 hover:text-primary-600 mt-6"
          >
            <FiArrowLeft className="mr-2" /> Go Back
          </Link>
        </motion.div>
      </div>
    </>
  )
}

export default NotFound