import { z } from 'zod';

export const CreateInvitationSchema = z.object({
  email: z.email(),
  roleId: z.string(),
});

export type CreateInvitationDto = z.infer<typeof CreateInvitationSchema>;
