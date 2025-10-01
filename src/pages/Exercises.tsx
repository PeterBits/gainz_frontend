import { Dumbbell, LogOut, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Button } from '@/components/ui/button';
import { useExercises } from '@/hooks';
import { useAuthStore } from '@/stores/authStore';

export function Exercises() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { user, clearAuth } = useAuthStore();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: exercises, isLoading, isError } = useExercises();

  const handleLogout = () => {
    clearAuth();
    navigate('/', { replace: true });
  };

  const filteredExercises = useMemo(() => {
    if (!exercises) return [];
    if (!searchTerm.trim()) return exercises;

    const term = searchTerm.toLowerCase();
    return exercises.filter(
      (exercise) =>
        exercise.name.toLowerCase().includes(term) ||
        exercise.description?.toLowerCase().includes(term)
    );
  }, [exercises, searchTerm]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Dumbbell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Gainz</h1>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {t('common.welcome')}, {user?.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageSwitcher />
              <Button
                variant="ghost"
                onClick={handleLogout}
                className="text-slate-600 dark:text-slate-300"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="mb-4 text-slate-600 dark:text-slate-300"
            >
              ← {t('common.back')}
            </Button>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              {t('exercises.title')}
            </h2>
            <p className="text-slate-600 dark:text-slate-300">{t('exercises.subtitle')}</p>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
              <input
                type="text"
                placeholder={t('exercises.searchPlaceholder')}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}

          {/* Error State */}
          {isError && (
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-400 px-6 py-4 rounded-xl">
              <p className="font-semibold">{t('exercises.errorLoading')}</p>
              <p className="text-sm mt-1">{t('exercises.errorLoadingDescription')}</p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !isError && filteredExercises.length === 0 && (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full mb-4">
                <Dumbbell className="w-8 h-8 text-slate-400 dark:text-slate-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                {searchTerm ? t('exercises.noResults') : t('exercises.noExercises')}
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                {searchTerm
                  ? t('exercises.noResultsDescription')
                  : t('exercises.noExercisesDescription')}
              </p>
            </div>
          )}

          {/* Exercises Grid */}
          {!isLoading && !isError && filteredExercises.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredExercises.map((exercise) => (
                <div
                  key={exercise.id}
                  className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-slate-100 dark:border-slate-700 hover:border-blue-200 dark:hover:border-blue-500"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-lg flex items-center justify-center">
                      <Dumbbell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 mb-1">
                        {exercise.name}
                      </h3>
                      {exercise.description && (
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                          {exercise.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Results Count */}
          {!isLoading && !isError && filteredExercises.length > 0 && (
            <div className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
              {t('exercises.showing', { count: filteredExercises.length })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
