import { z } from 'zod';

export const RoleSchema = z.object({
  tenantId: z.string(),
  name: z.string().trim().min(2, 'min char').max(20, 'max'),
  description: z.string().min(5, 'min char').max(100, 'max char'),
});

export type RoleDto = z.infer<typeof RoleSchema>;
