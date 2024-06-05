/**
 * Role entity.
 *
 * @file This file defines the Role entity class. Meant to hold the allowed roles.
 * @author Gonzalo Gorgojo.
 */

import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'role' })
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, length: 100 })
  type: RoleTypeEnum;
}

enum RoleTypeEnum {
  ADMIN = 'admin',
  USER = 'user',
}
