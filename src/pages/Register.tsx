import { Button } from '@/components/ui/button';
import { authApi } from '@/lib/api';
import { useAuthStore } from '@/stores/authStore';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { ThemeToggle } from '@/components/ThemeToggle';
import type { RegisterRequest } from '@/types/api';
import { ArrowLeft, Dumbbell, Mail, Lock, User, UserCircle, Check, X } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Password validation function matching backend requirements
const validatePassword = (password: string) => {
  return {
    length: password.length >= 6 && password.length <= 128,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
  };
};

export function Register() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);
  const { t } = useTranslation();
  const [formData, setFormData] = useState<RegisterRequest>({
    email: '',
    password: '',
    name: '',
    role: 'ATHLETE',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
  });
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Real-time password validation
    if (name === 'password') {
      setPasswordValidation(validatePassword(value));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side password validation before submitting
    const validation = validatePassword(formData.password);
    const isPasswordValid = Object.values(validation).every((v) => v);

    if (!isPasswordValid) {
      setError(t('register.passwordRequirements'));
      setShowPasswordValidation(true);
      return;
    }

    setLoading(true);

    try {
      const response = await authApi.register(formData);
      setAuth(response.data.user, response.data.token);
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const error = err as {
        response?: {
          data?: {
            message?: string;
            details?: Array<{ msg: string }>;
          };
        };
      };
      const errorMessage =
        error.response?.data?.message || 'Registration failed. Please try again.';
      const errorDetails = error.response?.data?.details;

      if (errorDetails && Array.isArray(errorDetails)) {
        setError(errorDetails.map((d) => d.msg).join(', '));
      } else {
        setError(errorMessage || t('register.error'));
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Language Switcher */}
        <div className="flex justify-end mb-4">
          <ThemeToggle />
          <LanguageSwitcher />
        </div>

        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="mb-6 hover:bg-white/50 dark:hover:bg-slate-800/50 text-slate-900 dark:text-slate-100"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('common.back')}
        </Button>

        {/* Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 p-8 md:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Dumbbell className="w-8 h-8 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
              {t('register.title')}
            </h1>
            <p className="text-slate-600 dark:text-slate-300">{t('register.subtitle')}</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl mb-6 flex items-start gap-2">
              <span className="text-red-500 font-semibold">!</span>
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                {t('register.name')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  minLength={1}
                  maxLength={100}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-2">
                {t('register.email')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2"
              >
                {t('register.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 dark:text-slate-500" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  onFocus={() => setShowPasswordValidation(true)}
                  required
                  minLength={6}
                  maxLength={128}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="••••••••"
                />
              </div>

              {/* Password Validation Feedback */}
              {showPasswordValidation && formData.password && (
                <div className="mt-3 p-3 bg-slate-50 dark:bg-slate-700/50 rounded-lg space-y-2">
                  <p className="text-xs font-medium text-slate-700 dark:text-slate-300 mb-2">
                    {t('register.passwordMustContain')}:
                  </p>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      {passwordValidation.length ? (
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`text-xs ${passwordValidation.length ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400'}`}
                      >
                        {t('register.validation.length')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordValidation.uppercase ? (
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`text-xs ${passwordValidation.uppercase ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400'}`}
                      >
                        {t('register.validation.uppercase')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordValidation.lowercase ? (
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`text-xs ${passwordValidation.lowercase ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400'}`}
                      >
                        {t('register.validation.lowercase')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {passwordValidation.number ? (
                        <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                      <span
                        className={`text-xs ${passwordValidation.number ? 'text-green-600 dark:text-green-400' : 'text-slate-600 dark:text-slate-400'}`}
                      >
                        {t('register.validation.number')}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div>
              <label htmlFor="role" className="block text-sm font-medium text-slate-700 mb-2">
                {t('register.role')}
              </label>
              <div className="relative">
                <UserCircle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full pl-11 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white cursor-pointer"
                >
                  <option value="ATHLETE">{t('register.roleAthlete')}</option>
                  <option value="TRAINER">{t('register.roleTrainer')}</option>
                </select>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all"
              disabled={loading}
            >
              {loading ? t('register.submitting') : t('register.submit')}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                {t('register.alreadyHaveAccount')}
              </span>
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center">
            <Link
              to="/login"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium hover:underline"
            >
              {t('register.signInInstead')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
