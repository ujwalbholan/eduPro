import { z } from 'zod';

export const AcceptInvitationSchema = z.object({
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password must not exceed 128 characters'),

  displayName: z.string().min(1).max(100).optional(),
});

export type AcceptInvitationDto = z.infer<typeof AcceptInvitationSchema>;
