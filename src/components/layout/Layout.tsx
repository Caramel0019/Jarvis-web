import Header from './Header'
import Footer from './Footer'
 
interface LayoutProps {  
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return ( 
    <div className="min-h-screen bg-gray-50"> 
      <Header />
      <div className="flex">
        <main className={` flex-1 p-6 bg-gray-900 `}>
          {children}
        </main>
      </div>
      <Footer />
    </div>
  )
}

export default Layout