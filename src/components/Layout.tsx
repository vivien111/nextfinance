import { Menu, X, Globe } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Layout({ children, currentPage, onNavigate }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const { t, i18n } = useTranslation('common');

  const languages = [
  { code: 'fr', name: t('language.french'), flag: '🇫🇷' },
  { code: 'en', name: t('language.english'), flag: '🇬🇧' },
  { code: 'es', name: t('language.spanish'), flag: '🇪🇸' },
  { code: 'de', name: t('language.german'), flag: '🇩🇪' },
  { code: 'it', name: t('language.italian'), flag: '🇮🇹' },
  { code: 'pt', name: t('language.portuguese'), flag: '🇵🇹' },
  { code: 'gr', name: t('language.greek'), flag: '🇬🇷' },
  { code: 'fi', name: t('language.finnish'), flag: '🇫🇮' },
  { code: 'nl', name: t('language.dutch'), flag: '🇳🇱' },
  { code: 'az', name: t('language.azerbaijani'), flag: '🇦🇿' },
  { code: 'pl', name: t('language.polish'), flag: '🇵🇱' },
  { code: 'mt', name: t('language.maltese'), flag: '🇲🇹' },
  { code: 'cs', name: t('language.czech'), flag: '🇨🇿' },
];


  const navigation = [
    { name: t('navigation.home'), href: 'home' },
    { name: t('navigation.simulation'), href: 'simulation' },
    { name: t('navigation.application'), href: 'application' },
    { name: t('navigation.about'), href: 'about' },
    { name: t('navigation.contact'), href: 'contact' },
  ];

  const currentLang = languages.find(lang => lang.code === i18n.language) || languages[0];

  const handleLanguageChange = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    setLanguageMenuOpen(false);
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => onNavigate('home')}
                className="flex items-center space-x-2"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <span className="text-xl font-bold text-gray-900">Popular Financia</span>
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <button
                  key={item.href}
                  onClick={() => onNavigate(item.href)}
                  className={`text-sm font-medium transition-colors ${
                    currentPage === item.href
                      ? 'text-blue-600'
                      : 'text-gray-700 hover:text-blue-600'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              {/* Sélecteur de langue pour desktop */}
              <div className="relative">
                <button
                  onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                  className="flex items-center space-x-2 px-3 py-2 rounded-lg border border-gray-200 hover:border-gray-300 transition-colors bg-white/80 backdrop-blur-sm"
                >
                  <Globe className="h-4 w-4 text-gray-600" />
                  <span className="text-sm font-medium text-gray-700">{currentLang.flag}</span>
                  <span className="text-sm text-gray-600">{currentLang.code.toUpperCase()}</span>
                </button>

                {languageMenuOpen && (
                  <div className="absolute top-full right-0 mt-2 w-48 bg-white/90 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    {languages.map((language) => (
                      <button
                        key={language.code}
                        onClick={() => handleLanguageChange(language.code)}
                        className={`w-full text-left px-4 py-2 flex items-center space-x-3 hover:bg-blue-50 transition-colors ${
                          i18n.language === language.code ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                        }`}
                      >
                        <span className="text-lg">{language.flag}</span>
                        <span className="flex-1">{language.name}</span>
                        {i18n.language === language.code && (
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-4 md:hidden">
              {/* Sélecteur de langue simplifié pour mobile */}
              <button
                onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
                className="p-2 rounded-lg border border-gray-200"
              >
                <span className="text-lg">{currentLang.flag}</span>
              </button>

              <button
                className="p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-700" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-700" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <button
                  key={item.href}
                  onClick={() => {
                    onNavigate(item.href);
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left px-3 py-2 rounded-md text-base font-medium ${
                    currentPage === item.href
                      ? 'bg-blue-50 text-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
              
              {/* Menu langue pour mobile */}
              <div className="border-t border-gray-200 mt-4 pt-4">
                <div className="px-3 py-2 text-sm font-medium text-gray-500">
                  {t('language.select')}
                </div>
                <div className="grid grid-cols-3 gap-2 px-3">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`flex items-center justify-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                        i18n.language === language.code
                          ? 'bg-blue-50 text-blue-600 border-blue-200'
                          : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span className="text-xs">{language.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Overlay pour fermer le menu langue */}
        {languageMenuOpen && (
          <div 
            className="fixed inset-0 z-40"
            onClick={() => setLanguageMenuOpen(false)}
          />
        )}
      </nav>

      <main className="pt-16">
        {children}
      </main>

      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <span className="text-xl font-bold">Popular Financia</span>
              </div>
              <p className="text-gray-400 max-w-md">
                {t('footer.description')}
              </p>
              
              {/* Sélecteur de langue dans le footer */}
              <div className="mt-6">
                <label className="text-sm text-gray-400 mb-2 block">{t('language.select')}</label>
                <div className="flex flex-wrap gap-2">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => handleLanguageChange(language.code)}
                      className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                        i18n.language === language.code
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-gray-800 text-gray-300 border-gray-700 hover:bg-gray-700'
                      }`}
                    >
                      <span className="text-lg">{language.flag}</span>
                      <span className="text-sm">{language.code.toUpperCase()}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t('footer.navigation')}</h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <button
                      onClick={() => onNavigate(item.href)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
              <ul className="space-y-2 text-gray-400">
                <li>{t('footer.email')}: contact@popularfinancia.com</li>
                <li>{t('footer.phone')}: +30 699 802 9086</li>
                <li>{t('footer.schedule')}</li>
                <li>{t('footer.hours')}</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Popular Financia. {t('footer.rights')}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}