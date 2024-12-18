import { z } from 'zod';

import { LoginSchema, NewPasswordSchema, RegisterSchema, ResetSchema, SettingsSchema } from '@/configs';

export type LoginSchemaValues = z.infer<typeof LoginSchema>;

export type RegisterSchemaValues = z.infer<typeof RegisterSchema>;

export type ResetSchemaValues = z.infer<typeof ResetSchema>;

export type NewPasswordSchemaValues = z.infer<typeof NewPasswordSchema>;

export type SettingSchemaValues = z.infer<typeof SettingsSchema>;
