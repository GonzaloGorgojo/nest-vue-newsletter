/**
 * AuthController controller.
 *
 * @file   This file defines the AuthController controller. Meant to hold authentication and authorization routes.
 * @author Gonzalo Gorgojo.
 */

import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto): Promise<LoginResponseDto> {
    return this.authService.logIn(loginDto);
  }
}
