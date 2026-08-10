import { Module } from '@nestjs/common';
import { TenantController } from './tenant.controller';
import { TenantService } from './tenant.service';

@Module({
  exports: [TenantModule],
  controllers: [TenantController],
  imports: [],
  providers: [TenantService],
})
export class TenantModule {}
