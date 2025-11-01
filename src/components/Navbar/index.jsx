import { NavLink } from 'react-router-dom'

// Icons
import { Calculator, Home, SquarePlus } from 'lucide-react'

const navbarList = [
  {
    to: '/',
    label: 'Home',
    icon: <Home size={16} />,
  },
  {
    to: '/task-list',
    label: 'Task List',
    icon: <Calculator size={16} />,
  },
  {
    to: '/new-task',
    label: 'New Task',
    icon: <SquarePlus size={16} />,
  },
]

function Navbar() {
  return (
    <nav className="flex items-center gap-5">
      {navbarList.map(({ to, label, icon }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-2 font-semibold hover:text-primary/80 transition-colors duration-200 ${isActive ? 'text-[var(--color-primary)]' : ''}`
          }
        >
          <div className="flex items-center gap-1">
            {icon}
            <span>{label}</span>
          </div>
        </NavLink>
      ))}
    </nav>
  )
}

export default Navbar
