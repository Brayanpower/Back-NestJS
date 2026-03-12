import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dbo/login.dbo';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly authSvc: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    return this.authSvc.login(loginDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return req.user;
  }

  // @Post('refresh')
  // async refreshToken(@Request() req) {
  //   return this.authSvc.refreshToken(req.user);
  // }

  @Post('logout')
  async logout() {
    return { message: 'User logged out' };
  }
}