import {
  ConflictException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateTenantMemberDto } from './schema/CreateTenantMember.schema';
import { UpdateTenantMemberDto } from './schema/UpdateTenantMember.schema';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class TenantMemberService {
  constructor(private readonly prisma: PrismaService) {}

  async addMember(tenantId: string, { userId, roleId }: CreateTenantMemberDto) {
    const [tenant, user, role] = await Promise.all([
      this.prisma.tenant.findUnique({
        where: { id: tenantId },
      }),
      this.prisma.user.findUnique({
        where: { id: userId },
      }),
      this.prisma.role.findFirst({
        where: {
          id: roleId,
          tenantId,
        },
      }),
    ]);

    if (!tenant) {
      throw new NotFoundException('Tenant Not Found');
    }

    if (!user) {
      throw new NotFoundException('User Not Found');
    }

    if (!role) {
      throw new NotFoundException('Role Not Found in Tenant');
    }

    try {
      return await this.prisma.tenantUser.create({
        data: {
          tenantId,
          userId,
          roleId,
        },
        include: {
          user: true,
          role: true,
        },
      });
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ConflictException(
            'User is already a member of this tenant',
          );
        }
      }

      throw error;
    }
  }

  async findAll(tenantUserId: string) {
    return await this.prisma.tenantUser.findMany({
      where: { id: tenantUserId },
    });
  }

  async findOne(tenantId: string, userId: string) {
    if (!tenantId || !userId) {
      throw new Error(
        `findOne called with missing keys: tenantId=${tenantId} userId=${userId}`,
      );
    }
    return this.prisma.tenantUser.findUnique({
      where: {
        tenantId_userId: {
          tenantId,
          userId,
        },
      },
    });
  }

  async update(
    tenantId: string,
    userId: string,
    tenantMemberData: UpdateTenantMemberDto,
  ) {
    const existing = await this.prisma.tenantUser.findUnique({
      where: {
        tenantId_userId: {
          tenantId,
          userId,
        },
      },
    });

    if (!existing) {
      throw new NotFoundException(
        `Member ${userId} not found in tenant ${tenantId}`,
      );
    }

    if (tenantMemberData.roleId) {
      await this.prisma.$transaction([
        this.prisma.tenantUserRole.deleteMany({
          where: {
            tenantUserId: existing.id,
          },
        }),

        this.prisma.tenantUserRole.create({
          data: {
            tenantUserId: existing.id,
            roleId: tenantMemberData.roleId,
          },
        }),
      ]);
    }

    return this.prisma.tenantUser.findUnique({
      where: {
        tenantId_userId: {
          tenantId,
          userId,
        },
      },
      include: {
        user: true,
        roles: {
          include: {
            role: true,
          },
        },
      },
    });
  }

  async remove(tenantId: string, userId: string) {
    try {
      await this.prisma.tenantUser.delete({
        where: {
          tenantId_userId: {
            tenantId,
            userId,
          },
        },
      });
    } catch (error: unknown) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          throw new NotFoundException(
            `Member with tenantId ${tenantId} and userId ${userId} not found`,
          );
        }
      }

      throw error;
    }

    return {
      statusCode: HttpStatus.OK,
      message: 'Tenant member deleted successfully',
    };
  }
}
