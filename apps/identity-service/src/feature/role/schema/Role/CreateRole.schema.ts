import { z } from 'zod';

export const CreateRoleSchema = z.object({
  tenantId: z.string(),
  name: z.string().trim().min(2, 'min char').max(20, 'max'),
  description: z.string().min(5, 'min char').max(100, 'max char'),
});

export type CreateRoleDto = z.infer<typeof CreateRoleSchema>;
