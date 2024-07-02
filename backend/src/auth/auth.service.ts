/**
 * AuthService.
 *
 * @file   This file defines the AuthService class. Meant to hold the authentication logic.
 * @author Gonzalo Gorgojo.
 */
import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { DataSource, EntityManager } from 'typeorm';
import { User } from '@/user/entities/user.entity';
import { LoginResponseDto } from './dto/login-response.dto';

@Injectable()
export class AuthService {
  logger: Logger;
  constructor(private dataSource: DataSource) {
    this.logger = new Logger(AuthService.name);
  }

  async logIn(loginDto: LoginDto): Promise<LoginResponseDto> {
    try {
      const manager: EntityManager = this.dataSource.manager;

      const user = await manager.findOne(User, {
        where: { email: loginDto.email },
      });

      if (!user) {
        throw new HttpException(
          {
            message: 'User with that email does not exist',
            service: 'backend-service',
          },

          HttpStatus.NOT_FOUND,
        );
      }
      if (user.password !== loginDto.password) {
        throw new HttpException(
          {
            message: 'Invalid password',
            service: 'backend-service',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }

      return { status: 'success', token: 'fakeToken' };
    } catch (error) {
      this.logger.error(`Error in AuthService, error: ${error}`);
      throw error;
    }
  }
}
