import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FiMail, FiLock, FiAlertCircle, FiUser, FiBriefcase, FiShield, FiPhone } from 'react-icons/fi'
import { useAuth } from '@context/AuthContext'

const Register = () => {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [userType, setUserType] = useState('jobseeker')
  const [step, setStep] = useState(1)
  
  // Registration validation schema - step 1
  const step1Schema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Name is too short')
      .max(50, 'Name is too long')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  })
  
  // Registration validation schema - step 2
  const step2Schema = Yup.object().shape({
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
    phone: Yup.string()
      .min(7, 'Phone number is too short')
      .required('Phone number is required'),
    terms: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  })
  
  // Combined validation schema
  const validationSchema = step === 1 ? step1Schema : step2Schema
  
  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    if (step === 1) {
      // Move to step 2
      setStep(2)
      setSubmitting(false)
      return
    }
    
    try {
      // Remove confirmPassword from submitted data
      const { confirmPassword, ...userData } = values
      
      const success = await register(userData, userType)
      
      if (success) {
        navigate('/dashboard')
      } else {
        setErrors({ general: 'Registration failed. Please try again.' })
      }
    } catch (error) {
      setErrors({ general: error.message || 'Registration failed. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }
  
  return (
    <>
      <Helmet>
        <title>Create Account | JobHunt</title>
        <meta name="description" content="Create a new JobHunt account to find your dream job or recruit top talent." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center mb-6">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
              JobHunt
            </span>
          </Link>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-gray-600">
            Join JobHunt to find your dream job or hire top talent
          </p>
        </div>
        
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10"
          >
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center">
                <div className="w-full flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 1 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    1
                  </div>
                  <div className={`flex-1 h-1 mx-2 ${
                    step >= 2 ? 'bg-primary-500' : 'bg-gray-200'
                  }`}></div>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= 2 ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    2
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-sm">
                <span className="text-primary-600 font-medium">Account Type</span>
                <span className={`${step >= 2 ? 'text-primary-600 font-medium' : 'text-gray-500'}`}>
                  Your Details
                </span>
              </div>
            </div>
            
            {/* Step 1: Account Type */}
            {step === 1 && (
              <>
                {/* User Type Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    I want to register as:
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
              </>
            )}
            
            <Formik
              initialValues={{
                name: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: '',
                terms: false
              }}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form className="space-y-6">
                  {step === 1 ? (
                    <>
                      {/* Name Field */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                          Full Name
                        </label>
                        <div className="mt-1 relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiUser className="text-gray-400" />
                          </div>
                          <Field
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Your full name"
                            className={`pl-10 input ${
                              errors.name && touched.name ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                            }`}
                          />
                          <ErrorMessage name="name">
                            {msg => (
                              <div className="flex items-center text-red-500 text-sm mt-1">
                                <FiAlertCircle className="mr-1" />
                                <span>{msg}</span>
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      
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
                      
                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-primary w-full flex justify-center"
                        >
                          {isSubmitting ? 'Processing...' : 'Continue'}
                        </button>
                      </div>
                    </>
                  ) : (
                    <>
                      {/* Password Field */}
                      <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                          Password
                        </label>
                        <div className="mt-1 relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock className="text-gray-400" />
                          </div>
                          <Field
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Create a password"
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
                      
                      {/* Confirm Password Field */}
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                          Confirm Password
                        </label>
                        <div className="mt-1 relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiLock className="text-gray-400" />
                          </div>
                          <Field
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            placeholder="Confirm your password"
                            className={`pl-10 input ${
                              errors.confirmPassword && touched.confirmPassword ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                            }`}
                          />
                          <ErrorMessage name="confirmPassword">
                            {msg => (
                              <div className="flex items-center text-red-500 text-sm mt-1">
                                <FiAlertCircle className="mr-1" />
                                <span>{msg}</span>
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      
                      {/* Phone Field */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                          Phone Number
                        </label>
                        <div className="mt-1 relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FiPhone className="text-gray-400" />
                          </div>
                          <Field
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            placeholder="Your phone number"
                            className={`pl-10 input ${
                              errors.phone && touched.phone ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
                            }`}
                          />
                          <ErrorMessage name="phone">
                            {msg => (
                              <div className="flex items-center text-red-500 text-sm mt-1">
                                <FiAlertCircle className="mr-1" />
                                <span>{msg}</span>
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      
                      {/* Terms and Conditions */}
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <Field
                            id="terms"
                            name="terms"
                            type="checkbox"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="terms" className="text-gray-500">
                            I agree to the <a href="#" className="text-primary-500 hover:text-primary-400">Terms of Service</a> and <a href="#" className="text-primary-500 hover:text-primary-400">Privacy Policy</a>
                          </label>
                          <ErrorMessage name="terms">
                            {msg => (
                              <div className="flex items-center text-red-500 text-sm mt-1">
                                <FiAlertCircle className="mr-1" />
                                <span>{msg}</span>
                              </div>
                            )}
                          </ErrorMessage>
                        </div>
                      </div>
                      
                      {/* General Error Message */}
                      {errors.general && (
                        <div className="flex items-center text-red-500 text-sm">
                          <FiAlertCircle className="mr-1" />
                          <span>{errors.general}</span>
                        </div>
                      )}
                      
                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="btn-outline w-1/2"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="btn-primary w-1/2 flex justify-center"
                        >
                          {isSubmitting ? (
                            <>
                              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Creating Account...
                            </>
                          ) : "Create Account"}
                        </button>
                      </div>
                    </>
                  )}
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
                    Already have an account?
                  </span>
                </div>
              </div>
              
              <div className="mt-6">
                <Link
                  to="/login"
                  className="w-full flex justify-center py-3 px-4 border border-primary-500 shadow-sm text-sm font-medium rounded-md text-primary-500 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Log in
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default Register