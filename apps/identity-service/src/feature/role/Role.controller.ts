import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RoleService } from './Role.Service';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import { RoleDto, RoleSchema } from './schema/role.schema';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  create(@Body(new ZodValidationPipe(RoleSchema)) role: RoleDto) {
    return this.roleService.Create(role);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.FindOne(id);
  }

  @Get()
  findAll() {
    return this.roleService.FindAll();
  }
}
