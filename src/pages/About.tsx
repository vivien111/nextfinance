import { Users, Target, Award, Heart } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function About() {
  const { t } = useTranslation('about');

  const values = [
    {
      icon: Heart,
      title: t('values.listen.title'),
      description: t('values.listen.desc'),
    },
    {
      icon: Award,
      title: t('values.expertise.title'),
      description: t('values.expertise.desc'),
    },
    {
      icon: Users,
      title: t('values.personalSupport.title'),
      description: t('values.personalSupport.desc'),
    },
    {
      icon: Target,
      title: t('values.transparency.title'),
      description: t('values.transparency.desc'),
    },
  ];

  const stats = [
    { number: '50 000+', label: t('stats.clients') },
    { number: '15 ans', label: t('stats.experience') },
    { number: '24h', label: t('stats.responseTime') },
    { number: '98%', label: t('stats.satisfaction') },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t('header.title')}
          </h1>
          <p className="text-xl text-blue-100">
            {t('header.subtitle')}
          </p>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* MISSION */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('mission.title')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('mission.text')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
          {values.map((value) => (
            <div key={value.title} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-6">
                <value.icon className="h-7 w-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TEAM */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center px-4">

          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              {t('team.title')}
            </h2>

            <p className="text-lg text-gray-600 mb-6">{t('team.text1')}</p>
            <p className="text-lg text-gray-600 mb-6">{t('team.text2')}</p>

            <div className="space-y-4">
              <p className="text-gray-700">
                <strong>{t('team.points.advice')}</strong>
              </p>
              <p className="text-gray-700">
                <strong>{t('team.points.fastStudy')}</strong>
              </p>
              <p className="text-gray-700">
                <strong>{t('team.points.followUp')}</strong>
              </p>
            </div>
          </div>

          {/* WHY CHOOSE US */}
          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 text-white">
            <h3 className="text-2xl font-bold mb-6">{t('why.title')}</h3>

            <ul className="space-y-4">
              <li>
                <p className="font-semibold">{t('why.competitiveRates')}</p>
                <p className="text-blue-100 text-sm">{t('why.competitiveRates_desc')}</p>
              </li>

              <li>
                <p className="font-semibold">{t('why.simplifiedProcess')}</p>
                <p className="text-blue-100 text-sm">{t('why.simplifiedProcess_desc')}</p>
              </li>

              <li>
                <p className="font-semibold">{t('why.flexibility')}</p>
                <p className="text-blue-100 text-sm">{t('why.flexibility_desc')}</p>
              </li>

              <li>
                <p className="font-semibold">{t('why.security')}</p>
                <p className="text-blue-100 text-sm">{t('why.security_desc')}</p>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t('reviews.title')}
          </h2>
          <p className="text-xl text-gray-300">
            {t('reviews.subtitle')}
          </p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">

          {/* REVIEW 1 */}
          <div className="bg-gray-800 rounded-xl p-8">
            <p className="text-gray-300 mb-4">"{t('reviews.review1.text')}"</p>
            <p className="font-semibold">{t('reviews.review1.author')}</p>
            <p className="text-sm text-gray-400">{t('reviews.review1.location')}</p>
          </div>

          {/* REVIEW 2 */}
          <div className="bg-gray-800 rounded-xl p-8">
            <p className="text-gray-300 mb-4">"{t('reviews.review2.text')}"</p>
            <p className="font-semibold">{t('reviews.review2.author')}</p>
            <p className="text-sm text-gray-400">{t('reviews.review2.location')}</p>
          </div>

          {/* REVIEW 3 */}
          <div className="bg-gray-800 rounded-xl p-8">
            <p className="text-gray-300 mb-4">"{t('reviews.review3.text')}"</p>
            <p className="font-semibold">{t('reviews.review3.author')}</p>
            <p className="text-sm text-gray-400">{t('reviews.review3.location')}</p>
          </div>
        </div>
      </section>

    </div>
  );
}
