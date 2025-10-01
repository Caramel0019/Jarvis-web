import { motion } from "framer-motion" 
import { Download } from "lucide-react"

const Welcome = () => {
  return (
    <main className="flex min-h-screen mx-auto px-4">
      <div className="py-24">
        <div className="flex min-h-[50vh] flex-col gap-8 items-center justify-center text-center">
          <div className="flex flex-col gap-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20}} 
              animate={{ opacity: 1, y: 0}} 
              transition={{
                duration: 0.5
              }}
              className="text-white text-5xl font-black leading-tight tracking-tighter md:text-7xl"
            >
              Voice AI Akash Cloud Manager
            </motion.h1>
            <motion.h2 
              initial={{ opacity: 0, y: 20}} 
              animate={{ opacity: 1, y: 0}} 
              transition={{
                duration: 0.5
              }}
              className="text-[#a0a0a0] text-lg font-normal leading-normal max-w-3xl mx-auto md:text-xl"
            >
              Jarvis, the Voice AI Akash Cloud Manager, is an innovative decentralized application that enables users to deploy, monitor, and manage cloud resources on the Akash Network using voice commands.
            </motion.h2>
 
            <div className="flex justify-center">
              <motion.button 
                initial={{ opacity: 0, x: -20}} 
                animate={{ opacity: 1, x: 0}} 
                transition={{
                  duration: 0.6
                }}
                className="m-4 px-4 py-2 rounded-xl w-80 bg-cyan-500 text-gray-900 text-bold flex justify-center gap-3"
              >
                <Download/>
                <a href="#">Install</a>
              </motion.button>
            </div>
          </div>

          <motion.section 
            initial={{ opacity: 0, y: 20}} 
            animate={{ opacity: 1, y: 0}} 
            transition={{
              duration: 0.6
            }}
            className="py-20"
          >
            <h2 className="text-white text-4xl font-bold leading-tight tracking-tight text-center mb-8">About Us</h2>
            <p className="text-[#a0a0a0] text-lg font-normal leading-relaxed text-center max-w-4xl mx-auto">
              Akash Network is a decentralized cloud computing marketplace that connects providers with users seeking affordable and scalable compute resources. Our mission is to democratize access to cloud computing, making it more accessible and cost-effective for everyone.
            </p>
          </motion.section> 

          <section className="py-20">
            <h2 className="text-white text-4xl font-bold leading-tight tracking-tight text-center mb-12">Services</h2>
            <motion.div 
              initial={{ opacity: 0, y: 20}} 
              animate={{ opacity: 1, y: 0}} 
              transition={{
                duration: 0.7
              }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <div className="flex flex-col gap-4 rounded-2xl bg-gray-900 p-6 border border-[#2c2c2c]">
                <h3 className="text-white text-2xl font-semibold leading-tight">Cloud Hosting</h3>
                <p className="text-[#a0a0a0] text-lg font-normal leading-relaxed">
                  Secure and scalable cloud hosting solutions for all types of businesses, from small startups to large enterprises.
                </p>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl bg-gray-900 p-6 border border-[#2c2c2c]">
                <h3 className="text-white text-2xl font-semibold leading-tight">Cloud Computing</h3>
                <p className="text-[#a0a0a0] text-lg font-normal leading-relaxed">
                  Harness the power of decentralized cloud computing to optimize your infrastructure and reduce costs.
                </p>
              </div>

              <div className="flex flex-col gap-4 rounded-2xl bg-gray-900 p-6 border border-[#2c2c2c]">
                <h3 className="text-white text-2xl font-semibold leading-tight">AI Management</h3>
                <p className="text-[#a0a0a0] text-lg font-normal leading-relaxed">
                  Use advanced AI to manage your cloud resources with ease, all through voice commands for maximum efficiency.
                </p>
              </div>
            </motion.div>
          </section>
        </div>
      </div>
    </main>
  )
}

export default Welcome