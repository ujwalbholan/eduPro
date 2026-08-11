import { Module } from '@nestjs/common';
import { RoleService } from './Role.Service';
import { RoleController } from './Role.controller';

@Module({
  imports: [],
  exports: [RoleModule],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}
