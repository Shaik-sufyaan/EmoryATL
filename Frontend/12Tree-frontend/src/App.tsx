import { Outlet } from 'react-router-dom'
import Sidebar from '@components/Sidebar'
import Header from '@components/Header'
import SkyDecorations from '@components/decorations/SkyDecorations'
import { useSidebar } from '@context/SidebarContext'

export default function App() {
  const { sidebarOpen, setSidebarOpen } = useSidebar()

  return (
    <div className="h-screen flex relative overflow-hidden">
      <SkyDecorations />

      {/* Sidebar with slide animation */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <Sidebar />
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className={`fixed top-6 z-[50] bg-white rounded-full p-3 shadow-lg hover:shadow-xl
                   transition-all duration-300 tap focus-ring border-2 border-gray-200
                   hover:scale-110 ${sidebarOpen ? 'left-[272px]' : 'left-4'}`}
      >
        {sidebarOpen ? (
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
        ) : (
          <svg
            className="w-6 h-6 text-gray-700"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        )}
      </button>

      <main className="flex-1 p-8 pt-12 relative overflow-y-auto">
        <Header />
        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
