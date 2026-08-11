import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TenantDto, TenantSchema } from './schema/tenant.schema';
import { TenantService } from './tenant.service';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';

@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Post()
  create(@Body(new ZodValidationPipe(TenantSchema)) tenant: TenantDto) {
    return this.tenantService.create(tenant);
  }

  @Get()
  findAll() {
    return this.tenantService.findAllTenant();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(id);
  }
}
