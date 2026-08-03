import { registerAs } from '@nestjs/config';

export const jwtConfig = registerAs('jwt', () => ({
  issuer: process.env.JWT_ISSUER ?? 'identity-service',
  audience: process.env.JWT_AUDIENCE ?? 'education-api',
}));
