import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { RoleService } from './Role.Service';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import {
  AssignableRoleDto,
  AssignableRoleSchema,
} from './schema/RolePermission/assignable.role.permission';
import {
  CreateRoleDto,
  CreateRoleSchema,
} from './schema/Role/CreateRole.schema';
import {
  UpdateRoleDto,
  UpdateRoleSchema,
} from './schema/Role/UpdateRole.schema';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  createRole(
    @Body(new ZodValidationPipe(CreateRoleSchema)) role: CreateRoleDto,
  ) {
    return this.roleService.createRole(role);
  }

  @Get()
  getAllRole() {
    return this.roleService.getAllRole();
  }

  @Get(':id')
  getRoleById(@Param('id') id: string) {
    return this.roleService.getRoleById(id);
  }

  @Patch(':roleId')
  updateRole(
    @Param('roleId') roleId: string,
    @Body(new ZodValidationPipe(UpdateRoleSchema)) roleData: UpdateRoleDto,
  ) {
    return this.roleService.updateRole(roleId, roleData);
  }

  @Delete(':roleId')
  removeRole(@Param('roleId') roleId: string) {
    return this.roleService.removeRole(roleId);
  }

  // associated with role and permission table --> rolePermission

  @Get(':roleId/permissions')
  findRolePermission(@Param('roleId') roleId: string) {
    return this.roleService.findRolePermission(roleId);
  }

  @Post(':roleId/permissions')
  assigneRolePermission(
    @Param('roleId') roleId: string,
    @Body(new ZodValidationPipe(AssignableRoleSchema))
    permissionId: AssignableRoleDto,
  ) {
    return this.roleService.assigneRolePermission(roleId, permissionId);
  }

  @Delete(':roleId/permission/:permissionId')
  removeRolePermission(
    @Param('roleId') roleId: string,
    @Param('permissionId') permissionId: string,
  ) {
    return this.roleService.removeRolePermission(roleId, permissionId);
  }
}
