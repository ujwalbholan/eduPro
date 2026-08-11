import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { TenantDto } from './schema/tenant.schema';
import { slug } from '../../utils/slug.conveter';

@Injectable()
export class TenantService {
  constructor(private readonly prism: PrismaService) {}

  async create(tenant: TenantDto) {
    const domain = slug(tenant.name);

    const isTenantExist = await this.prism.tenant.findFirst({
      where: { slug: domain },
    });

    if (isTenantExist) {
      throw new ConflictException('Tenant already exist');
    }

    return await this.prism.tenant.create({
      data: { ...tenant, slug: domain },
    });
  }

  async findAllTenant() {
    return await this.prism.tenant.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async findOne(id: string) {
    const tenant = await this.prism.tenant.findUnique({ where: { id } });

    if (!tenant) {
      throw new NotFoundException('Tenant Not Found');
    }

    return tenant;
  }
}
