import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { resolve } from 'node:path';
import { databaseConfig, jwtConfig, redisConfig } from './config';
import { PrismaModule } from './database/prisma.module';
import { HealthController } from './health/health.controller';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './feature/Authentication/auth.module';
import { TenantModule } from './feature/tenant/tenant.module';
import { UserModule } from './feature/user/User.module';
import { RoleModule } from './feature/role/Role.module';
import { TenantMemberModule } from './feature/tenantMember/tenantMember.module';
import { PermissionModule } from './feature/permission/Premission.module';

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
    TenantModule,
    UserModule,
    TenantMemberModule,
    RoleModule,
    PermissionModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
