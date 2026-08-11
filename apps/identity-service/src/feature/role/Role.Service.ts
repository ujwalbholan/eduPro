import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { RoleDto } from './schema/role.schema';

@Injectable()
export class RoleService {
  constructor(private readonly prisma: PrismaService) {}

  async Create(role: RoleDto) {
    return await this.prisma.role.create({ data: role });
  }

  async FindOne(tenantId: string) {
    return await this.prisma.role.findUnique({ where: { id: tenantId } });
  }

  async FindAll() {
    return await this.prisma.role.findMany();
  }
}
