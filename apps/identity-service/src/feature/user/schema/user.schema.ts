import { UserStatus } from '@prisma/client';
import { z } from 'zod';

export const UserSchema = z.object({
  email: z.email(),

  displayName: z
    .string()
    .trim()
    .min(2, 'minimum 2 character')
    .max(20, 'max 20'),

  status: z.enum(UserStatus).default(UserStatus.ACTIVE),
});

export type UserDto = z.infer<typeof UserSchema>;
