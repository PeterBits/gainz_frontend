import type { TFunction } from 'i18next';
import { z } from 'zod';

// Zod schema matching backend validation requirements
const registerValidationSchema = (t: TFunction<'translation', undefined>) =>
  z.object({
    name: z
      .string()
      .min(1, t('register.errors.nameRequired'))
      .max(100, t('register.errors.nameTooLong')),
    email: z.email(t('register.errors.emailInvalid')),
    password: z
      .string()
      .min(6, t('register.errors.passwordMin'))
      .max(128, t('register.errors.passwordMax'))
      .regex(/[A-Z]/, t('register.errors.passwordUppercase'))
      .regex(/[a-z]/, t('register.errors.passwordLowercase'))
      .regex(/[0-9]/, t('register.errors.passwordNumber')),
    role: z.enum(['ATHLETE', 'TRAINER']),
  });

export default registerValidationSchema;
