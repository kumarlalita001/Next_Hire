import { useState, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiMapPin, FiDollarSign, FiBriefcase, FiFilter, FiX, FiClock, FiChevronRight, FiHome } from 'react-icons/fi'
import debounce from 'lodash.debounce'
import { useInView } from 'react-intersection-observer'
import Loader from '@components/ui/Loader'

// Import dummy data
import { jobsData } from '@data/jobsData'

const JobsList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredJobs, setFilteredJobs] = useState([])
  const [visibleJobs, setVisibleJobs] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const jobsPerPage = 10
  const [hasMore, setHasMore] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(false)
  
  // Filters
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedSalaryRange, setSelectedSalaryRange] = useState('')
  const [selectedJobType, setSelectedJobType] = useState('')
  const [selectedExperience, setSelectedExperience] = useState('')
  
  // Get unique locations, job types, and experience levels from data
  const locations = [...new Set(jobsData.map(job => job.location.city))].sort()
  const jobTypes = [...new Set(jobsData.map(job => job.type))].sort()
  const experienceLevels = [...new Set(jobsData.map(job => job.experience))].sort()
  
  // Salary ranges
  const salaryRanges = [
    { id: 'any', label: 'Any Salary', min: 0, max: 1000000 },
    { id: '0-50k', label: '$0 - $50K', min: 0, max: 50000 },
    { id: '50k-100k', label: '$50K - $100K', min: 50000, max: 100000 },
    { id: '100k-150k', label: '$100K - $150K', min: 100000, max: 150000 },
    { id: '150k-200k', label: '$150K - $200K', min: 150000, max: 200000 },
    { id: '200k+', label: '$200K+', min: 200000, max: 1000000 }
  ]
  
  // Intersection observer for infinite scroll
  const { ref, inView } = useInView({ threshold: 0.1 })
  
  // Handle search with debounce
  const debouncedSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term)
      setPage(1)
    }, 500),
    []
  )
  
  const handleSearchChange = (e) => {
    debouncedSearch(e.target.value)
  }
  
  // Apply filters to jobs data
  useEffect(() => {
    setLoading(true)
    
    // Simulate API delay
    setTimeout(() => {
      let results = [...jobsData]
      
      // Apply search filter
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        results = results.filter(job => 
          job.title.toLowerCase().includes(searchLower) || 
          job.company.name.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower)
        )
      }
      
      // Apply location filter
      if (selectedLocation) {
        results = results.filter(job => job.location.city === selectedLocation)
      }
      
      // Apply salary filter
      if (selectedSalaryRange) {
        const range = salaryRanges.find(range => range.id === selectedSalaryRange)
        if (range) {
          results = results.filter(job => 
            job.salary >= range.min && job.salary <= range.max
          )
        }
      }
      
      // Apply job type filter
      if (selectedJobType) {
        results = results.filter(job => job.type === selectedJobType)
      }
      
      // Apply experience filter
      if (selectedExperience) {
        results = results.filter(job => job.experience === selectedExperience)
      }
      
      setFilteredJobs(results)
      setPage(1)
      setVisibleJobs(results.slice(0, jobsPerPage))
      setHasMore(results.length > jobsPerPage)
      setLoading(false)
    }, 500)
  }, [searchTerm, selectedLocation, selectedSalaryRange, selectedJobType, selectedExperience])
  
  // Handle infinite scroll
  useEffect(() => {
    if (inView && hasMore && !loading) {
      loadMoreJobs()
    }
  }, [inView, hasMore])
  
  const loadMoreJobs = () => {
    const nextPage = page + 1
    const start = (nextPage - 1) * jobsPerPage
    const end = start + jobsPerPage
    
    if (start < filteredJobs.length) {
      setLoading(true)
      
      // Simulate API delay
      setTimeout(() => {
        const newVisibleJobs = [...visibleJobs, ...filteredJobs.slice(start, end)]
        setVisibleJobs(newVisibleJobs)
        setPage(nextPage)
        setHasMore(end < filteredJobs.length)
        setLoading(false)
      }, 500)
    } else {
      setHasMore(false)
    }
  }
  
  // Clear all filters
  const clearFilters = () => {
    setSelectedLocation('')
    setSelectedSalaryRange('')
    setSelectedJobType('')
    setSelectedExperience('')
    setSearchTerm('')
    setPage(1)
  }
  
  // Count active filters
  const activeFiltersCount = [
    selectedLocation, 
    selectedSalaryRange, 
    selectedJobType,
    selectedExperience
  ].filter(Boolean).length
  
  return (
    <>
      <Helmet>
        <title>Browse Jobs | JobHunt</title>
        <meta name="description" content="Search and filter through thousands of job opportunities. Find your perfect match with advanced filtering options." />
      </Helmet>
      
      <div className="bg-gray-50 min-h-screen py-10">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center text-sm text-gray-500">
            <Link to="/" className="flex items-center hover:text-primary-500">
              <FiHome className="mr-1" /> Home
            </Link>
            <FiChevronRight className="mx-2" />
            <span className="text-gray-900 font-medium">Browse Jobs</span>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters - Desktop */}
            <div className="lg:w-1/4 hidden lg:block">
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="p-6 border-b">
                  <div className="flex justify-between items-center">
                    <h3 className="text-xl font-bold">Filters</h3>
                    {activeFiltersCount > 0 && (
                      <button 
                        onClick={clearFilters}
                        className="text-sm text-primary-500 hover:text-primary-600"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                </div>
                
                {/* Location Filter */}
                <div className="p-6 border-b">
                  <h4 className="font-bold mb-4 flex items-center">
                    <FiMapPin className="mr-2 text-primary-500" /> Location
                  </h4>
                  <select 
                    className="input"
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {locations.map(location => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>
                
                {/* Salary Range Filter */}
                <div className="p-6 border-b">
                  <h4 className="font-bold mb-4 flex items-center">
                    <FiDollarSign className="mr-2 text-primary-500" /> Salary Range
                  </h4>
                  <select 
                    className="input"
                    value={selectedSalaryRange}
                    onChange={(e) => setSelectedSalaryRange(e.target.value)}
                  >
                    <option value="">Any Salary</option>
                    {salaryRanges.slice(1).map(range => (
                      <option key={range.id} value={range.id}>{range.label}</option>
                    ))}
                  </select>
                </div>
                
                {/* Job Type Filter */}
                <div className="p-6 border-b">
                  <h4 className="font-bold mb-4 flex items-center">
                    <FiBriefcase className="mr-2 text-primary-500" /> Job Type
                  </h4>
                  <select 
                    className="input"
                    value={selectedJobType}
                    onChange={(e) => setSelectedJobType(e.target.value)}
                  >
                    <option value="">All Job Types</option>
                    {jobTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
                
                {/* Experience Level Filter */}
                <div className="p-6">
                  <h4 className="font-bold mb-4 flex items-center">
                    <FiClock className="mr-2 text-primary-500" /> Experience Level
                  </h4>
                  <select 
                    className="input"
                    value={selectedExperience}
                    onChange={(e) => setSelectedExperience(e.target.value)}
                  >
                    <option value="">All Experience Levels</option>
                    {experienceLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Search and Filter Bar */}
              <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
                <div className="p-4">
                  <div className="flex flex-col md:flex-row gap-4">
                    {/* Search Input */}
                    <div className="flex-1 relative">
                      <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input 
                        type="text" 
                        placeholder="Search jobs by title, company, or keywords" 
                        className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        onChange={handleSearchChange}
                        defaultValue={searchTerm}
                      />
                    </div>
                    
                    {/* Mobile Filter Button */}
                    <button 
                      className="btn-primary md:hidden flex items-center justify-center"
                      onClick={() => setFiltersOpen(true)}
                    >
                      <FiFilter className="mr-2" />
                      Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
                    </button>
                  </div>
                </div>
              </div>
              
              {/* Results Count */}
              <div className="mb-4 flex justify-between items-center">
                <h2 className="text-xl font-bold">
                  {loading && page === 1 
                    ? "Searching jobs..." 
                    : `${filteredJobs.length} jobs found`}
                </h2>
                
                {activeFiltersCount > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="text-sm text-primary-500 hover:text-primary-600 lg:hidden"
                  >
                    Clear Filters ({activeFiltersCount})
                  </button>
                )}
              </div>
              
              {/* Job Cards List */}
              <div className="space-y-4">
                {loading && page === 1 ? (
                  <div className="py-8 flex justify-center">
                    <Loader />
                  </div>
                ) : visibleJobs.length === 0 ? (
                  <div className="bg-white rounded-xl shadow-md p-8 text-center">
                    <FiSearch className="mx-auto text-gray-400 mb-4" size={48} />
                    <h3 className="text-xl font-bold mb-2">No jobs found</h3>
                    <p className="text-gray-600 mb-4">
                      We couldn't find any jobs matching your search criteria.
                    </p>
                    <button 
                      onClick={clearFilters}
                      className="btn-primary"
                    >
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <motion.div layout className="space-y-4">
                    {visibleJobs.map((job, index) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                    
                    {/* Infinite Scroll Loader */}
                    {hasMore && (
                      <div ref={ref} className="py-4 flex justify-center">
                        {loading && <Loader />}
                      </div>
                    )}
                    
                    {!hasMore && visibleJobs.length > 0 && (
                      <div className="text-center py-4 text-gray-500">
                        You've reached the end of the results.
                      </div>
                    )}
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Filters Modal */}
      {filtersOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto"
          >
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold">Filters</h3>
              <button 
                onClick={() => setFiltersOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <FiX />
              </button>
            </div>
            
            <div className="p-4 space-y-6">
              {/* Location Filter */}
              <div>
                <h4 className="font-bold mb-2 flex items-center">
                  <FiMapPin className="mr-2 text-primary-500" /> Location
                </h4>
                <select 
                  className="input"
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {locations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>
              
              {/* Salary Range Filter */}
              <div>
                <h4 className="font-bold mb-2 flex items-center">
                  <FiDollarSign className="mr-2 text-primary-500" /> Salary Range
                </h4>
                <select 
                  className="input"
                  value={selectedSalaryRange}
                  onChange={(e) => setSelectedSalaryRange(e.target.value)}
                >
                  <option value="">Any Salary</option>
                  {salaryRanges.slice(1).map(range => (
                    <option key={range.id} value={range.id}>{range.label}</option>
                  ))}
                </select>
              </div>
              
              {/* Job Type Filter */}
              <div>
                <h4 className="font-bold mb-2 flex items-center">
                  <FiBriefcase className="mr-2 text-primary-500" /> Job Type
                </h4>
                <select 
                  className="input"
                  value={selectedJobType}
                  onChange={(e) => setSelectedJobType(e.target.value)}
                >
                  <option value="">All Job Types</option>
                  {jobTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              
              {/* Experience Level Filter */}
              <div>
                <h4 className="font-bold mb-2 flex items-center">
                  <FiClock className="mr-2 text-primary-500" /> Experience Level
                </h4>
                <select 
                  className="input"
                  value={selectedExperience}
                  onChange={(e) => setSelectedExperience(e.target.value)}
                >
                  <option value="">All Experience Levels</option>
                  {experienceLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  onClick={clearFilters}
                  className="btn-outline flex-1"
                >
                  Clear All
                </button>
                <button 
                  onClick={() => setFiltersOpen(false)}
                  className="btn-primary flex-1"
                >
                  Apply Filters
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  )
}

// Job Card Component
const JobCard = ({ job }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg border border-transparent hover:border-primary-100"
    >
      <div className="p-6">
        <div className="flex items-start">
          {/* Company Logo */}
          <div className="mr-4">
            <img 
              src={job.company.logo} 
              alt={job.company.name}
              className="w-16 h-16 object-contain rounded-md border border-gray-200"
            />
          </div>
          
          {/* Job Details */}
          <div className="flex-1">
            <h3 className="text-xl font-bold mb-1 hover:text-primary-500 transition-colors">
              <Link to={`/jobs/${job.id}`}>{job.title}</Link>
            </h3>
            <p className="text-gray-600 mb-2">{job.company.name}</p>
            
            {/* Job Metadata */}
            <div className="flex flex-wrap gap-3 mb-4">
              <div className="flex items-center text-sm text-gray-500">
                <FiMapPin className="mr-1" /> {job.location.city}, {job.location.state}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FiBriefcase className="mr-1" /> {job.type}
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <FiDollarSign className="mr-1" /> {job.salary.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })}
              </div>
            </div>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {job.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="badge badge-primary py-1 px-2"
                >
                  {tag}
                </span>
              ))}
            </div>
            
            {/* Short Description */}
            <p className="text-gray-600 mb-4 line-clamp-2">{job.description}</p>
            
            {/* Footer */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">
                Posted {job.postedAt}
              </span>
              <Link 
                to={`/jobs/${job.id}`}
                className="text-primary-500 font-medium hover:text-primary-600 transition-colors flex items-center"
              >
                View Details
                <FiChevronRight className="ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default JobsList