import { NavLink } from 'react-router-dom'

const mainNav = [
  { to: '/learn', label: 'learn', icon: '📖', color: 'bg-pink', activeColor: 'bg-pink', textColor: 'text-gray-700', activeTextColor: 'text-white' },
  { to: '/library', label: 'library', icon: '📚', color: 'bg-lime', activeColor: 'bg-lime', textColor: 'text-gray-700', activeTextColor: 'text-white' },
]

const userNav = { to: '/profile', label: 'profile', icon: '👤', color: 'bg-purple', activeColor: 'bg-purple', textColor: 'text-gray-700', activeTextColor: 'text-white' }

const tips = [
  { icon: '🎵', text: 'Try different topics to create unique songs!' },
  { icon: '📝', text: 'Practice with flashcards to remember better' },
  { icon: '🌟', text: 'Save your favorites to the library' },
]

export default function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 shrink-0 flex-col gap-4 p-6 pt-32 bg-gradient-to-b from-white to-gray-50 border-r border-gray-100 relative z-20">
      {/* App Logo/Branding */}
      <div className="px-2 mb-2">
        <div className="flex items-center gap-3 mb-2">
          <div className="text-4xl">🌳</div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">12Tree</h1>
            <p className="text-xs text-gray-500">Learn Through Music</p>
          </div>
        </div>
      </div>

      {/* Main navigation */}
      <nav className="flex flex-col gap-2 bg-white rounded-3xl p-4 shadow-soft">
        {mainNav.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            className={({ isActive }: { isActive: boolean }) =>
              `tap focus-ring px-3 py-2.5 flex items-center gap-3 rounded-xl transition-all hover:scale-105 ${
                isActive
                  ? `${n.activeColor} shadow-sm`
                  : 'hover:bg-gray-50 border-2 border-gray-200'
              }`
            }
            aria-label={n.label}
          >
            {({ isActive }) => (
              <>
                <span className={`text-2xl`}>{n.icon}</span>
                <span className={`capitalize font-bold ${isActive ? n.activeTextColor : n.textColor}`}>
                  {n.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Quick Tips Section */}
      <div className="bg-gradient-to-br from-lime/20 to-lime/10 rounded-3xl p-4 shadow-soft border border-lime/30">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">💡</span>
          <h3 className="font-bold text-gray-700 text-sm">Quick Tips</h3>
        </div>
        <div className="space-y-2">
          {tips.map((tip, i) => (
            <div key={i} className="flex items-start gap-2 text-xs text-gray-600">
              <span className="text-sm mt-0.5">{tip.icon}</span>
              <p className="leading-relaxed">{tip.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Learn & Create Card */}
      <div className="bg-gradient-to-br from-purple/20 to-pink/20 rounded-3xl p-4 shadow-soft border border-purple/30">
        <div className="text-center">
          <div className="text-3xl mb-2">🎨</div>
          <h3 className="font-bold text-gray-800 text-sm mb-1">Learn & Create</h3>
          <p className="text-xs text-gray-600">Make learning fun with music and cards!</p>
        </div>
      </div>

      {/* User profile at bottom */}
      <nav className="mt-auto flex flex-col gap-2 bg-white rounded-3xl p-4 shadow-soft">
        <NavLink
          to={userNav.to}
          className={({ isActive }: { isActive: boolean }) =>
            `tap focus-ring px-3 py-2.5 flex items-center gap-3 rounded-xl transition-all hover:scale-105 ${
              isActive
                ? `${userNav.activeColor} shadow-sm`
                : 'hover:bg-gray-50 border-2 border-gray-200'
            }`
          }
          aria-label={userNav.label}
        >
          {({ isActive }) => (
            <>
              <span className={`text-2xl`}>{userNav.icon}</span>
              <span className={`capitalize font-bold ${isActive ? userNav.activeTextColor : userNav.textColor}`}>
                {userNav.label}
              </span>
            </>
          )}
        </NavLink>
      </nav>
    </aside>
  )
}
