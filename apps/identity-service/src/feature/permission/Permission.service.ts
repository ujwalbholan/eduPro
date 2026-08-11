import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreatePermissionDto } from './schema/Permission.Create.schema';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { UpdatePermissionDto } from './schema/Premission.Update.schema';

@Injectable()
export class PermissionService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllPermission() {
    return this.prisma.permission.findMany();
  }

  async getOnePermission(permissionId: string) {
    const permission = await this.prisma.permission.findUnique({
      where: { id: permissionId },
    });

    if (!permission) {
      throw new NotFoundException('Permission Not Found');
    }

    return permission;
  }

  async createPermission(permissionData: CreatePermissionDto) {
    try {
      return await this.prisma.permission.create({
        data: permissionData,
      });
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException('Permission already exists');
        }

        if (error.code === 'P2003') {
          throw new NotFoundException('Referenced tenant or role not found');
        }
      }

      throw error;
    }
  }

  async updatePermission(
    permissionId: string,
    permissionData: UpdatePermissionDto,
  ) {
    try {
      return await this.prisma.permission.update({
        where: { id: permissionId },
        data: permissionData,
      });
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Permission Not Found');
        }

        if (error.code === 'P2003') {
          throw new NotFoundException('Referenced tenant or role not found');
        }
      }

      throw error;
    }
  }

  async removePermission(permissionId: string) {
    try {
      return await this.prisma.permission.delete({
        where: { id: permissionId },
      });
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException('Permission Not Found');
        }

        if (error.code === 'P2003') {
          throw new NotFoundException(
            'Permission has related records and cannot be deleted',
          );
        }
      }

      throw error;
    }
  }
}
