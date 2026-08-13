import { CreateInvitationSchema } from './Create.invitation.schema';
import { z } from 'zod';

export const UpdateInvitationSchema = CreateInvitationSchema.partial({
  roleId: true,
});

export type UpdateInvitationDto = z.infer<typeof UpdateInvitationSchema>;
