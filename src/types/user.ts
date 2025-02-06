import { Admin, Manager } from '@prisma/client';

export type User = Admin | Manager;