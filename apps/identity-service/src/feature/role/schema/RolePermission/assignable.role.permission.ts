import { z } from 'zod';

export const AssignableRoleSchema = z.object({
  permissionId: z.string(),
});

export type AssignableRoleDto = z.infer<typeof AssignableRoleSchema>;
