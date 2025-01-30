import { Admin, Funcionario } from '@prisma/client';

export type User = Admin | Funcionario;