import { TenantStatus } from '@prisma/client';
import { z } from 'zod';

export const TenantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must not exceed 100 characters'),

  slug: z
    .string()
    .trim()
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug must contain lowercase letters, numbers, and single hyphens',
    )
    .optional(),

  status: z.enum(TenantStatus).default(TenantStatus.ACTIVE),
});

export type TenantDto = z.infer<typeof TenantSchema>;
