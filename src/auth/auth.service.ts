import { Injectable, UnauthorizedException, NotFoundException } from '@nestjs/common';
import { UtilService } from '../common/services/util/util.service';
import { LoginDto } from './dbo/login.dbo';
import { UsersService } from 'src/common/services/user.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly utilService: UtilService,
  ) {}

// src/auth/auth.service.ts

async login(loginDto: any) {
  const { username, password } = loginDto;

  // 1. Buscar el usuario
  // Asegúrate de que findOneByUsername esté implementado en UsersService
  const user = await this.usersService.findOneByUsername(username);

  // 2. VALIDACIÓN CRÍTICA: Si no existe, lanzamos el error 404 y el código se detiene aquí.
  if (!user) {
    throw new NotFoundException('Usuario inexistente.');
  }

  // 3. Comparar contraseñas
  // Solo llegamos aquí si 'user' tiene datos.
  const isMatch = await this.utilService.comparePasswords(password, user.password);

  if (!isMatch) {
    throw new UnauthorizedException('Contraseña incorrecta.');
  }

  return {
    message: 'Login exitoso',
    user: { id: user.id, username: user.username }
  };
}
}