// import { motion } from "framer-motion";
// import {
//   Brain,
//   Building2,
//   Users,
//   Stethoscope,
//   FlaskRound,
//   Hotel,
//   MonitorSmartphone,
//   BookOpen,
//   Radio,
//   Syringe,
//   GraduationCap,
//   Gavel,
//   HeartPulse,
//   Smile,
//   Palette,
//   School,
// } from "lucide-react";

// const categoryIcons = {
//   Engineering: Brain,
//   "Commerce & Banking": Building2,
//   Management: Users,
//   Medical: Stethoscope,
//   Sciences: FlaskRound,
//   "Hotel Management": Hotel,
//   "Information Technology": MonitorSmartphone,
//   "Arts & Humanities": BookOpen,
//   "Mass Communication": Radio,
//   Nursing: Syringe,
//   Agriculture: GraduationCap,
//   Design: Palette,
//   Pharmacy: HeartPulse,
//   Law: Gavel,
//   Paramedical: HeartPulse,
//   Dental: Smile,
//   "Performing Arts": Palette,
//   Education: School,
// };

// // Fake data to simulate category cards
// const mockCategories = Object.entries(categoryIcons).map(([name, icon]) => ({
//   name,
//   icon,
//   count: Math.floor(Math.random() * 10), // Just for visual purpose
//   colleges: Math.random() > 0.3 ? `${Math.floor(Math.random() * 20) + 1} Colleges` : "No colleges",
// }));

// export default function JobFinder() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <div className="min-h-screen bg-white p-6 mt-8  md:p-12">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="max-w-7xl mx-auto"
//       >
//         <motion.div variants={itemVariants} className="text-center mb-12">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             NextHire Finder
//           </h1>
//           <p className="text-xl text-gray-600 mb-4">
//             Explore 100000+ Jobs , 25000+ Job Seekers & More
//           </p>
//           <p className="text-sm text-gray-500 mb-8">
//             Reset your research strategy by browsing through our lists of top
//             colleges, exams, courses and careers based on your area of interest!
//           </p>

//           <div className="flex justify-center mb-8">
//             <div className="inline-flex bg-gray-100 rounded-lg p-1">
//               <button
//                 className="px-4 py-2 rounded-md text-sm font-medium bg-white text-gray-900 shadow-sm"
//               >
//                 Colleges
//               </button>
//               <button
//                 className="px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900"
//               >
//                 Exams
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           variants={containerVariants}
//           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
//         >
//           {mockCategories.map((category, index) => (
//             <motion.div
//               key={index}
//               variants={itemVariants}
//               whileHover={{ scale: 1.05 }}
//               className="group relative bg-white rounded-lg p-4 text-center border hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
//             >
//               <div className="flex flex-col items-center gap-3">
//                 <motion.div
//                   className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors duration-300"
//                   whileHover={{
//                     y: [-2, 2, -2, 0],
//                     transition: {
//                       duration: 0.2,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                     },
//                   }}
//                 >
//                   <category.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors duration-300" />
//                 </motion.div>
//                 <h3 className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
//                   {category.name}
//                 </h3>
//                 <p
//                   className={`text-sm ${
//                     category.count === 0 ? "text-gray-500" : "text-gray-600"
//                   }`}
//                 >
//                   {category.colleges }
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }


// import { motion } from "framer-motion";
// import {
//   Brain,
//   Building2,
//   Users,
//   Stethoscope,
//   FlaskRound,
//   Hotel,
//   MonitorSmartphone,
//   BookOpen,
//   Radio,
//   Syringe,
//   GraduationCap,
//   Gavel,
//   HeartPulse,
//   Smile,
//   Palette,
//   School,
// } from "lucide-react";

// // Job categories and icons
// const categoryIcons = {
//   "IT & Software": MonitorSmartphone,
//   "Engineering": Brain,
//   "Healthcare": Stethoscope,
//   "Education & Teaching": School,
//   "Finance & Banking": Building2,
//   "Sales & Marketing": Users,
//   "Design & Creative": Palette,
//   "Media & Communication": Radio,
//   "Legal Services": Gavel,
//   "Pharmaceutical": Syringe,
//   "Hospitality": Hotel,
//   "Science & Research": FlaskRound,
//   "Arts & Literature": BookOpen,
//   "Social Work": Smile,
//   "Agriculture": GraduationCap,
//   "Public Services": HeartPulse,
// };

// // Simulated job sector data
// const mockCategories = Object.entries(categoryIcons).map(([name, icon]) => ({
//   name,
//   icon,
//   count: Math.floor(Math.random() * 50),
//   jobs:
//     Math.random() > 0.3
//       ? `${Math.floor(Math.random() * 100) + 1} Openings`
//       : "No jobs",
// }));

