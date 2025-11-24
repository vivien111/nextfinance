import { useState } from 'react';
import { FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { supabase, type LoanApplication } from '../lib/supabase';

interface ApplicationProps {
  onNavigate: (page: string) => void;
}

export default function Application({ onNavigate }: ApplicationProps) {
  const [formData, setFormData] = useState<Partial<LoanApplication>>({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    loan_amount: 15000,
    loan_duration: 48,
    monthly_income: 0,
    employment_status: '',
    loan_purpose: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: ['loan_amount', 'loan_duration', 'monthly_income'].includes(name)
        ? Number(value)
        : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const { error } = await supabase
        .from('loan_applications')
        .insert([formData as LoanApplication]);

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        loan_amount: 15000,
        loan_duration: 48,
        monthly_income: 0,
        employment_status: '',
        loan_purpose: '',
      });
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
            <FileText className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Demande de prêt
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Remplissez ce formulaire pour démarrer votre demande. Réponse sous 24h.
          </p>
        </div>

        {submitStatus === 'success' && (
          <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-semibold text-green-900 mb-1">
                  Demande envoyée avec succès !
                </h3>
                <p className="text-green-700">
                  Nous avons bien reçu votre demande de prêt. Notre équipe va l'étudier et vous
                  contactera sous 24h pour vous donner une réponse de principe.
                </p>
              </div>
            </div>
          </div>
        )}

        {submitStatus === 'error' && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start">
              <AlertCircle className="h-6 w-6 text-red-600 mr-3 mt-0.5" />
              <div>
                <h3 className="font-semibold text-red-900 mb-1">
                  Erreur lors de l'envoi
                </h3>
                <p className="text-red-700">
                  Une erreur est survenue lors de l'envoi de votre demande. Veuillez réessayer.
                </p>
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Informations personnelles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="first_name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    name="first_name"
                    required
                    value={formData.first_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="last_name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Nom *
                  </label>
                  <input
                    type="text"
                    id="last_name"
                    name="last_name"
                    required
                    value={formData.last_name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Détails du prêt
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="loan_amount" className="block text-sm font-semibold text-gray-700 mb-2">
                    Montant souhaité (€) *
                  </label>
                  <input
                    type="number"
                    id="loan_amount"
                    name="loan_amount"
                    required
                    min="1000"
                    max="100000"
                    step="1000"
                    value={formData.loan_amount}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label htmlFor="loan_duration" className="block text-sm font-semibold text-gray-700 mb-2">
                    Durée (mois) *
                  </label>
                  <select
                    id="loan_duration"
                    name="loan_duration"
                    required
                    value={formData.loan_duration}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="12">12 mois</option>
                    <option value="24">24 mois</option>
                    <option value="36">36 mois</option>
                    <option value="48">48 mois</option>
                    <option value="60">60 mois</option>
                    <option value="72">72 mois</option>
                    <option value="84">84 mois</option>
                    <option value="96">96 mois</option>
                    <option value="120">120 mois</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="loan_purpose" className="block text-sm font-semibold text-gray-700 mb-2">
                    Objet du prêt *
                  </label>
                  <select
                    id="loan_purpose"
                    name="loan_purpose"
                    required
                    value={formData.loan_purpose}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="personal">Prêt personnel</option>
                    <option value="auto">Achat véhicule</option>
                    <option value="home">Travaux</option>
                    <option value="consolidation">Rachat de crédit</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Situation professionnelle
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="employment_status" className="block text-sm font-semibold text-gray-700 mb-2">
                    Statut professionnel *
                  </label>
                  <select
                    id="employment_status"
                    name="employment_status"
                    required
                    value={formData.employment_status}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Sélectionnez...</option>
                    <option value="employed">Salarié(e)</option>
                    <option value="self-employed">Indépendant(e)</option>
                    <option value="unemployed">Sans emploi</option>
                    <option value="retired">Retraité(e)</option>
                    <option value="student">Étudiant(e)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="monthly_income" className="block text-sm font-semibold text-gray-700 mb-2">
                    Revenus mensuels nets (€) *
                  </label>
                  <input
                    type="number"
                    id="monthly_income"
                    name="monthly_income"
                    required
                    min="0"
                    step="100"
                    value={formData.monthly_income}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <p className="text-sm text-gray-700">
                En soumettant ce formulaire, vous acceptez que vos données soient utilisées pour
                l'étude de votre demande de prêt. Vos informations sont sécurisées et confidentielles.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-blue-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer ma demande'}
              </button>
              <button
                type="button"
                onClick={() => onNavigate('simulation')}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-colors"
              >
                Retour à la simulation
              </button>
            </div>
          </div>
        </form>

        <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            Prochaines étapes
          </h3>
          <ol className="space-y-3 text-gray-700">
            <li className="flex items-start">
              <span className="font-semibold mr-2">1.</span>
              <span>Notre équipe étudie votre demande dans les 24h</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">2.</span>
              <span>Vous recevez une réponse de principe par email et téléphone</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">3.</span>
              <span>Si votre dossier est accepté, nous finalisons les détails ensemble</span>
            </li>
            <li className="flex items-start">
              <span className="font-semibold mr-2">4.</span>
              <span>Les fonds sont versés rapidement sur votre compte</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
