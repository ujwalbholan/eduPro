import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { InvitationService } from './Invitation.service';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import {
  CreateInvitationDto,
  CreateInvitationSchema,
} from './schema/Create.invitation.schema';
import {
  UpdateInvitationDto,
  UpdateInvitationSchema,
} from './schema/Update.invitation.schema';
import {
  AcceptInvitationDto,
  AcceptInvitationSchema,
} from './schema/Accept.invitation.schema';

@Controller('/tenant/:tenantId/invitations')
export class InvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Get('')
  getInvitations(@Param('tenantId') tenantId: string) {
    return this.invitationService.listInvitation(tenantId);
  }

  @Post()
  createInvitation(
    @Param('tenantId') tenantId: string,
    @Body(new ZodValidationPipe(CreateInvitationSchema))
    inviationData: CreateInvitationDto,
  ) {
    return this.invitationService.createInvitation(tenantId, inviationData);
  }

  @Patch(':id')
  updateInvitation(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(UpdateInvitationSchema))
    inviationData: UpdateInvitationDto,
  ) {
    return this.invitationService.updateInvitation(id, inviationData);
  }

  @Get(':id')
  getOneInviation(@Param('id') id: string) {
    return this.invitationService.getOneInvitation(id);
  }

  @Post(':id/revoke')
  revokeInvitation(@Param('id') id: string) {
    return this.invitationService.revokeInvitation(id);
  }

  @Post(':id/resend')
  resendInviation(@Param('id') id: string) {
    return this.invitationService.resendInvitation(id);
  }
}

@Controller('/invitations')
export class PublicInvitationController {
  constructor(private readonly invitationService: InvitationService) {}

  @Get(':token')
  validateInvitation(@Param('token') token: string) {
    return this.invitationService.validateInvitation(token);
  }

  @Post(':token/accept')
  acceptInvitation(
    @Param('token') token: string,

    @Body(new ZodValidationPipe(AcceptInvitationSchema))
    dto: AcceptInvitationDto,
  ) {
    return this.invitationService.acceptInvitation(
      token,
      dto.password,
      dto.displayName,
    );
  }
}
