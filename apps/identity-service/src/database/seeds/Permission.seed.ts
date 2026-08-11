export const SYSTEM_PERMISSIONS = [
  {
    code: 'tenant:read',
    description: 'Read tenant information',
  },
  {
    code: 'tenant:update',
    description: 'Update tenant information',
  },
  {
    code: 'tenant:members:create',
    description: 'Add users to a tenant',
  },
  {
    code: 'tenant:members:read',
    description: 'View tenant members',
  },
  {
    code: 'tenant:members:update',
    description: 'Update tenant membership',
  },
  {
    code: 'tenant:members:delete',
    description: 'Remove users from a tenant',
  },
  {
    code: 'tenant:roles:create',
    description: 'Create tenant roles',
  },
  {
    code: 'tenant:roles:read',
    description: 'View tenant roles',
  },
  {
    code: 'tenant:roles:update',
    description: 'Update tenant roles',
  },
  {
    code: 'tenant:roles:delete',
    description: 'Delete tenant roles',
  },
];

//pnpm prisma db seed. --> to run seed command
