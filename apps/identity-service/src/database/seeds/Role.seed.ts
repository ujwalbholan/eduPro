export const DEFAULT_ROLES = [
  {
    name: 'ADMIN',
    description: 'Full administrative access to the tenant',

    permissions: [
      'tenant:read',
      'tenant:update',

      'tenant:members:create',
      'tenant:members:read',
      'tenant:members:update',
      'tenant:members:delete',

      'tenant:roles:create',
      'tenant:roles:read',
      'tenant:roles:update',
      'tenant:roles:delete',
    ],
  },

  {
    name: 'TEACHER',
    description: 'Teacher access to tenant resources',

    permissions: ['tenant:read', 'tenant:members:read'],
  },

  {
    name: 'STUDENT',
    description: 'Student access to tenant resources',

    permissions: ['tenant:read'],
  },
];
