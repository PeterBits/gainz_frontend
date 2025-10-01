import { Dumbbell, LayoutDashboard } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';

import { useIsMobile } from '@/hooks';
import { useAuthStore } from '@/stores/authStore';

export function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useTranslation();
  const { isAuthenticated } = useAuthStore();
  const isMobile = useIsMobile();

  // Don't show on public pages
  const publicPages = ['/', '/login', '/register'];
  if (publicPages.includes(location.pathname)) {
    return null;
  }

  // Don't show if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  // Don't show on desktop
  if (!isMobile) {
    return null;
  }

  const navItems = [
    {
      icon: LayoutDashboard,
      label: t('navigation.dashboard'),
      path: '/dashboard',
    },
    {
      icon: Dumbbell,
      label: t('navigation.exercises'),
      path: '/exercises',
    },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 z-50 safe-area-inset-bottom">
      <div className="flex items-center justify-around px-4 py-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);

          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center gap-1 px-6 py-2 rounded-xl transition-all ${
                active
                  ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Icon className={`w-6 h-6 ${active ? 'stroke-[2.5]' : 'stroke-2'}`} />
              <span className={`text-xs font-medium ${active ? 'font-semibold' : ''}`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
