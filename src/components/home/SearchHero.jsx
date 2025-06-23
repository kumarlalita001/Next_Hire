import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FiSearch } from "react-icons/fi"; // lightweight icon lib
import { Link } from "react-router-dom";

const phrases = ["Find your job", "Job hunt", "Hunt your job", "Explore careers"];
const dummyJobs = [
  "React Developer",
  "UI/UX Designer",
  "Frontend Engineer",
  "Backend Developer",
  "Full Stack Developer",
  "Digital Marketer",
  "SEO Specialist",
  "Content Writer",
  "Sales Executive",
  "DevOps Engineer",
  "HR Manager",
];

export default function SearchHero({ targetRef }) {
  const [typedText, setTypedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const typingRef = useRef(null);
  const debounceRef = useRef(null);

  // Typing animation
  useEffect(() => {
    const current = phrases[phraseIndex];
    if (charIndex < current.length) {
      typingRef.current = setTimeout(() => {
        setTypedText((prev) => prev + current[charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 100);
    } else {
      setTimeout(() => {
        setTypedText("");
        setCharIndex(0);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }, 2000);
    }
    return () => clearTimeout(typingRef.current);
  }, [charIndex, phraseIndex]);

  // Search with debounce
  const handleChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      if (val.trim()) {
        setSuggestions(
          dummyJobs.filter((job) =>
            job.toLowerCase().includes(val.toLowerCase())
          )
        );
      } else {
        setSuggestions([]);
      }
    }, 300);
  };

  //  bg-gradient-to-r from-primary-500 to-primary-700

  return (
    <section
      ref={targetRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-[-1]">
        {/* <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://res.cloudinary.com/dsfj4rxmf/video/upload/v1750495741/heroVideo2_xetpsx.mp4"
            type="video/mp4"
          />
        </video> */}

         <video 
            className="video-bg absolute inset-0 object-cover w-full h-full "
            autoPlay 
            loop 
            muted 
            playsInline
          >
            <source src={"https://res.cloudinary.com/dnmf6sewr/video/upload/v1750495715/hero-video_kki864.mp4"} type="video/mp4" />
          </video>
          <div className="video-overlay "></div>
      </div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 relative z-10 text-center"
      >
        <h1 className="text-white mb-4 text-4xl md:text-6xl font-bold font-serif">
          {typedText}
          <span className="animate-pulse border-r-2 ml-1 border-white" />
        </h1>

        <p className="text-gray-200 text-lg md:text-xl max-w-3xl mx-auto mb-8">
          Connect with 5000+ companies and unlock job opportunities tailored to
          your skills and aspirations.
        </p>

        {/* Search Input */}
        <div className="bg-white rounded-lg shadow-lg p-2 md:p-4 max-w-3xl mx-auto relative">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={handleChange}
                placeholder="Job title, keywords, or company"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              {/* Suggestions */}
              {suggestions.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border mt-1 rounded-lg shadow max-h-60 overflow-y-auto text-left">
                  {suggestions.map((item, i) => (
                    <li
                      key={i}
                      className="px-4 py-2 hover:bg-blue-100 cursor-pointer"
                      onClick={() => {
                        setQuery(item);
                        setSuggestions([]);
                      }}
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <Link
              to="/jobs"
              className="btn-primary px-4 py-3 rounded-lg text-white bg-blue-600 hover:bg-blue-700 text-center"
            >
              Search Jobs
            </Link>
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex flex-wrap justify-center gap-4 mt-8"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-white">
            <span className="font-bold">10,000+</span> Jobs Available
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-white">
            <span className="font-bold">5,000+</span> Companies
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg px-6 py-3 text-white">
            <span className="font-bold">25,000+</span> Happy Users
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-8 h-12 rounded-full border-2 border-white flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 bg-white rounded-full"
          />
        </motion.div>
      </div> */}
    </section>
  );
}
