import { Menu, Search, Bell, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface HeaderProps {
  onToggleSidebar: () => void;
}

export default function Header({ onToggleSidebar }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-black/10 dark:border-white/10 bg-white/80 dark:bg-black/80 px-4 md:px-8 backdrop-blur-md transition-all duration-300 ease-in-out">
      <div className="flex items-center gap-4">
        <button
          onClick={onToggleSidebar}
          className="rounded p-1 text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white md:hidden"
          aria-label="Toggle Sidebar"
        >
          <Menu className="h-6 w-6" />
        </button>

        {/* Search input - RTL alignment */}
        <div className="relative hidden sm:block">
          <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-black/40 dark:text-white/40">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="البحث عن المهام..."
            className="w-64 rounded-md border border-black/15 dark:border-white/15 bg-black/5 dark:bg-white/5 py-1.5 pr-9 pl-4 text-sm text-black dark:text-white placeholder-black/40 dark:placeholder-white/40 transition-all focus:border-electric-cyan focus:outline-none focus:ring-1 focus:ring-electric-cyan"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="rounded-md p-1.5 text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors"
          title={theme === 'dark' ? 'تفعيل الوضع المضيء' : 'تفعيل الوضع الداكن'}
        >
          {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        {/* Bell notifications */}
        <button className="relative rounded-md p-1.5 text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/5 hover:text-black dark:hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute left-1.5 top-1.5 h-2 w-2 rounded-full bg-electric-cyan shadow-[0_0_8px_#00FFFF]"></span>
        </button>

        {/* System Active Badge */}
        <div className="flex items-center gap-3 border-r border-black/10 dark:border-white/10 pr-4">
          <div className="flex items-center gap-2 rounded border border-electric-cyan/20 bg-electric-cyan/5 px-3 py-1.5 text-xs text-electric-cyan font-bold shadow-cyan-glow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-electric-cyan animate-pulse"></span>
            النظام نشط
          </div>
        </div>
      </div>
    </header>
  );
}
