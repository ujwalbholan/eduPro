import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'node:path';
import { databaseConfig, jwtConfig, redisConfig } from './config';
import { PrismaModule } from './database/prisma.module';
import { HealthController } from './health/health.controller';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './feature/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      envFilePath: [
        resolve(process.cwd(), '.env'),
        resolve(process.cwd(), 'apps/identity-service/.env'),
      ],
      load: [databaseConfig, redisConfig, jwtConfig],
    }),
    PrismaModule,
    RedisModule,
    AuthModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
