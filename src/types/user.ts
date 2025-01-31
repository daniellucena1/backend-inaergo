import { Admin, Employee, Manager } from '@prisma/client';

export type User = Admin | Employee | Manager;