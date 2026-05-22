export const roles = {
  customer: "CUSTOMER",
  admin: "ADMIN",
  superAdmin: "SUPER_ADMIN",
  designer: "DESIGNER",
  production: "PRODUCTION",
} as const;

export type AppRole = (typeof roles)[keyof typeof roles];

export function canAccessAdmin(roleNames: AppRole[]) {
  return roleNames.includes(roles.admin) || roleNames.includes(roles.superAdmin);
}
