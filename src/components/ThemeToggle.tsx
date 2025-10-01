import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/stores/themeStore';

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeStore();

  const handleClick = () => {
    toggleTheme();
  };

  return (
    <button
      onClick={handleClick}
      className="p-2 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-600 transition-colors"
      aria-label="Toggle theme"
      title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 text-slate-700 dark:text-slate-200" />
      ) : (
        <Sun className="w-5 h-5 text-yellow-400" />
      )}
    </button>
  );
}
