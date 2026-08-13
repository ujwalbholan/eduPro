import { createHash, randomBytes } from 'node:crypto';

export function generateInvitationToken(): string {
  return randomBytes(32).toString('hex');
}

export function hashInvitationToken(token: string): string {
  return createHash('sha256').update(token).digest('hex');
}

export const hashPassword = (password: string): string => {
  return createHash('sha256').update(password).digest('hex');
};
