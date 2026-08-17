import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../database/prisma.service';
import { CreateInvitationDto } from './schema/Create.invitation.schema';
import { UpdateInvitationDto } from './schema/Update.invitation.schema';
import {
  generateInvitationToken,
  hashInvitationToken,
  hashPassword,
} from './utils/invitation.token';
import { InvitationStatus } from '@prisma/client';

@Injectable()
export class InvitationService {
  constructor(private readonly prisma: PrismaService) {}

  async createInvitation(tenantId: string, inviationData: CreateInvitationDto) {
    const { email, roleId } = inviationData;

    const tenantExist = await this.prisma.tenant.findUnique({
      where: { id: tenantId },
    });

    if (!tenantExist) {
      throw new NotFoundException('Tenant Not Found');
    }

    const roleExist = await this.prisma.role.findUnique({
      where: { id: roleId },
    });

    if (!roleExist) {
      throw new NotFoundException('Role Not Found');
    }

    const invitedBy = 'ujwal@gmail.com';

    const emailExist = await this.prisma.user.findUnique({ where: { email } });

    if (emailExist) {
      throw new ConflictException('Email Already Exist');
    }

    return await this.prisma.invitation.create({
      data: {
        tenantId,
        email,
        roleId,
        invitedByUserId: invitedBy,
        tokenHash: 'okoko', // WIP
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: InvitationStatus.PENDING,
      },
    });
  }

  async listInvitation(tenantId: string) {
    return this.prisma.invitation.findMany({ where: { id: tenantId } });
  }

  async updateInvitation(id: string, inviationData: UpdateInvitationDto) {
    const { email } = inviationData;

    const invitationExist = await this.prisma.invitation.findUnique({
      where: { id },
    });

    if (!invitationExist) {
      throw new NotFoundException('Invitation Not Found');
    }

    if (email) {
      const emailExist = await this.prisma.invitation.findFirst({
        where: { email },
      });

      if (emailExist && emailExist.id !== id) {
        throw new ConflictException('Email Already Exist');
      }
    }

    return this.prisma.invitation.update({
      where: { id },
      data: { ...inviationData, updatedAt: new Date() },
    });
  }

  async getOneInvitation(id: string) {
    const invationExist = await this.prisma.invitation.findUnique({
      where: { id: id },
    });

    if (!invationExist) {
      throw new NotFoundException('Invitation Not Found');
    }

    return invationExist;
  }

  async revokeInvitation(id: string) {
    const invitation = (await this.prisma.invitation.findUnique({
      where: {
        id,
      },
    })) as any;

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    if (invitation.acceptedAt) {
      throw new ConflictException('Invitation has already been accepted');
    }

    if (invitation.revokedAt) {
      throw new ConflictException('Invitation has already been revoked');
    }

    return this.prisma.invitation.update({
      where: {
        id,
      },
      data: {
        revokedAt: new Date(),
      },
    });
  }

  async resendInvitation(id: string) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const invitation = (await this.prisma.invitation.findUnique({
      where: {
        id,
      },
    })) as any;

    if (!invitation) {
      throw new NotFoundException('Invitation not found');
    }

    if (invitation.acceptedAt) {
      throw new ConflictException('Invitation has already been accepted');
    }

    if (invitation.revokedAt) {
      throw new ConflictException('Invitation has been revoked');
    }

    const token = generateInvitationToken();
    const tokenHash = hashInvitationToken(token);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const updatedInvitation = await this.prisma.invitation.update({
      where: {
        id,
      },
      data: {
        tokenHash,
        expiresAt,
      },
    });

    // TODO:
    // Send `token` through your email service.

    return {
      invitation: updatedInvitation,
      token,
    };
  }

  async validateInvitation(token: string) {
    const tokenHash = hashInvitationToken(token);

    const invitation = await this.prisma.invitation.findUnique({
      where: {
        tokenHash,
      },
      include: {
        tenant: true,
        role: true,
      },
    });

    if (!invitation) {
      throw new NotFoundException('Invalid invitation');
    }

    if (invitation.revokedAt) {
      throw new ConflictException('Invitation has been revoked');
    }

    if (invitation.acceptedAt) {
      throw new ConflictException('Invitation has already been accepted');
    }

    if (invitation.expiresAt <= new Date()) {
      throw new ConflictException('Invitation has expired');
    }

    return {
      id: invitation.id,
      email: invitation.email,
      tenant: {
        id: invitation.tenant.id,
        name: invitation.tenant.name,
      },
      role: {
        id: invitation.role.id,
        name: invitation.role.name,
      },
      expiresAt: invitation.expiresAt,
    };
  }

  async acceptInvitation(
    token: string,
    password: string,
    displayName?: string,
  ) {
    const tokenHash = hashInvitationToken(token);

    return this.prisma.$transaction(async (tx) => {
      const invitation = await tx.invitation.findUnique({
        where: {
          tokenHash,
        },
        include: {
          role: true,
        },
      });

      if (!invitation) {
        throw new NotFoundException('Invalid invitation');
      }

      if (invitation.revokedAt) {
        throw new ConflictException('Invitation has been revoked');
      }

      if (invitation.acceptedAt) {
        throw new ConflictException('Invitation has already been accepted');
      }

      if (invitation.expiresAt <= new Date()) {
        throw new ConflictException('Invitation has expired');
      }

      let user = await tx.user.findUnique({
        where: {
          email: invitation.email,
        },
      });

      if (!user) {
        const passwordHash = hashPassword(password);

        user = await tx.user.create({
          data: {
            email: invitation.email,
            displayName,
            passwordHash,
            status: 'ACTIVE',
          },
        });
      }

      const membership = await tx.tenantUser.create({
        data: {
          tenantId: invitation.tenantId,
          userId: user.id,
          roleId: invitation.roleId,
        },
      });

      const acceptedInvitation = await tx.invitation.update({
        where: {
          id: invitation.id,
        },
        data: {
          acceptedAt: new Date(),
        },
      });

      return {
        user: {
          id: user.id,
          email: user.email,
          displayName: user.displayName,
        },
        membership,
        invitation: acceptedInvitation,
      };
    });
  }
}
