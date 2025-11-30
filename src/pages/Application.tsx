import { useState, useMemo } from 'react';
import { FileText, CheckCircle, AlertCircle, Calculator, TrendingUp, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ApplicationProps {
  onNavigate: (page: string) => void;
}

interface LoanApplicationData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  loan_amount: number;
  loan_duration: number;
  monthly_income: number;
  employment_status: string;
  loan_purpose: string;
}

interface ValidationErrors {
  [key: string]: string;
}

interface LoanSimulation {
  monthlyPayment: number;
  totalInterest: number;
  totalAmount: number;
  eligibility: 'high' | 'medium' | 'low';
  debtToIncomeRatio: number;
}

export default function Application({ onNavigate }: ApplicationProps) {
  const { t } = useTranslation('simulation');

  const [formData, setFormData] = useState<LoanApplicationData>({
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
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const loanDurations = t('application.form.options.loan_duration', { returnObjects: true }) as Record<string, string> || {};
  const loanPurposes = t('application.form.options.loan_purpose', { returnObjects: true }) as Record<string, string> || {};
  const employmentStatuses = t('application.form.options.employment_status', { returnObjects: true }) as Record<string, string> || {};
  const nextSteps = t('application.next_steps.steps', { returnObjects: true }) as string[] || [];

  // Simulation intelligente du prêt
  const loanSimulation = useMemo((): LoanSimulation => {
    const annualInterestRate = 0.039;
    const monthlyRate = annualInterestRate / 12;
    const numberOfPayments = formData.loan_duration;
    
    if (monthlyRate === 0 || numberOfPayments === 0) {
      return {
        monthlyPayment: 0,
        totalInterest: 0,
        totalAmount: formData.loan_amount,
        eligibility: 'medium',
        debtToIncomeRatio: 0,
      };
    }
    
    const monthlyPayment = formData.loan_amount * 
      (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / 
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
    
    const totalAmount = monthlyPayment * numberOfPayments;
    const totalInterest = totalAmount - formData.loan_amount;
    
    const debtToIncomeRatio = formData.monthly_income > 0 ? 
      (monthlyPayment / formData.monthly_income) * 100 : 0;
    
    let eligibility: 'high' | 'medium' | 'low' = 'medium';
    if (debtToIncomeRatio <= 30 && formData.monthly_income >= 1500) {
      eligibility = 'high';
    } else if (debtToIncomeRatio > 50 || formData.monthly_income < 1000) {
      eligibility = 'low';
    }

    return {
      monthlyPayment: Number(monthlyPayment.toFixed(2)),
      totalInterest: Number(totalInterest.toFixed(2)),
      totalAmount: Number(totalAmount.toFixed(2)),
      eligibility,
      debtToIncomeRatio: Number(debtToIncomeRatio.toFixed(1)),
    };
  }, [formData.loan_amount, formData.loan_duration, formData.monthly_income]);

  // Validation en temps réel
  const validateField = (name: string, value: any): string => {
    switch (name) {
      case 'email':
        if (!value) return t('application.validation.required') || 'Champ requis';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return !emailRegex.test(value) ? t('application.validation.invalid_email') || 'Email invalide' : '';
      
      case 'phone':
        if (!value) return t('application.validation.required') || 'Champ requis';
        const phoneRegex = /^[+]?[\d\s-()]{10,}$/;
        return !phoneRegex.test(value.replace(/\s/g, '')) ? t('application.validation.invalid_phone') || 'Téléphone invalide' : '';
      
      case 'loan_amount':
        if (value < 1000) return t('application.validation.min_amount') || 'Montant minimum : 1 000 €';
        if (value > 100000) return t('application.validation.max_amount') || 'Montant maximum : 100 000 €';
        return '';
      
      case 'monthly_income':
        if (value < 500) return t('application.validation.min_income') || 'Revenu minimum : 500 €';
        return '';
      
      case 'first_name':
      case 'last_name':
        if (!value) return t('application.validation.required') || 'Champ requis';
        return value.length < 2 ? t('application.validation.min_length') || 'Minimum 2 caractères' : '';
      
      case 'employment_status':
      case 'loan_purpose':
        return !value ? t('application.validation.required') || 'Champ requis' : '';
      
      default:
        return '';
    }
  };

  const validateForm = (): boolean => {
    const errors: ValidationErrors = {};
    
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof LoanApplicationData]);
      if (error) errors[key] = error;
    });

    if (loanSimulation.debtToIncomeRatio > 60) {
      errors.loan_amount = t('application.validation.debt_too_high') || 'Ratio dette/revenu trop élevé';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData((prev) => ({
      ...prev,
      [name]: ['loan_amount', 'loan_duration', 'monthly_income'].includes(name) ? Number(value) : value,
    }));

    setTouchedFields(prev => new Set(prev).add(name));
    
    const error = validateField(name, name === 'loan_amount' ? Number(value) : value);
    setValidationErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name } = e.target;
    setTouchedFields(prev => new Set(prev).add(name));
  };

  const getFieldError = (fieldName: string): string => {
    return touchedFields.has(fieldName) ? validationErrors[fieldName] || '' : '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const allFields = new Set(Object.keys(formData));
    setTouchedFields(allFields);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://back-end-68tz.onrender.com/api/sendEmail', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          simulation: loanSimulation
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Erreur lors de l\'envoi');
      }

      setSubmitStatus('success');

      // Réinitialisation du formulaire
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
      
      setTouchedFields(new Set());
      setValidationErrors({});
    } catch (error) {
      console.error('Error submitting application:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Suggestions intelligentes
  const suggestedLoanAmount = useMemo(() => {
    const multiplier = formData.monthly_income * 0.3 * formData.loan_duration / 12;
    return Math.min(Math.max(Math.round(multiplier / 1000) * 1000, 1000), 100000);
  }, [formData.monthly_income, formData.loan_duration]);

  const handleSuggestionClick = () => {
    setFormData(prev => ({
      ...prev,
      loan_amount: suggestedLoanAmount
    }));
  };

  const getEligibilityColor = (eligibility: string) => {
    switch (eligibility) {
      case 'high': return 'text-green-600 bg-green-50 border-green-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getEligibilityText = (eligibility: string) => {
    switch (eligibility) {
      case 'high': return t('application.simulation.eligibility_high') || 'Élevée';
      case 'medium': return t('application.simulation.eligibility_medium') || 'Moyenne';
      case 'low': return t('application.simulation.eligibility_low') || 'Limitée';
      default: return '';
    }
  };

  // CORRECTION : Logique de validation améliorée
  const isFormValid = useMemo(() => {
    // Vérifier d'abord si tous les champs requis ont une valeur
    const requiredFields = ['first_name', 'last_name', 'email', 'phone', 'employment_status', 'loan_purpose'];
    const allRequiredFieldsFilled = requiredFields.every(field => 
      Boolean(formData[field as keyof LoanApplicationData])
    );

    // Vérifier que monthly_income est valide
    const monthlyIncomeValid = formData.monthly_income > 0;

    // Vérifier s'il y a des erreurs de validation pour les champs touchés
    const hasErrors = Array.from(touchedFields).some(field => 
      validationErrors[field]
    );

    return allRequiredFieldsFilled && monthlyIncomeValid && !hasErrors;
  }, [formData, validationErrors, touchedFields]);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* COLONNE PRINCIPALE - FORMULAIRE */}
          <div className="lg:col-span-2">
            
            {/* HEADER */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {t('application.title')}
              </h1>

              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                {t('application.description')}
              </p>
            </div>

            {/* MESSAGES DE STATUT */}
            {submitStatus === 'success' && (
              <div className="mb-8 bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="flex items-start">
                  <CheckCircle className="h-6 w-6 text-green-600 mr-3 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-green-900 mb-1">
                      {t('application.success.title')}
                    </h3>
                    <p className="text-green-700">
                      {t('application.success.message')}
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
                      {t('application.error.title')}
                    </h3>
                    <p className="text-red-700">
                      {t('application.error.message')}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* FORMULAIRE */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8">
              <div className="space-y-8">

                {/* INFORMATIONS PERSONNELLES */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {t('application.sections.personal_info')}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {['first_name', 'last_name', 'email', 'phone'].map((field) => (
                      <div key={field}>
                        <label htmlFor={field} className="block text-sm font-semibold text-gray-700 mb-2">
                          {t(`application.form.labels.${field}`)}
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        <input
                          type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                          id={field}
                          name={field}
                          required
                          value={formData[field as keyof LoanApplicationData] as string}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            getFieldError(field) ? 'border-red-300 bg-red-50' : 'border-gray-300'
                          }`}
                          placeholder={t(`application.form.placeholders.${field}`) || ''}
                        />
                        {getFieldError(field) && (
                          <p className="mt-1 text-sm text-red-600">{getFieldError(field)}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* DÉTAILS DU PRÊT */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {t('application.sections.loan_details')}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* MONTANT DU PRÊT AVEC SUGGESTION */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label htmlFor="loan_amount" className="block text-sm font-semibold text-gray-700">
                          {t('application.form.labels.loan_amount')}
                          <span className="text-red-500 ml-1">*</span>
                        </label>
                        {suggestedLoanAmount > 0 && suggestedLoanAmount !== formData.loan_amount && (
                          <button
                            type="button"
                            onClick={handleSuggestionClick}
                            className="text-sm text-blue-600 hover:text-blue-700 font-medium underline"
                          >
                            {t('application.suggestion.based_on_income', { amount: suggestedLoanAmount.toLocaleString() })}
                          </button>
                        )}
                      </div>
                      <input
                        type="range"
                        id="loan_amount"
                        name="loan_amount"
                        required
                        min="1000"
                        max="100000"
                        step="1000"
                        value={formData.loan_amount}
                        onChange={handleChange}
                        className="w-full mb-2 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <div className="flex justify-between text-sm text-gray-500">
                        <span>1 000 €</span>
                        <span className="font-semibold text-lg text-gray-900">
                          {formData.loan_amount.toLocaleString()} €
                        </span>
                        <span>100 000 €</span>
                      </div>
                      {getFieldError('loan_amount') && (
                        <p className="mt-1 text-sm text-red-600">{getFieldError('loan_amount')}</p>
                      )}
                    </div>

                    {/* DURÉE DU PRÊT */}
                    <div>
                      <label htmlFor="loan_duration" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('application.form.labels.loan_duration')}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="loan_duration"
                        name="loan_duration"
                        required
                        value={formData.loan_duration}
                        onChange={handleChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        {Object.entries(loanDurations).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                    </div>

                    {/* OBJECTIF DU PRÊT */}
                    <div className="md:col-span-2">
                      <label htmlFor="loan_purpose" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('application.form.labels.loan_purpose')}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="loan_purpose"
                        name="loan_purpose"
                        required
                        value={formData.loan_purpose}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          getFieldError('loan_purpose') ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">{t('application.form.placeholders.loan_purpose')}</option>
                        {Object.entries(loanPurposes).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                      {getFieldError('loan_purpose') && (
                        <p className="mt-1 text-sm text-red-600">{getFieldError('loan_purpose')}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* SITUATION PROFESSIONNELLE */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {t('application.sections.employment_situation')}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    
                    {/* STATUT */}
                    <div>
                      <label htmlFor="employment_status" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('application.form.labels.employment_status')}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <select
                        id="employment_status"
                        name="employment_status"
                        required
                        value={formData.employment_status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          getFieldError('employment_status') ? 'border-red-300' : 'border-gray-300'
                        }`}
                      >
                        <option value="">{t('application.form.placeholders.employment_status')}</option>
                        {Object.entries(employmentStatuses).map(([value, label]) => (
                          <option key={value} value={value}>{label}</option>
                        ))}
                      </select>
                      {getFieldError('employment_status') && (
                        <p className="mt-1 text-sm text-red-600">{getFieldError('employment_status')}</p>
                      )}
                    </div>

                    {/* REVENU MENSUEL */}
                    <div>
                      <label htmlFor="monthly_income" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('application.form.labels.monthly_income')}
                        <span className="text-red-500 ml-1">*</span>
                      </label>
                      <input
                        type="number"
                        id="monthly_income"
                        name="monthly_income"
                        required
                        min="0"
                        step="100"
                        value={formData.monthly_income || ''}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          getFieldError('monthly_income') ? 'border-red-300 bg-red-50' : 'border-gray-300'
                        }`}
                        placeholder="0"
                      />
                      {getFieldError('monthly_income') && (
                        <p className="mt-1 text-sm text-red-600">{getFieldError('monthly_income')}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* NOTICE DE CONFIDENTIALITÉ */}
                <div className="bg-blue-50 rounded-lg p-6">
                  <div className="flex items-start">
                    <Shield className="h-5 w-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-700">
                      {t('application.form.privacy_notice')}
                    </p>
                  </div>
                </div>

                {/* BOUTONS */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting || !isFormValid}
                    className="flex-1 bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        {t('application.form.buttons.submitting')}
                      </>
                    ) : (
                      t('application.form.buttons.submit')
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => onNavigate('simulation')}
                    className="flex-1 bg-gray-200 text-gray-700 py-4 px-6 rounded-lg font-semibold text-lg hover:bg-gray-300 transition-colors"
                  >
                    {t('application.form.buttons.back_to_simulation')}
                  </button>
                </div>
              </div>
            </form>

            {/* PROCHAINES ÉTAPES */}
            <div className="mt-8 bg-white rounded-xl shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                {t('application.next_steps.title')}
              </h3>

              <ol className="space-y-3 text-gray-700">
                {nextSteps.map((step, index) => (
                  <li key={index} className="flex items-start">
                    <span className="font-semibold mr-2 text-blue-600">{index + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* COLONNE LATÉRALE - SIMULATION INTELLIGENTE */}
          <div className="space-y-6">
            
            {/* CARTE DE SIMULATION */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="flex items-center mb-4">
                <Calculator className="h-6 w-6 text-blue-600 mr-2" />
                <h3 className="text-lg font-bold text-gray-900">
                  {t('application.simulation.title')}
                </h3>
              </div>

              {/* INDICATEUR D'ÉLIGIBILITÉ */}
              <div className={`mb-4 p-3 rounded-lg border ${getEligibilityColor(loanSimulation.eligibility)}`}>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{t('application.simulation.eligibility')}</span>
                  <span className="font-bold">{getEligibilityText(loanSimulation.eligibility)}</span>
                </div>
                {loanSimulation.eligibility === 'low' && (
                  <p className="text-sm mt-2">
                    {t('application.simulation.eligibility_low_warning')}
                  </p>
                )}
              </div>

              {/* DÉTAILS DE LA SIMULATION */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('application.simulation.monthly_payment')}</span>
                  <span className="font-semibold text-lg">{loanSimulation.monthlyPayment.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{t('application.simulation.total_interest')}</span>
                  <span className="font-semibold text-green-600">{loanSimulation.totalInterest.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
                </div>

                <div className="flex justify-between items-center border-t pt-3">
                  <span className="text-gray-600 font-semibold">{t('application.simulation.total_amount')}</span>
                  <span className="font-bold text-xl text-blue-600">{loanSimulation.totalAmount.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} €</span>
                </div>

                {/* RATIO DETTE/REVENU */}
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-gray-600">{t('application.simulation.debt_to_income')}</span>
                    <span className={`text-sm font-semibold ${
                      loanSimulation.debtToIncomeRatio > 50 ? 'text-red-600' : 
                      loanSimulation.debtToIncomeRatio > 30 ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {loanSimulation.debtToIncomeRatio}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        loanSimulation.debtToIncomeRatio > 50 ? 'bg-red-500' : 
                        loanSimulation.debtToIncomeRatio > 30 ? 'bg-yellow-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min(loanSimulation.debtToIncomeRatio, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>0%</span>
                    <span>30%</span>
                    <span>50%</span>
                    <span>100%</span>
                  </div>
                </div>
              </div>

              {/* CONSEILS INTELLIGENTS */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-start">
                  <TrendingUp className="h-5 w-5 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-blue-900 text-sm mb-1">
                      {t('application.simulation.advice.title')}
                    </h4>
                    <p className="text-blue-700 text-sm">
                      {loanSimulation.debtToIncomeRatio > 40 
                        ? t('application.simulation.advice.high_ratio')
                        : t('application.simulation.advice.good_ratio')
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* AVANTAGES */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">
                {t('application.benefits.title')}
              </h3>
              <ul className="space-y-3 text-sm text-gray-700">
                {[
                  'application.benefits.fast_processing',
                  'application.benefits.competitive_rates',
                  'application.benefits.no_hidden_fees',
                  'application.benefits.flexible_terms'
                ].map((benefit, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{t(benefit)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}