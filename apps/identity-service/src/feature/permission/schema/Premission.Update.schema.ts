import { z } from 'zod';
import { CreatePermissionSchema } from './Permission.Create.schema';

export const UpdatePermissionSchema = CreatePermissionSchema.partial({
  code: true,
  description: true,
});

export type UpdatePermissionDto = z.infer<typeof UpdatePermissionSchema>;
