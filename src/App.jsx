import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { useAuth } from '@context/AuthContext'
import Loader from '@components/ui/Loader'
import ProtectedRoute from '@components/auth/ProtectedRoute'
import Layout from '@components/layout/Layout'

// Lazily load page components for better performance
const Home = lazy(() => import('@pages/Home'))
const JobsList = lazy(() => import('@pages/JobsList'))
const JobDetail = lazy(() => import('@pages/JobDetail'))
const Login = lazy(() => import('@pages/auth/Login'))
const Register = lazy(() => import('@pages/auth/Register'))
const ForgotPassword = lazy(() => import('@pages/auth/ForgotPassword'))
const RecruiterDashboard = lazy(() => import('@pages/dashboard/RecruiterDashboard'))
const JobSeekerDashboard = lazy(() => import('@pages/dashboard/JobSeekerDashboard'))
const AdminDashboard = lazy(() => import('@pages/dashboard/AdminDashboard'))
const NotFound = lazy(() => import('@pages/NotFound'))

function App() {
  const { user, userType } = useAuth()
  
  // Select the appropriate dashboard based on user type
  const Dashboard = () => {
    switch(userType) {
      case 'recruiter':
        return <RecruiterDashboard />
      case 'admin':
        return <AdminDashboard />
      default:
        return <JobSeekerDashboard />
    }
  }

  return (
    <Suspense fallback={<Loader fullScreen />}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="jobs" element={<JobsList />} />
          <Route path="jobs/:id" element={<JobDetail />} />
          
          {/* Authentication routes */}
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          
          {/* Protected dashboard routes */}
          <Route 
            path="dashboard/*" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          
          {/* 404 page */}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

export default App