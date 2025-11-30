import { ArrowRight, Calculator, Shield, Clock, CheckCircle, Star, Users, TrendingUp } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface HomeProps {
  onNavigate: (page: string) => void;
}

// Déplacer les interfaces en dehors du composant
interface Testimonial {
    name: string;
    city: string;
    rating: number;
    text: string;
}

interface FAQItem {
    question: string;
    answer: string;
}

export default function Home({ onNavigate }: HomeProps) {
    // Utiliser le namespace 'home' pour les chaînes spécifiques à cette page
    const { t } = useTranslation('home');

    // Récupérer les données dynamiques et les traduire
    const features = [
        {
          icon: Calculator,
          title: t('features.freeSimulation.title'),
          description: t('features.freeSimulation.description'),
        },
        {
          icon: Clock,
          title: t('features.quickResponse.title'),
          description: t('features.quickResponse.description'),
        },
        {
          icon: Shield,
          title: t('features.secure.title'),
          description: t('features.secure.description'),
        },
    ];

    // Les données de prêt sont maintenant structurées pour la traduction
    const loanTypes = [
        {
            key: 'personalLoan',
            title: t('loan_details.personalLoan.title'),
            amount: '1 000  - 75 000 ',
            duration: '12 - 84 mois',
            features: t('loan_details.personalLoan.features', { returnObjects: true }) as string[],
            image: './images/vecteezy_three-business-people-giving-thumbs-up_56699985.jpg',
        },
        {
            key: 'autoLoan',
            title: t('loan_details.autoLoan.title'),
            amount: '3 000  - 50 000 ',
            duration: '12 - 72 mois',
            features: t('loan_details.autoLoan.features', { returnObjects: true }) as string[],
            image: './images/vecteezy_lease-rental-car-sell-buy-dealership-shake-hand-customer_25025749.jpg',
        },
        {
            key: 'worksLoan',
            title: t('loan_details.worksLoan.title'),
            amount: '5 000  - 100 000 ',
            duration: '24 - 120 mois',
            features: t('loan_details.worksLoan.features', { returnObjects: true }) as string[],
            image: './images/vecteezy_the-construction-site-is-buzzing-with-activity-as-t_22402584.jpg',
        },
    ];

    // Récupérer les témoignages traduits avec typage
    const testimonials = (t('testimonials_data', { returnObjects: true }) as Testimonial[]) || [];

    const stats = [
        { number: '50K+', label: t('stats.clients'), icon: Users },
        { number: '4.9/5', label: t('stats.reviews'), icon: Star },
        { number: '95%', label: t('stats.acceptance'), icon: TrendingUp },
    ];

    // Récupérer les FAQs depuis la structure JSON traduite avec typage
    const faqItems = (t('faq.items', { returnObjects: true }) as FAQItem[]) || [];

    return (
        <div className="min-h-screen">
            {/* Hero Section avec effet glass avancé */}
            <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-20 overflow-hidden">
                {/* Arrière-plan avec effets de verre */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/30 rounded-full blur-3xl"></div>
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
                </div>

                {/* Container glass principal */}
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Texte principal avec effet glass */}
                        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                {t('hero.title')}
                                <span className="block text-blue-200 bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">
                                    {t('hero.subtitle')}
                                </span>
                            </h1>
                            <p className="text-xl md:text-2xl mb-8 text-blue-100 leading-relaxed">
                                {t('hero.description')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <button
                                    onClick={() => onNavigate('simulation')}
                                    className="group bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 shadow-xl hover:shadow-2xl flex items-center justify-center hover:scale-105"
                                >
                                    {t('hero.simuler')}
                                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </button>
                                <button
                                    onClick={() => onNavigate('application')}
                                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-transparent hover:scale-105"
                                >
                                    {t('hero.Faire')}
                                </button>
                            </div>
                        </div>

                        {/* Image décorative avec effet glass */}
                        <div className="hidden lg:flex justify-center">
                            <div className="relative">
                                <div className="w-96 h-96 bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl flex items-center justify-center p-8">
                                    <img 
                                        src="./images/vecteezy_businessman-meeting-and-working-with-financial-report_7143607.JPG" 
                                        alt="Finance"
                                        className="w-full h-full object-contain opacity-90"
                                    />
                                </div>
                                {/* Éléments glass flottants */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-400/20 backdrop-blur-lg rounded-2xl border border-white/20 rotate-12"></div>
                                <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-purple-400/20 backdrop-blur-lg rounded-2xl border border-white/20 -rotate-12"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Scroll indicator */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
                        <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce"></div>
                    </div>
                </div>
            </section>
            
            {/* Section Description Convaincante */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Texte descriptif */}
                        <div className="space-y-6">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                                {t('convincing_description.title')}
                                <span className="text-blue-600"> Popular Financia</span>
                            </h2>
                            
                            <div className="space-y-4">
                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mt-1">
                                        <CheckCircle className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{t('convincing_description.expertise_title')}</h3>
                                        <p className="text-gray-600">
                                            {t('convincing_description.expertise_description')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mt-1">
                                        <TrendingUp className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{t('convincing_description.rates_title')}</h3>
                                        <p className="text-gray-600">
                                            {t('convincing_description.rates_description')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                                        <Shield className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{t('convincing_description.support_title')}</h3>
                                        <p className="text-gray-600">
                                            {t('convincing_description.support_description')}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mt-1">
                                        <Clock className="h-5 w-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-gray-900">{t('convincing_description.time_title')}</h3>
                                        <p className="text-gray-600">
                                            {t('convincing_description.time_description')}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                                <h4 className="font-semibold text-blue-900 mb-2">🚀 Votre projet mérite la meilleure solution</h4>
                                <p className="text-blue-800 text-sm">
                                    Que ce soit pour acheter votre voiture de rêve, rénover votre maison ou concrétiser 
                                    un projet personnel, nous mettons tout en œuvre pour transformer vos ambitions en réalité.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <button
                                    onClick={() => onNavigate('simulation')}
                                    className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center justify-center"
                                >
                                    {t('convincing_description.start_simulation')}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </button>
                                <button
                                    onClick={() => onNavigate('contact')}
                                    className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all duration-300 border-2 border-blue-200 hover:scale-105"
                                >
                                    {t('convincing_description.talk_to_advisor')}
                                </button>
                            </div>
                        </div>

                        {/* Image illustrative */}
                        <div className="relative">
                            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-1">
                                <img 
                                    src="./images/vecteezy_businessman-meeting-and-working-with-financial-report_7143607.JPG" 
                                    alt="Conseiller PrêtFacile"
                                    className="w-full h-96 object-cover rounded-2xl"
                                />
                            </div>
                            {/* Badge de confiance */}
                            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 border">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600">95%</div>
                                    <div className="text-xs text-gray-600 font-medium">{t('convincing_description.badge_text')}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Section Avantages Concis */}
            <section className="py-20 bg-gradient-to-r from-blue-50 to-indigo-50">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                        {t('concise_advantages.title')}
                    </h2>
                    <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                        {t('concise_advantages.subtitle')}
                    </p>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="text-3xl mb-4">⚡</div>
                            <h3 className="font-semibold text-gray-900 mb-2">{t('concise_advantages.quick_title')}</h3>
                            <p className="text-gray-600 text-sm">{t('concise_advantages.quick_description')}</p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="text-3xl mb-4">💰</div>
                            <h3 className="font-semibold text-gray-900 mb-2">{t('concise_advantages.economic_title')}</h3>
                            <p className="text-gray-600 text-sm">{t('concise_advantages.economic_description')}</p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="text-3xl mb-4">🔒</div>
                            <h3 className="font-semibold text-gray-900 mb-2">{t('concise_advantages.secure_title')}</h3>
                            <p className="text-gray-600 text-sm">{t('concise_advantages.secure_description')}</p>
                        </div>
                        
                        <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
                            <div className="text-3xl mb-4">🎯</div>
                            <h3 className="font-semibold text-gray-900 mb-2">{t('concise_advantages.tailored_title')}</h3>
                            <p className="text-gray-600 text-sm">{t('concise_advantages.tailored_description')}</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl p-8 shadow-xl border border-blue-200 max-w-2xl mx-auto">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            {t('concise_advantages.small_cta_title')}
                        </h3>
                        <p className="text-gray-600 mb-6">
                            {t('concise_advantages.small_cta_description')}
                        </p>
                        <button
                            onClick={() => onNavigate('simulation')}
                            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                        >
                            {t('concise_advantages.start_now')}
                        </button>
                    </div>
                </div>
            </section>
            {/* Section Statistiques avec effet glass */}
            <section className="py-20 bg-gradient-to-b from-blue-600/5 to-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat) => (
                            <div 
                                key={stat.label} 
                                className="bg-white/70 backdrop-blur-lg rounded-2xl p-8 text-center border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100/50 backdrop-blur-sm rounded-full mb-4 border border-white/30">
                                    <stat.icon className="h-10 w-10 text-blue-600" />
                                </div>
                                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                                <div className="text-gray-600 font-medium">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Features avec effet glass */}
            <section className="py-20 bg-gradient-to-b from-white to-blue-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {features.map((feature) => (
                            <div
                                key={feature.title}
                                className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 border border-white/40 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                            >
                                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100/60 backdrop-blur-sm rounded-full mb-4 group-hover:bg-blue-200/60 transition-colors border border-white/30">
                                    <feature.icon className="h-8 w-8 text-blue-600" />
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            

            {/* Section Types de prêts avec effet glass */}
            <section className="py-20 bg-gradient-to-b from-blue-50/30 to-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t('loans.title')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {t('loans.description')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {loanTypes.map((loan) => (
                            <div
                                key={loan.title}
                                className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 overflow-hidden border border-white/40 group"
                            >
                                <div className="h-48 bg-gradient-to-r from-blue-600 to-blue-700 relative overflow-hidden">
                                    <img 
                                        src={loan.image} 
                                        alt={loan.title}
                                        className="w-full h-full object-cover mix-blend-overlay opacity-60 group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"></div>
                                    <div className="absolute inset-0 p-6 text-white">
                                        <h3 className="text-2xl font-bold mb-2">{loan.title}</h3>
                                        <p className="text-blue-100">{t('loans.from')} {loan.amount}</p>
                                        <p className="text-blue-100 text-sm">{t('loans.duration')}: {loan.duration}</p>
                                    </div>
                                </div>
                              <div className="p-6">
                                    <ul className="space-y-3">
                                        {loan.features.map((feature, index) => (
                                            <li key={index} className="flex items-start">
                                                <CheckCircle className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                                                <span className="text-gray-700">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        onClick={() => onNavigate('simulation')}
                                        className="w-full mt-6 bg-blue-600/90 backdrop-blur-sm text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 border border-blue-500/30 hover:scale-105"
                                    >
                                        {t('loan_details.simulate_this_loan')}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            {/* Section FAQ avec effet glass */}
            <section className="py-20 bg-gradient-to-b from-gray-50/50 to-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t('faq.title')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {t('faq.description')}
                        </p>
                    </div>

                    <div className="space-y-6">
                        {faqItems.map((faq, index) => (
                            <div 
                                key={index}
                                className="bg-white/80 backdrop-blur-lg rounded-2xl border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                            >
                                <details className="group">
                                    <summary className="list-none cursor-pointer">
                                        <div className="p-6 flex items-center justify-between hover:bg-white/50 transition-colors duration-200">
                                            <h3 className="text-lg font-semibold text-gray-900 pr-4">
                                                {faq.question}
                                            </h3>
                                            <div className="flex-shrink-0 w-6 h-6 transform group-open:rotate-180 transition-transform duration-200">
                                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                                </svg>
                                            </div>
                                        </div>
                                    </summary>
                                    <div className="px-6 pb-6">
                                        <div className="border-t border-gray-200/50 pt-4">
                                            <p className="text-gray-600 leading-relaxed">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>
                                </details>
                            </div>
                        ))}
                    </div>

                    {/* CTA FAQ */}
                    <div className="text-center mt-12">
                        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 backdrop-blur-lg rounded-2xl p-8 border border-blue-200/30">
                            <h3 className="text-2xl font-bold text-gray-900 mb-4">
                                {t('faq.cta.title')}
                            </h3>
                            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                                {t('faq.cta.description')}
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => onNavigate('contact')}
                                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 border border-blue-500/30"
                                >
                                    Nous contacter
                                </button>
                                <button className="bg-white/80 backdrop-blur-sm border-2 border-gray-300 text-gray-700 px-8 py-3 rounded-xl font-semibold hover:bg-white transition-all duration-300 hover:scale-105">
                                    📞+ 30 699 802 9086
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* Section Témoignages avec effet glass */}
            <section className="py-20 bg-gradient-to-b from-white to-gray-50/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            {t('testimonials.title')}
                        </h2>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            {t('testimonials.description')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={index} 
                                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <div className="flex items-center mb-4">
                                    <div className="w-12 h-12 rounded-full mr-4 bg-gradient-to-r from-blue-400 to-purple-400 p-0.5">
                                        <img 
                                            src={`/api/placeholder/60/60?text=${testimonial.name.split(' ').map((n: string) => n[0]).join('')}`}
                                            alt={testimonial.name}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <div className="font-semibold text-gray-900">{testimonial.name}</div>
                                        <div className="text-gray-500 text-sm">{testimonial.city}</div>
                                    </div>
                                </div>
                                <div className="flex mb-3">
                                    {[...Array(5)].map((_, i) => (
                                        <Star 
                                            key={i}
                                            className={`h-4 w-4 ${
                                                i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>
                                <p className="text-gray-600 italic">"{testimonial.text}"</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section Partenaires avec effet glass */}
            <section className="py-16 bg-gradient-to-r from-blue-50/50 to-purple-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h3 className="text-2xl font-bold text-gray-900 mb-4">
                            {t('partners.title')}
                        </h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {[...Array(4)].map((_, i) => (
                            <div 
                                key={i} 
                                className="bg-white/70 backdrop-blur-lg rounded-2xl p-6 border border-white/40 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
                            >
                                <img 
                                    src={`/api/placeholder/120/60?text=Partenaire+${i+1}`}
                                    alt={`Partenaire ${i+1}`}
                                    className="h-8 object-contain opacity-70 hover:opacity-100 transition-opacity"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section CTA finale avec effet glass avancé */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent"></div>
                </div>
                
                {/* Effets glass flottants */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-12 border border-white/20 shadow-2xl">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                            {t('cta.title')}
                        </h2>
                        <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto leading-relaxed">
                            {t('cta.description')}
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <button
                                onClick={() => onNavigate('simulation')}
                                className="bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white px-10 py-4 rounded-xl font-semibold text-lg hover:bg-white/30 transition-all duration-300 shadow"
                            >
                                {t('hero.simuler')}
                            </button>
                            <button
                                onClick={() => onNavigate('application')}
                                className="bg-white text-blue-600 px-10 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300 shadow-lg border-2 border-transparent"
                            >
                                {t('hero.Faire')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}