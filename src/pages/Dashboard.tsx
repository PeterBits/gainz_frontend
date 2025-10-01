import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Dumbbell, TrendingUp, Calendar, User, LogOut, Activity, Target, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export function Dashboard() {
  const { user, clearAuth } = useAuthStore();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleLogout = () => {
    clearAuth();
    navigate('/', { replace: true });
  };

  const stats = [
    {
      icon: <Calendar className="w-6 h-6" />,
      label: t('dashboard.stats.workoutsThisWeek'),
      value: '0',
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      label: t('dashboard.stats.activeRoutines'),
      value: '0',
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
    },
    {
      icon: <Activity className="w-6 h-6" />,
      label: t('dashboard.stats.totalExercises'),
      value: '0',
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
    },
  ];

  const quickActions = [
    { icon: <Dumbbell className="w-5 h-5" />, label: t('dashboard.quickActions.startWorkout'), color: 'from-blue-500 to-blue-600' },
    { icon: <Calendar className="w-5 h-5" />, label: t('dashboard.quickActions.viewRoutines'), color: 'from-green-500 to-green-600' },
    { icon: <TrendingUp className="w-5 h-5" />, label: t('dashboard.quickActions.trackProgress'), color: 'from-purple-500 to-purple-600' },
    { icon: <Target className="w-5 h-5" />, label: t('dashboard.quickActions.setGoals'), color: 'from-orange-500 to-orange-600' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900">Gainz</h1>
                <p className="text-sm text-slate-600">{t('dashboard.welcomeBack', { name: user?.name })}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <LanguageSwitcher />
              <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-slate-700">{user?.role}</span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="hover:bg-red-50 hover:text-red-600 hover:border-red-200"
              >
                <LogOut className="w-4 h-4 mr-2" />
                {t('common.logout')}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-all border border-slate-100"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center ${stat.textColor}`}>
                    {stat.icon}
                  </div>
                  <Award className="w-5 h-5 text-slate-300" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">{t('dashboard.quickActions.title')}</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {quickActions.map((action, index) => (
                <button
                  key={index}
                  className="group relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 hover:from-white hover:to-slate-50 border border-slate-200 rounded-xl p-6 transition-all hover:shadow-md hover:scale-105 active:scale-95"
                >
                  <div className={`w-10 h-10 bg-gradient-to-r ${action.color} rounded-lg flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}>
                    {action.icon}
                  </div>
                  <p className="font-medium text-slate-900">{action.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Welcome Card */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex items-start gap-4">
              <div className="hidden sm:block w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-2">{t('dashboard.cta.title')}</h3>
                <p className="text-blue-100 mb-4">
                  {user?.role === 'TRAINER'
                    ? t('dashboard.cta.subtitleTrainer')
                    : t('dashboard.cta.subtitleAthlete')}
                </p>
                <Button
                  variant="secondary"
                  className="bg-white text-blue-600 hover:bg-blue-50"
                >
                  {user?.role === 'TRAINER' ? t('dashboard.cta.buttonTrainer') : t('dashboard.cta.buttonAthlete')}
                </Button>
              </div>
            </div>
          </div>

          {/* Recent Activity (Placeholder) */}
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-md border border-slate-100">
            <h2 className="text-xl font-bold text-slate-900 mb-6">{t('dashboard.recentActivity.title')}</h2>
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Activity className="w-8 h-8 text-slate-400" />
              </div>
              <p className="text-slate-500 mb-2">{t('dashboard.recentActivity.noActivity')}</p>
              <p className="text-sm text-slate-400">{t('dashboard.recentActivity.noActivityHint')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
