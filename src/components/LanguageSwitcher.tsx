import { useTranslation } from 'react-i18next';
import { Languages } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'es' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className="gap-2"
      title={i18n.language === 'en' ? 'Switch to Spanish' : 'Cambiar a Inglés'}
    >
      <Languages className="w-4 h-4" />
      <span className="text-sm font-medium">{i18n.language.toUpperCase()}</span>
    </Button>
  );
}
