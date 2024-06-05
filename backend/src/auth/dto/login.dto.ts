/**
 * LoginDto.
 *
 * @file   This file defines the LoginDto class. Meant to hold the data transfer object for the user credentials.
 * @author Gonzalo Gorgojo.
 */

import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsNotEmpty({ message: 'Email is required' })
  @IsString({ message: 'Email must be a string' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  password: string;
}
