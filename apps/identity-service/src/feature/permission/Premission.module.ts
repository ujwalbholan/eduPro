import { Module } from '@nestjs/common';
import { PermissionController } from './Permission.controller';
import { PermissionService } from './Permission.service';

@Module({
  imports: [],
  exports: [PermissionModule],
  controllers: [PermissionController],
  providers: [PermissionService],
})
export class PermissionModule {}
