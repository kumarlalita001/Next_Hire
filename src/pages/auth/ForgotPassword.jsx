import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { FiMail, FiAlertCircle, FiArrowLeft, FiCheck } from 'react-icons/fi'
import { useAuth } from '@context/AuthContext'

const ForgotPassword = () => {
  const { resetPassword } = useAuth()
  const navigate = useNavigate()
  const [isSubmitted, setIsSubmitted] = useState(false)
  
  // Reset password validation schema
  const resetPasswordSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  })
  
  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      const success = await resetPassword(values.email)
      
      if (success) {
        setIsSubmitted(true)
      } else {
        setErrors({ email: 'Failed to send reset link. Please try again.' })
      }
    } catch (error) {
      setErrors({ email: error.message || 'Failed to send reset link. Please try again.' })
    } finally {
      setSubmitting(false)
    }
  }
  
  return (
    <>
      <Helmet>
        <title>Reset Password | JobHunt</title>
        <meta name="description" content="Reset your password to regain access to your JobHunt account." />
      </Helmet>
      
      <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <Link to="/" className="flex justify-center mb-6">
            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
              JobHunt
            </span>
          </Link>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Reset your password
          </h2>
          <p className="mt-2 text-center text-gray-600">
            {isSubmitted 
              ? "Check your email for instructions" 
              : "Enter your email and we'll send you a link to reset your password"}
          </p>
        </div>
        
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white py-8 px-4 shadow-lg sm:rounded-xl sm:px-10"
          >
            {isSubmitted ? (
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <FiCheck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Check your email</h3>
                <p className="text-sm text-gray-500 mb-6">
                  We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
                </p>
                <div className="flex flex-col space-y-4">
                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="btn-outline"
                  >
                    Try a different email
                  </button>
                  <Link to="/login" className="btn-primary">
                    Back to login
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <Formik
                  initialValues={{ email: '' }}
                  validationSchema={resetPasswordSchema}
                  onSubmit={handleSubmit}
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
                              Sending...
                            </>
                          ) : "Send reset link"}
                        </button>
                      </div>
                    </Form>
                  )}
                </Formik>
                
                <div className="mt-6 flex items-center justify-center">
                  <Link
                    to="/login"
                    className="flex items-center text-sm text-primary-500 hover:text-primary-400"
                  >
                    <FiArrowLeft className="mr-2" /> Back to login
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword