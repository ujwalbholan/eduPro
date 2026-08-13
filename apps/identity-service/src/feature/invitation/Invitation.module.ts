import { Module } from '@nestjs/common';
import { InvitationService } from './Invitation.service';
import {
  InvitationController,
  PublicInvitationController,
} from './Invitation.controller';

@Module({
  imports: [],
  exports: [InvitationModule],
  providers: [InvitationService],
  controllers: [InvitationController, PublicInvitationController],
})
export class InvitationModule {}
