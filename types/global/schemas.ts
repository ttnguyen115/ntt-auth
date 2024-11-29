import { z } from 'zod';

import { LoginSchema } from '@/configs';

export type LoginSchemaValues = z.infer<typeof LoginSchema>;
