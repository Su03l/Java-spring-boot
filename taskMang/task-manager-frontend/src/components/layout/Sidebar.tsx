import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PlusCircle, CheckSquare } from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
}

export default function Sidebar({ isOpen }: SidebarProps) {
  const navItems = [
    { to: '/dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
    { to: '/tasks/new', label: 'مهمة جديدة', icon: PlusCircle },
  ];

  return (
    <aside
      className={`fixed inset-y-0 right-0 z-40 w-64 border-l border-black/10 dark:border-white/10 bg-white/90 dark:bg-black/90 backdrop-blur-md transition-all duration-300 ease-in-out md:translate-x-0 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      }`}
    >
      <div className="flex h-16 items-center justify-between px-6 border-b border-black/10 dark:border-white/10">
        <div className="flex items-center gap-2.5">
          {/* Logo with Cyan Glow */}
          <div className="flex h-9 w-9 items-center justify-center rounded bg-black border border-electric-cyan shadow-cyan-glow">
            <CheckSquare className="h-5 w-5 text-electric-cyan" />
          </div>
          <span className="text-lg font-bold tracking-wider text-black dark:text-white">
            NEXUS<span className="text-electric-cyan">.</span>FLOW
          </span>
        </div>
      </div>

      <nav className="flex flex-col gap-1 p-4 h-[calc(100vh-4rem)] justify-between">
        <div className="flex flex-col gap-1">
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-widest text-black/40 dark:text-white/40">
            التنقل
          </div>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 border ${
                  isActive
                    ? 'border-electric-cyan bg-electric-cyan/5 text-black dark:text-white shadow-cyan-glow-sm'
                    : 'border-transparent text-black/60 dark:text-white/60 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white'
                }`
              }
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
}
