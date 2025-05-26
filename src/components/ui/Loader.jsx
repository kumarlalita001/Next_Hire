import { motion } from 'framer-motion'

const Loader = ({ fullScreen = false }) => {
  if (fullScreen) {
    return (
      <div className="fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50">
        <LoaderAnimation />
      </div>
    )
  }
  
  return <LoaderAnimation />
}

const LoaderAnimation = () => {
  const circleVariants = {
    hidden: { opacity: 0, y: 0 },
    visible: index => ({
      opacity: 1,
      y: [0, -10, 0],
      transition: {
        y: {
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut",
          delay: index * 0.2
        }
      }
    })
  }
  
  return (
    <div className="flex items-center justify-center space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          custom={index}
          initial="hidden"
          animate="visible"
          variants={circleVariants}
          className="w-3 h-3 rounded-full bg-primary-500"
        />
      ))}
    </div>
  )
}

export default Loader