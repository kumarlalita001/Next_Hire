import { createContext, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

// Create the auth context
const AuthContext = createContext()

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()
  
  // Check for saved user in localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('jobhunt_user')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      setUser(parsedUser)
      setUserType(parsedUser.userType)
    }
    setLoading(false)
  }, [])
  
  // Login function
  const login = async (email, password, type) => {
    try {
      // Simulating API call for authentication
      setLoading(true)
      
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Validate credentials (mock - in a real app this would be done on the server)
      if (email && password) {
        // Create mock user based on login type
        const newUser = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          userType: type,
          avatar: `https://ui-avatars.com/api/?name=${email.split('@')[0]}&background=random`
        }
        
        // Save user to state and localStorage
        setUser(newUser)
        setUserType(type)
        localStorage.setItem('jobhunt_user', JSON.stringify(newUser))
        
        toast.success('Successfully logged in')
        navigate('/dashboard')
        return true
      } else {
        toast.error('Invalid credentials')
        return false
      }
    } catch (error) {
      toast.error('Login failed: ' + error.message)
      return false
    } finally {
      setLoading(false)
    }
  }
  
  // Register function
  const register = async (userData, type) => {
    try {
      setLoading(true)
      
      // Simulating API call for registration
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Create mock user based on registration data
      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        ...userData,
        userType: type,
        avatar: `https://ui-avatars.com/api/?name=${userData.name}&background=random`
      }
      
      // Save user to state and localStorage
      setUser(newUser)
      setUserType(type)
      localStorage.setItem('jobhunt_user', JSON.stringify(newUser))
      
      toast.success('Registration successful')
      navigate('/dashboard')
      return true
    } catch (error) {
      toast.error('Registration failed: ' + error.message)
      return false
    } finally {
      setLoading(false)
    }
  }
  
  // Logout function
  const logout = () => {
    setUser(null)
    setUserType(null)
    localStorage.removeItem('jobhunt_user')
    toast.success('Successfully logged out')
    navigate('/')
  }
  
  // Password reset function (mock)
  const resetPassword = async (email) => {
    try {
      setLoading(true)
      
      // Simulating API call for password reset
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      toast.success('Password reset link sent to your email')
      navigate('/login')
      return true
    } catch (error) {
      toast.error('Password reset failed: ' + error.message)
      return false
    } finally {
      setLoading(false)
    }
  }
  
  // Auth context value
  const value = {
    user,
    userType,
    loading,
    login,
    register,
    logout,
    resetPassword
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}