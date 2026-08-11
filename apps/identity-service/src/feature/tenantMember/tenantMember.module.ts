import { Module } from '@nestjs/common';
import { TenantMemberService } from './tenantMember.service';
import TenantMemberController from './tenantMember.controller';

@Module({
  imports: [],
  providers: [TenantMemberService],
  exports: [TenantMemberModule],
  controllers: [TenantMemberController],
})
export class TenantMemberModule {}