// export default function JobFinder() {
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: { staggerChildren: 0.1 },
//     },
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <div className="min-h-screen bg-white p-6 mt-8 md:p-12">
//       <motion.div
//         initial="hidden"
//         animate="visible"
//         variants={containerVariants}
//         className="max-w-7xl mx-auto"
//       >
//         <motion.div variants={itemVariants} className="text-center mb-12">
//           <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//             NextHire Job Explorer
//           </h1>
//           <p className="text-xl text-gray-600 mb-4">
//             Explore 100,000+ Jobs & 25,000+ Active Candidates
//           </p>
//           <p className="text-sm text-gray-500 mb-8">
//             Find the right opportunity by browsing our job categories based on
//             your skills, interests, and goals!
//           </p>

//           <div className="flex justify-center mb-8">
//             <div className="inline-flex bg-gray-100 rounded-lg p-1">
//               <button className="px-4 py-2 rounded-md text-sm font-medium bg-white text-gray-900 shadow-sm">
//                 Jobs
//               </button>
//               <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900">
//                 Candidates
//               </button>
//             </div>
//           </div>
//         </motion.div>

//         <motion.div
//           variants={containerVariants}
//           className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
//         >
//           {mockCategories.map((category, index) => (
//             <motion.div
//               key={index}
//               variants={itemVariants}
//               whileHover={{ scale: 1.05 }}
//               className="group relative bg-white rounded-lg p-4 text-center border hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
//             >
//               <div className="flex flex-col items-center gap-3">
//                 <motion.div
//                   className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors duration-300"
//                   whileHover={{
//                     y: [-2, 2, -2, 0],
//                     transition: {
//                       duration: 0.2,
//                       repeat: Infinity,
//                       ease: "easeInOut",
//                     },
//                   }}
//                 >
//                   <category.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors duration-300" />
//                 </motion.div>
//                 <h3 className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
//                   {category.name}
//                 </h3>
//                 <p
//                   className={`text-sm ${
//                     category.count === 0 ? "text-gray-500" : "text-gray-600"
//                   }`}
//                 >
//                   {category.jobs}
//                 </p>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// }




import { motion } from "framer-motion";
import {
  Brain,
  Building2,
  Users,
  Stethoscope,
  FlaskRound,
  Hotel,
  MonitorSmartphone,
  BookOpen,
  Radio,
  Syringe,
  GraduationCap,
  Gavel,
  HeartPulse,
  Smile,
  Palette,
  School,
  Briefcase,
  Wrench,
  Headphones,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

// 18 job categories with icons
const categoryIcons = {
  "IT & Software": MonitorSmartphone,
  Engineering: Brain,
  Healthcare: Stethoscope,
  Education: School,
  "Finance & Banking": Building2,
  "Sales & Marketing": Users,
  "Design & Creative": Palette,
  "Media & Communication": Radio,
  Legal: Gavel,
  Pharmaceutical: Syringe,
  Hospitality: Hotel,
  Research: FlaskRound,
  "Arts & Literature": BookOpen,
  "Social Services": Smile,
  Agriculture: GraduationCap,
  "Public Services": HeartPulse,
  "Human Resources": Briefcase,
  "Construction & Real Estate": Wrench,

};

// Create mock data
const mockCategories = Object.entries(categoryIcons).map(([name, icon]) => ({
  name,
  icon,
  count: Math.floor(Math.random() * 50),
  jobs:
    Math.random() > 0.3
      ? `${Math.floor(Math.random() * 100) + 1} Openings`
      : "No jobs",
}));

export default function JobFinder() {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white p-6 mt-8 md:p-12">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="max-w-7xl mx-auto"
      >
        <motion.div variants={itemVariants} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            NextHire Job Explorer
          </h1>
          <p className="text-xl text-gray-600 mb-4">
            Explore 100,000+ Jobs & 25,000+ Active Candidates
          </p>
          <p className="text-sm text-gray-500 mb-8">
            Browse job categories based on your skills and interests to find
            your perfect opportunity!
          </p>

          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-gray-100 rounded-lg p-1">
              <button className="px-4 py-2 rounded-md text-sm font-medium bg-white text-gray-900 shadow-sm">
                Jobs
              </button>
              <button className="px-4 py-2 rounded-md text-sm font-medium text-gray-500 hover:text-gray-900">
                Candidates
              </button>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {mockCategories.map((category, index) => (
            <motion.div
             onClick={()=> navigate("/jobs")}
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              className="group relative bg-white rounded-lg p-4 text-center border hover:border-blue-500 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex flex-col items-center gap-3">
                <motion.div
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-50 group-hover:bg-blue-50 transition-colors duration-300"
                  whileHover={{
                    y: [-2, 2, -2, 0],
                    transition: {
                      duration: 0.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    },
                  }}
                >
                  <category.icon className="w-6 h-6 text-gray-600 group-hover:text-blue-500 transition-colors duration-300" />
                </motion.div>
                <h3 className="text-sm text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                  {category.name}
                </h3>
                <p
                  className={`text-sm ${
                    category.count === 0 ? "text-gray-500" : "text-gray-600"
                  }`}
                >
                  {category.jobs}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
