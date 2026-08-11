import { z } from 'zod';

export const CreatePermissionSchema = z.object({
  code: z
    .string()
    .min(1)
    .max(100)
    .regex(/^[a-z0-9]+:[a-z0-9:_-]+$/, 'Invalid permission code'),

  description: z.string().max(255).optional(),
});

export type CreatePermissionDto = z.infer<typeof CreatePermissionSchema>;
