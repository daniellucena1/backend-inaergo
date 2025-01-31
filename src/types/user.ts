import { Admin, Employee } from '@prisma/client';

export type User = Admin | Employee;