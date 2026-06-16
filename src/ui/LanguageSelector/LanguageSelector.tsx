"use client";
import { useState, useRef, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { WorldIcon, ChevronDownIcon } from '@/ui/Icons';
import './LanguageSelector.css';

const languages = [
  { code: 'es', name: 'Español', nativeName: 'Español' },
  { code: 'en', name: 'English', nativeName: 'English' },
];

interface LanguageSelectorProps {
  variant?: 'dropdown' | 'inline';
}

const LanguageSelector = ({ variant = 'dropdown' }: LanguageSelectorProps) => {
  const t = useTranslations('common');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

  useEffect(() => {
    const checkDesktop = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const changeLanguage = (lng: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    router.replace(pathname, { locale: lng as any });
    setIsOpen(false);
  };

  if (variant === 'inline') {
    return (
      <div className="mobile-lang-list">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className={`mobile-lang-btn ${locale === lang.code ? 'is-active' : ''}`}
            aria-label={t(`switch_to_${lang.code}`)}
          >
            {lang.code.toUpperCase()}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-left ${isDesktop ? 'group' : ''}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !isDesktop && setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-white bg-white/10 hover:bg-white/20 border border-white/10 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-500/50"
        aria-haspopup="true"
        aria-expanded={isOpen}
        aria-label={t('select_language')}
      >
        <WorldIcon className="w-4 h-4 text-white shrink-0" />
        <span className="uppercase">{currentLanguage.code}</span>
        <ChevronDownIcon className="w-3 h-3 transition-transform duration-300 ease-in-out text-white opacity-85 shrink-0 group-hover:rotate-180" />
      </button>

      <div
        className={`absolute right-0 w-40 origin-top-right z-[1100] ${isDesktop ? 'lang-dropdown-desktop' : 'flex flex-col mt-2 overflow-hidden bg-black/90 rounded-lg shadow-xl'} ${!isDesktop && !isOpen ? 'hidden' : ''} lang-dropdown`}
        role="menu"
        aria-orientation="vertical"
      >
          <div className="py-1">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`flex items-center justify-between w-full px-4 py-2 text-sm text-left transition-colors duration-300 ${
                  locale === lang.code
                    ? 'bg-orange-500/10 text-orange-400 font-semibold'
                    : 'text-white hover:bg-white/15'
                }`}
                role="menuitem"
              >
                <span>{lang.nativeName}</span>
                {locale === lang.code && (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>
    </div>
  );
};

export default LanguageSelector;
