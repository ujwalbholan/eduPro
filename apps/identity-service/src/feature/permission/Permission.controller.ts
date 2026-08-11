import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PermissionService } from './Permission.service';
import { ZodValidationPipe } from '../../common/pipes/zod-validation.pipe';
import {
  CreatePermissionDto,
  CreatePermissionSchema,
} from './schema/Permission.Create.schema';
import {
  UpdatePermissionDto,
  UpdatePermissionSchema,
} from './schema/Premission.Update.schema';

@Controller('permissions')
export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  @Get()
  getAllPermission() {
    return this.permissionService.getAllPermission();
  }

  @Get(':PermissionId')
  getOnePermission(@Param('PermissionId') permissionId: string) {
    return this.permissionService.getOnePermission(permissionId);
  }

  @Post()
  create(
    @Body(new ZodValidationPipe(CreatePermissionSchema))
    permissionData: CreatePermissionDto,
  ) {
    return this.permissionService.createPermission(permissionData);
  }

  @Patch(':permissionId')
  updated(
    @Param('permissionId') permissionId: string,
    @Body(new ZodValidationPipe(UpdatePermissionSchema))
    permissionData: UpdatePermissionDto,
  ) {
    return this.permissionService.updatePermission(
      permissionId,
      permissionData,
    );
  }

  @Delete(':PermissionId')
  remove(@Param('PermissionId') permissionId: string) {
    return this.permissionService.removePermission(permissionId);
  }
}
