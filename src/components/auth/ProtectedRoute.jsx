import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import Loader from '@components/ui/Loader'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()
  const location = useLocation()
  
  if (loading) {
    return <Loader fullScreen />
  }
  
  if (!user) {
    // Redirect to login and remember where they tried to go
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  
  return children
}

export default ProtectedRoute