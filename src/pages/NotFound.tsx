import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen btext-white flex flex-col items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20}} 
        animate={{ opacity: 1, y: 0}} 
        transition={{
          duration: 0.5
        }}
        className="max-w-md text-center animate-fade-in duration-700 ease-in-out"
      >
        <h1 className="text-6xl font-extrabold text-cyan-500 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold mb-2 text-white">Page Not Found</h2>
        <p className="text-[#a0a0a0] text-base mb-6">
          Oops! The page you’re looking for doesn’t exist or has been moved.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-cyan-500 hover:bg-cyan-700 text-white font-semibold py-3 px-6 rounded-xl shadow-md transition-all duration-300 transform hover:scale-105"
        >
          Go Home
        </button>
      </motion.div>
    </div>
  );
};

export default NotFound;
