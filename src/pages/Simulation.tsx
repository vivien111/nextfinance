import { useState } from 'react';
import { Calculator, TrendingDown, Calendar, Euro } from 'lucide-react';

interface SimulationProps {
  onNavigate: (page: string) => void;
}

export default function Simulation({ onNavigate }: SimulationProps) {
  const [amount, setAmount] = useState(15000);
  const [duration, setDuration] = useState(48);
  const [rate] = useState(3.5);

  const calculateMonthlyPayment = () => {
    const monthlyRate = rate / 100 / 12;
    const payment =
      (amount * monthlyRate * Math.pow(1 + monthlyRate, duration)) /
      (Math.pow(1 + monthlyRate, duration) - 1);
    return payment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * duration;
  const totalInterest = totalPayment - amount;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <Calculator className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simulateur de prêt
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Calculez vos mensualités en temps réel et trouvez la solution adaptée à votre budget
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Paramètres du prêt
            </h2>

            <div className="space-y-8">
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-gray-700">
                    Montant du prêt
                  </label>
                  <span className="text-2xl font-bold text-blue-600">
                    {amount.toLocaleString('fr-FR')} €
                  </span>
                </div>
                <input
                  type="range"
                  min="1000"
                  max="100000"
                  step="1000"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1 000 €</span>
                  <span>100 000 €</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-semibold text-gray-700">
                    Durée du prêt
                  </label>
                  <span className="text-2xl font-bold text-blue-600">
                    {duration} mois
                  </span>
                </div>
                <input
                  type="range"
                  min="12"
                  max="120"
                  step="6"
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>12 mois</span>
                  <span>120 mois</span>
                </div>
              </div>

              <div className="bg-blue-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-700">
                    Taux d'intérêt annuel
                  </span>
                  <span className="text-xl font-bold text-blue-600">
                    {rate.toFixed(2)} %
                  </span>
                </div>
                <p className="text-xs text-gray-600 mt-2">
                  Taux indicatif sous réserve d'acceptation de votre dossier
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white">
              <h2 className="text-2xl font-bold mb-6">Vos mensualités</h2>
              <div className="text-center py-6">
                <div className="text-6xl font-bold mb-2">
                  {monthlyPayment.toLocaleString('fr-FR', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })} €
                </div>
                <p className="text-blue-200 text-lg">par mois</p>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">
                Détail du financement
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Euro className="h-5 w-5 text-blue-600 mr-3" />
                    <span className="font-medium text-gray-700">
                      Montant emprunté
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {amount.toLocaleString('fr-FR')} €
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <TrendingDown className="h-5 w-5 text-orange-600 mr-3" />
                    <span className="font-medium text-gray-700">
                      Intérêts totaux
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {totalInterest.toLocaleString('fr-FR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} €
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Calendar className="h-5 w-5 text-green-600 mr-3" />
                    <span className="font-medium text-gray-700">
                      Coût total du crédit
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {totalPayment.toLocaleString('fr-FR', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })} €
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onNavigate('application')}
              className="w-full bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
            >
              Faire une demande de prêt
            </button>

            <p className="text-xs text-gray-500 text-center">
              Cette simulation est indicative et ne constitue pas une offre de prêt.
              Les conditions définitives seront établies après étude de votre dossier.
            </p>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Comment ça marche ?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-blue-600 font-bold text-xl mb-4">
                1
              </div>
              <h4 className="font-semibold text-lg mb-2">Simulez</h4>
              <p className="text-gray-600">
                Ajustez les paramètres pour trouver la mensualité qui correspond à votre budget
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-blue-600 font-bold text-xl mb-4">
                2
              </div>
              <h4 className="font-semibold text-lg mb-2">Demandez</h4>
              <p className="text-gray-600">
                Remplissez le formulaire de demande en quelques minutes
              </p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full text-blue-600 font-bold text-xl mb-4">
                3
              </div>
              <h4 className="font-semibold text-lg mb-2">Recevez</h4>
              <p className="text-gray-600">
                Obtenez une réponse de principe sous 24h et les fonds rapidement
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
