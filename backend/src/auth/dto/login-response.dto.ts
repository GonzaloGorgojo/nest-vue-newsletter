/**
 * LoginResponseDto.
 *
 * @file This file defines the LoginResponseDto class. Meant to hold the response data transfer object for the user credentials.
 * @author Gonzalo Gorgojo.
 */

import { IsNotEmpty, IsString } from 'class-validator';

export class LoginResponseDto {
  @IsNotEmpty({ message: 'status is required' })
  @IsString({ message: 'status must be a string' })
  status: string;

  @IsNotEmpty({ message: 'token is required' })
  @IsString({ message: 'token must be a string' })
  token: string;
}
