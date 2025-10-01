import React from "react";
import { Download } from "lucide-react";
import { motion } from "framer-motion";

const Header: React.FC = () => { 

  return (
    <header
      className={`bg-gray-900 border-gray-800 shadow-sm border-b`}
    >
      <div className="flex justify-between py-4 px-3">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex justify-center gap-2"
        >
          <div className="text-4xl">
            <svg
              className="text-[#FF4444] size-12"
              fill="none"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                clipRule="evenodd"
                d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                fill="currentColor"
                fillRule="evenodd"
              ></path>
            </svg>
          </div>
          <h2
            className={`text-white font-bold text-4xl`}
          >
            Jarvis
          </h2>
        </motion.div>

        {/* Right Section */}
        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center gap-4 items-center"
          >
            <button className="m-2 px-4 py-2 rounded-xl bg-cyan-500 text-gray-900 text-bold flex justify-center gap-3">
              <Download/>
              <a href="#">Install</a>
            </button>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default Header;
