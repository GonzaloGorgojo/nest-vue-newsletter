/**
 * Email type dto.
 *
 * @file   This file defines the email type class. Meant to hold the data transfer object to add a new email type.
 * @author Gonzalo Gorgojo.
 */

import { IsNotEmpty, IsString } from 'class-validator';

export class EmailTypeDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString({ message: 'Name must be a string' })
  type: string;
}
