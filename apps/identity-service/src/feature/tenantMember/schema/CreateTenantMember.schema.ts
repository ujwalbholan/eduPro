import { z } from 'zod';

export const CreateTenantMemberSchema = z.object({
  tenantId: z.string().optional(),
  userId: z.string(),
  roleId: z.string(),
});

export type CreateTenantMemberDto = z.infer<typeof CreateTenantMemberSchema>;
