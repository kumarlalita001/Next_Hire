import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FiMail, FiLock, FiAlertCircle, FiUser, FiBriefcase, FiShield } from 'react-icons/fi'
import { useAuth } from '@context/AuthContext'

const Login = () => {
  const { login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [userType, setUserType] = useState('jobseeker')
  
  // Get the page user was trying to access before being redirected to login
  const from = location.state?.from || '/dashboard'
  
  // Login validation schema
  const loginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })
  
  // Handle login form submission
  const handleLogin = async (values, { setSubmitting, setErrors }) => {
    try {
      const success = await login(values.email, values.password, userType)
      
      if (success) {
        navigate(from)
      } else {
        setErrors({ password: 'Invalid credentials. Please try again.' })
      }
    } catch (error) {
      setErrors({ password: error.message || 'Login failed. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }
  
  return (
    <>
      <Helmet>
        <title>Log In | JobHunt</title>
        <meta name="description" content="Log in to your JobHunt account to manage your job applications, saved jobs, and profile information." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center mb-6">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
              JobHunt
            </span>
          </Link>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Welcome back
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Log in to your account to continue your job search
          </p>
        </div>
        
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10"
          >
            {/* User Type Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                I am a:
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setUserType('jobseeker')}
                  className={`py-3 px-4 flex flex-col items-center justify-center text-center rounded-lg border-2 transition-colors ${
                    userType === 'jobseeker'
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <FiUser size={20} className="mb-1" />
                  <span className="text-sm">Job Seeker</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('recruiter')}
                  className={`py-3 px-4 flex flex-col items-center justify-center text-center rounded-lg border-2 transition-colors ${
                    userType === 'recruiter'
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <FiBriefcase size={20} className="mb-1" />
                  <span className="text-sm">Recruiter</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUserType('admin')}
                  className={`py-3 px-4 flex flex-col items-center justify-center text-center rounded-lg border-2 transition-colors ${
                    userType === 'admin'
                      ? 'bg-primary-50 border-primary-500 text-primary-700'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700'
                  }`}
                >
                  <FiShield size={20} className="mb-1" />
                  <span className="text-sm">Admin</span>
                </button>
              </div>
            </div>
            
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={loginSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-6">
                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiMail className="text-gray-400" />
                      </div>
                      <Field
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Your email address"
                        className={`pl-10 input ${
                          errors.email && touched.email ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                        }`}
                      />
                      <ErrorMessage name="email">
                        {msg => (
                          <div className="flex items-center text-red-500 text-sm mt-1">
                            <FiAlertCircle className="mr-1" />
                            <span>{msg}</span>
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                  </div>
                  
                  {/* Password Field */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                        Password
                      </label>
                      <Link to="/forgot-password" className="text-sm text-primary-500 hover:text-primary-400">
                        Forgot your password?
                      </Link>
                    </div>
                    <div className="mt-1 relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FiLock className="text-gray-400" />
                      </div>
                      <Field
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Your password"
                        className={`pl-10 input ${
                          errors.password && touched.password ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                        }`}
                      />
                      <ErrorMessage name="password">
                        {msg => (
                          <div className="flex items-center text-red-500 text-sm mt-1">
                            <FiAlertCircle className="mr-1" />
                            <span>{msg}</span>
                          </div>
                        )}
                      </ErrorMessage>
                    </div>
                  </div>
                  
                  {/* Remember Me */}
                  <div className="flex items-center">
                    <Field
                      id="remember_me"
                      name="remember_me"
                      type="checkbox"
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                      Remember me
                    </label>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="btn-primary w-full flex justify-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Logging in...
                        </>
                      ) : "Log in"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    New to JobHunt?
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <Link
                  to="/register"
                  className="w-full flex justify-center py-3 px-4 border border-primary-500 shadow-sm text-sm font-medium rounded-md text-primary-500 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Create an account
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Login