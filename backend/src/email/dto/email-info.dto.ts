/**
 * Email info dto.
 *
 * @file   This file defines the email inf class. Meant to hold the input data to send an email.
 * @author Gonzalo Gorgojo.
 */

import { IsNotEmpty, IsString } from 'class-validator';

export class EmailInfoDto {
  @IsNotEmpty({ message: 'to is required' })
  @IsString({ message: 'to must be an strings' })
  to: string;

  @IsNotEmpty({ message: 'subject is required' })
  @IsString({ message: 'subject must be a string' })
  subject: string;

  @IsNotEmpty({ message: 'body is required' })
  @IsString({ message: 'body must be a string' })
  body: string;

  @IsNotEmpty({ message: 'type is required' })
  @IsString({ message: 'type must be a string' })
  type: string;
}
