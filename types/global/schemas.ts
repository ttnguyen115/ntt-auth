import { z } from 'zod';

import { LoginSchema, RegisterSchema, ResetSchema } from '@/configs';

export type LoginSchemaValues = z.infer<typeof LoginSchema>;

export type RegisterSchemaValues = z.infer<typeof RegisterSchema>;

export type ResetSchemaValues = z.infer<typeof ResetSchema>;
