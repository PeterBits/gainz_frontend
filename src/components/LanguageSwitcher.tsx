import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { USFlag } from './flags/USFlag';
import { ESFlag } from './flags/ESFlag';

const languages = [
  {
    code: 'en',
    name: { en: 'English', es: 'Inglés' },
    Flag: USFlag,
  },
  {
    code: 'es',
    name: { en: 'Spanish', es: 'Español' },
    Flag: ESFlag,
  },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find((lang) => lang.code === i18n.language) || languages[1];
  const CurrentFlag = currentLanguage.Flag;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white border border-slate-200 hover:border-slate-300 transition-colors"
      >
        <CurrentFlag className="w-5 h-4 rounded-sm flex-shrink-0" />
        <span className="text-sm font-medium text-slate-700">
          {currentLanguage.code.toUpperCase()}
        </span>
        <ChevronDown
          className={`w-4 h-4 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
          {languages.map((lang) => {
            const LangFlag = lang.Flag;
            const currentLang = i18n.language as 'en' | 'es';
            return (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={`w-full flex items-center gap-3 px-3 py-2 hover:bg-slate-50 transition-colors ${
                  lang.code === currentLanguage.code ? 'bg-blue-50' : ''
                }`}
              >
                <LangFlag className="w-6 h-4 rounded-sm flex-shrink-0" />
                <span className="text-sm font-medium text-slate-700">
                  {lang.name[currentLang]}
                </span>
                {lang.code === currentLanguage.code && (
                  <span className="ml-auto text-blue-600">✓</span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
