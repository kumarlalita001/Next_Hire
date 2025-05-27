import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiX, FiUser, FiLogOut } from 'react-icons/fi'
import { useAuth } from '@context/AuthContext'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [location])
  
  // Add scroll event listener
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Animation variants
  const mobileMenuVariants = {
    closed: { opacity: 0, y: -20, transition: { duration: 0.2 } },
    open: { opacity: 1, y: 0, transition: { duration: 0.2 } }
  }
  
  const userMenuVariants = {
    closed: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
    open: { opacity: 1, scale: 1, transition: { duration: 0.2 } }
  }

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
              JobHunt
            </span>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/"
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-primary-500' 
                    : isScrolled ? 'text-gray-800 hover:text-primary-500' : 'text-gray-600 hover:text-black'
                }`
              }
            >
              Home
            </NavLink>
            <NavLink 
              to="/jobs"
              className={({ isActive }) => 
                `text-sm font-medium transition-colors ${
                  isActive 
                    ? 'text-primary-500' 
                    : isScrolled ? 'text-gray-800 hover:text-primary-500' : 'text-gray-600 hover:text-black'
                }`
              }
            >
              Jobs
            </NavLink>
            <NavLink 
              to="/#about"
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-800 hover:text-primary-500' : 'text-gray-600 hover:text-black'
              }`}
            >
              About
            </NavLink>
            <NavLink 
              to="/#testimonials"
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-800 hover:text-primary-500' : 'text-gray-600 hover:text-black'
              }`}
            >
              Testimonials
            </NavLink>
            <NavLink 
              to="/#contact"
              className={`text-sm font-medium transition-colors ${
                isScrolled ? 'text-gray-800 hover:text-primary-500' : 'text-gray-600 hover:text-black'
              }`}
            >
              Contact
            </NavLink>
          </div>
          
          {/* Auth Buttons / User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 focus:outline-none"
                >
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full object-cover border-2 border-primary-500"
                  />
                  <span className={isScrolled ? 'text-gray-800' : 'text-white'}>
                    {user.name}
                  </span>
                </button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div 
                      initial="closed"
                      animate="open"
                      exit="closed"
                      variants={userMenuVariants}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50"
                    >
                      <Link 
                        to="/dashboard" 
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Dashboard
                      </Link>
                      <button
                        onClick={logout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className={`btn-outline rounded-lg px-4 py-2 text-sm font-medium ${
                    isScrolled 
                      ? 'text-gray-800 border-gray-300' 
                      : 'text-white border-white'
                  }`}
                >
                  Log In
                </Link>
                <Link 
                  to="/register" 
                  className="btn-primary rounded-lg px-4 py-2 text-sm font-medium"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden focus:outline-none"
          >
            {isOpen ? (
              <FiX className={isScrolled ? 'text-gray-800' : 'text-gray-800'} size={24} />
            ) : (
              <FiMenu className={isScrolled ? 'text-gray-800' : 'text-gray-800'} size={24} />
            )}
          </button>
        </div>
        
        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={mobileMenuVariants}
              className="md:hidden mt-4 bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="py-2">
                <NavLink 
                  to="/"
                  className={({ isActive }) => 
                    `block px-4 py-2 text-sm font-medium ${
                      isActive ? 'text-primary-500 bg-gray-50' : 'text-gray-800 hover:text-primary-500'
                    }`
                  }
                >
                  Home
                </NavLink>
                <NavLink 
                  to="/jobs"
                  className={({ isActive }) => 
                    `block px-4 py-2 text-sm font-medium ${
                      isActive ? 'text-primary-500 bg-gray-50' : 'text-gray-800 hover:text-primary-500'
                    }`
                  }
                >
                  Jobs
                </NavLink>
                <NavLink 
                  to="/#about"
                  className="block px-4 py-2 text-sm font-medium text-gray-800 hover:text-primary-500"
                >
                  About
                </NavLink>
                <NavLink 
                  to="/#testimonials"
                  className="block px-4 py-2 text-sm font-medium text-gray-800 hover:text-primary-500"
                >
                  Testimonials
                </NavLink>
                <NavLink 
                  to="/#contact"
                  className="block px-4 py-2 text-sm font-medium text-gray-800 hover:text-primary-500"
                >
                  Contact
                </NavLink>
                
                <div className="border-t border-gray-200 mt-2 pt-2">
                  {user ? (
                    <>
                      <div className="px-4 py-2 flex items-center space-x-2">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover border-2 border-primary-500"
                        />
                        <span className="text-sm font-medium text-gray-800">
                          {user.name}
                        </span>
                      </div>
                      <Link 
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-sm font-medium text-gray-800 hover:text-primary-500"
                      >
                        <FiUser className="mr-2" /> Dashboard
                      </Link>
                      <button
                        onClick={logout}
                        className="w-full flex items-center px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700"
                      >
                        <FiLogOut className="mr-2" /> Logout
                      </button>
                    </>
                  ) : (
                    <div className="flex flex-col space-y-2 px-4 py-2">
                      <Link 
                        to="/login" 
                        className="btn-outline text-center rounded-lg px-4 py-2 text-sm font-medium"
                      >
                        Log In
                      </Link>
                      <Link 
                        to="/register" 
                        className="btn-primary text-center rounded-lg px-4 py-2 text-sm font-medium"
                      >
                        Sign Up
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}

export default Navbar