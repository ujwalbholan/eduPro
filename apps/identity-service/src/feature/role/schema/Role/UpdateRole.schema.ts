import { z } from 'zod';
import { CreateRoleSchema } from './CreateRole.schema';

export const UpdateRoleSchema = CreateRoleSchema.partial({
  tenantId: true,
  name: true,
  description: true,
});

export type UpdateRoleDto = z.infer<typeof UpdateRoleSchema>;
