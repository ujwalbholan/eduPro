import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TenantMemberService } from './tenantMember.service';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import {
  CreateTenantMemberDto,
  CreateTenantMemberSchema,
} from './schema/CreateTenantMember.schema';
import {
  UpdateTenantMemberDto,
  UpdateTenantMemberSchema,
} from './schema/UpdateTenantMember.schema';

@Controller('tenants/:tenantId')
export default class TenantMemberController {
  constructor(private readonly tenantMemberService: TenantMemberService) {}

  @Post('members')
  addMember(
    @Param('tenantId') tenantId: string,
    @Body(new ZodValidationPipe(CreateTenantMemberSchema))
    tenantMember: CreateTenantMemberDto,
  ) {
    return this.tenantMemberService.addMember(tenantId, tenantMember);
  }

  @Get('members')
  findAll(@Param('tenantUserId') tenantUserId: string) {
    return this.tenantMemberService.findAll(tenantUserId);
  }

  @Get('members/:userId')
  findOne(
    @Param('tenantId') tenantId: string,
    @Param('userId') userId: string,
  ) {
    return this.tenantMemberService.findOne(tenantId, userId);
  }

  @Patch('members/:userId')
  update(
    @Param('tenantId') tenantId: string,
    @Param('userId') userId: string,
    @Body(new ZodValidationPipe(UpdateTenantMemberSchema))
    tenantMemberData: UpdateTenantMemberDto,
  ) {
    return this.tenantMemberService.update(tenantId, userId, tenantMemberData);
  }

  @Delete('members/:userId')
  remove(@Param('tenantId') tenantId: string, @Param('userId') userId: string) {
    return this.tenantMemberService.remove(tenantId, userId);
  }
}
