import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateRoleDto } from './schema/Role/CreateRole.schema';
import { AssignableRoleDto } from './schema/RolePermission/assignable.role.permission';
import { Prisma } from '@prisma/client';
import { UpdateRoleDto } from './schema/Role/UpdateRole.schema';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async createRole(role: CreateRoleDto) {
    return await this.prisma.role.create({ data: role });
  }

  async getAllRole() {
    return await this.prisma.role.findMany();
  }

  async getRoleById(tenantId: string) {
    return await this.prisma.role.findUnique({ where: { id: tenantId } });
  }

  async updateRole(roleId: string, roleData: UpdateRoleDto) {
    return await this.prisma.role.update({
      where: {
        id: roleId,
      },
      data: roleData,
    });
  }

  async removeRole(roleId: string) {
    try {
      await this.prisma.role.delete({ where: { id: roleId } });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Role Not Found');
        }
      }
      throw error;
    }

    return {
      message: 'Role Deleted Succefully',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }

  // associated with role and permission table --> rolePermission

  async findRolePermission(roleId: string) {
    await this.prisma.rolePermission.findMany({
      where: { roleId },
      include: { permission: true },
    });
  }

  async assigneRolePermission(
    roleId: string,
    assignableRole: AssignableRoleDto,
  ) {
    const { permissionId } = assignableRole;
    return await this.prisma.rolePermission.create({
      data: {
        roleId,
        permissionId,
      },
      include: {
        permission: true,
      },
    });
  }

  async removeRolePermission(roleId: string, permissionId: string) {
    try {
      await this.prisma.rolePermission.delete({
        where: { roleId_permissionId: { roleId, permissionId } },
        include: { permission: true },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Role Permission not found');
        }
      }

      throw error;
    }

    return {
      message: 'Role Permission Removed',
      statusCode: HttpStatus.NO_CONTENT,
    };
  }
}
