import { Users, Target, Award, Heart } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: Heart,
      title: 'À votre écoute',
      description: 'Nous prenons le temps de comprendre vos besoins et vos projets pour vous proposer la meilleure solution.',
    },
    {
      icon: Award,
      title: 'Expertise reconnue',
      description: 'Plus de 15 ans d\'expérience dans le secteur du crédit pour vous accompagner en toute confiance.',
    },
    {
      icon: Users,
      title: 'Accompagnement personnalisé',
      description: 'Un conseiller dédié vous guide à chaque étape de votre demande de prêt.',
    },
    {
      icon: Target,
      title: 'Transparence totale',
      description: 'Des conditions claires, sans frais cachés. Vous savez exactement ce que vous payez.',
    },
  ];

  const stats = [
    { number: '50 000+', label: 'Clients satisfaits' },
    { number: '15 ans', label: 'D\'expérience' },
    { number: '24h', label: 'Délai de réponse' },
    { number: '98%', label: 'Taux de satisfaction' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gradient-to-br from-blue-600 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              À propos de PrêtFacile
            </h1>
            <p className="text-xl text-blue-100">
              Depuis 2008, nous aidons des milliers de personnes à réaliser leurs projets
              grâce à des solutions de financement adaptées et accessibles.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Notre mission
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rendre le crédit accessible et transparent pour tous, en accompagnant chaque
              client dans la réalisation de ses projets personnels et professionnels.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 bg-blue-100 rounded-full mb-6">
                  <value.icon className="h-7 w-7 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Une équipe d'experts à votre service
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Notre équipe de conseillers spécialisés est formée pour vous offrir le meilleur
                accompagnement possible. Nous étudions chaque dossier avec attention et proposons
                des solutions personnalisées adaptées à votre situation.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Que vous souhaitiez financer un achat important, réaliser des travaux ou
                concrétiser un projet personnel, nous sommes là pour vous guider et vous
                conseiller à chaque étape.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">
                    <strong>Conseil gratuit :</strong> Nos experts répondent à toutes vos questions
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">
                    <strong>Étude rapide :</strong> Réponse de principe sous 24h
                  </p>
                </div>
                <div className="flex items-start">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-3"></div>
                  <p className="text-gray-700">
                    <strong>Suivi personnalisé :</strong> Un conseiller dédié jusqu'au déblocage des fonds
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl p-10 text-white">
              <h3 className="text-2xl font-bold mb-6">Pourquoi nous choisir ?</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Taux compétitifs</p>
                    <p className="text-blue-100 text-sm">
                      Nous négocions les meilleurs taux pour votre profil
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Process simplifié</p>
                    <p className="text-blue-100 text-sm">
                      Démarches en ligne et signature électronique
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Flexibilité</p>
                    <p className="text-blue-100 text-sm">
                      Possibilité de remboursement anticipé sans frais
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                    <span className="text-sm">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold mb-1">Sécurité maximale</p>
                    <p className="text-blue-100 text-sm">
                      Données cryptées et respect du RGPD
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ce que disent nos clients
            </h2>
            <p className="text-xl text-gray-300">
              Des milliers de clients nous font confiance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-800 rounded-xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "Service impeccable ! J'ai obtenu mon prêt en quelques jours seulement.
                L'équipe a été très à l'écoute et professionnelle."
              </p>
              <p className="font-semibold">Marie L.</p>
              <p className="text-sm text-gray-400">Paris</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "Taux très compétitif et démarches simplifiées. Je recommande vivement
                PrêtFacile pour financer vos projets."
              </p>
              <p className="font-semibold">Thomas D.</p>
              <p className="text-sm text-gray-400">Lyon</p>
            </div>

            <div className="bg-gray-800 rounded-xl p-8">
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-300 mb-4">
                "Excellent accompagnement du début à la fin. Mon conseiller a été disponible
                et a répondu à toutes mes questions."
              </p>
              <p className="font-semibold">Sophie M.</p>
              <p className="text-sm text-gray-400">Marseille</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
