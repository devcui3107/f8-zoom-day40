import Logo from '@/components/Logo'
import Navbar from '@/components/Navbar'
import { Brain } from 'lucide-react'

function Header() {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Logo />
          <Navbar />

          {/* CTA Button */}
          <div className="hidden md:block">
            <a
              href="/redux.html"
              target="_blank"
              className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-md hover:shadow-lg"
            >
              <Brain size={16} />
              Redux Cosplay
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
