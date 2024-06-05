/**
 * User Role entity.
 *
 * @file This file defines the User Role entity class. Meant to hold roles that a user can have.
 * @author Gonzalo Gorgojo.
 */

import { User } from '@/user/entities/user.entity';
import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from './role.entity';

@Entity({ name: 'user_role' })
export class UserRole {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_user_id' })
  fk_user_id: User;

  @OneToOne(() => Role, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_role_id' })
  fk_role_id: Role;
}
