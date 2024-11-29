import { z } from 'zod';

import { LoginSchema, RegisterSchema } from '@/configs';

export type LoginSchemaValues = z.infer<typeof LoginSchema>;
export type RegisterSchemaValues = z.infer<typeof RegisterSchema>;
