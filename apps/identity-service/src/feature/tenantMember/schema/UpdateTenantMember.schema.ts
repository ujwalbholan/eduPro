import { z } from 'zod';
import { CreateTenantMemberSchema } from './CreateTenantMember.schema';

export const UpdateTenantMemberSchema = CreateTenantMemberSchema.partial({
  userId: true,
});

export type UpdateTenantMemberDto = z.infer<typeof UpdateTenantMemberSchema>;
