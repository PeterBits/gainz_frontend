import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Dumbbell, TrendingUp, Users, Calendar, Zap } from 'lucide-react';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';

export function Home() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const features = [
    {
      icon: <Dumbbell className="w-6 h-6" />,
      title: t('home.features.trackWorkouts.title'),
      description: t('home.features.trackWorkouts.description'),
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: t('home.features.monitorProgress.title'),
      description: t('home.features.monitorProgress.description'),
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: t('home.features.trainerMode.title'),
      description: t('home.features.trainerMode.description'),
    },
    {
      icon: <Calendar className="w-6 h-6" />,
      title: t('home.features.customRoutines.title'),
      description: t('home.features.customRoutines.description'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Language Switcher */}
      <div className="container mx-auto px-4 pt-4">
        <div className="flex justify-end">
          <LanguageSwitcher />
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl shadow-lg">
              <Dumbbell className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {t('home.title')}
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-2xl mx-auto">
              {t('home.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={() => navigate('/register')}
                size="lg"
                className="text-lg px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all"
              >
                <Zap className="w-5 h-5 mr-2" />
                {t('home.getStarted')}
              </Button>
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 border-2 hover:bg-slate-50"
              >
                {t('home.signIn')}
              </Button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-slate-100 hover:border-blue-200"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-blue-600">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2 text-slate-900">
                      {feature.title}
                    </h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 md:p-12 text-center text-white shadow-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('home.cta.title')}</h2>
            <p className="text-lg mb-6 text-blue-100">{t('home.cta.subtitle')}</p>
            <Button
              onClick={() => navigate('/register')}
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 text-lg px-8 py-6"
            >
              {t('home.cta.button')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
