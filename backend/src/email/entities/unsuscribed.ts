/**
 * Unsuscribed entity.
 *
 * @file This file defines the Unsuscribed entity class. Meant to hold recipients and the type of emails they unsuscribed.
 * @author Gonzalo Gorgojo.
 */
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EmailType } from './email-type.entity';
import { Recipient } from '@/user/entities/recipient.entity';

@Entity({ name: 'unsuscribed' })
export class Unsuscribed {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', nullable: false })
  date_unsuscribed: Date;

  @ManyToOne(() => EmailType, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_email_type_id' })
  fk_email_type_id: EmailType;

  @OneToOne(() => Recipient, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_recipient_id' })
  fk_recipient_id: Recipient;
}
