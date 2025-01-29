import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secrete-key';

export const authService = {
  async login(email : string, senha: string) {
    const user = await prisma.admin.findUnique( { where: {email} } ) || await prisma.funcionario.findUnique( { where: { email } } );

    if ( !user ) {
      throw new Error('Usuário não encontrado');
    }

    const isPasswordvalid = await bcrypt.compare( senha, user.senha );

    if ( !isPasswordvalid ) {
      throw new Error('Senha Inválida');
    }

    const token = jwt.sign( { id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' } );

    return { token, user };
  },

  async verifyToken ( token: string ) {
    try {
      const decoded = jwt.verify( token, JWT_SECRET );
      return decoded;
    } catch (error) {
      throw new Error('Token Inválido');
    }
  }
};