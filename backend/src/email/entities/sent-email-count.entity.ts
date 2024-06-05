/**
 * Sent Email Count entity.
 *
 * @file This file defines the Sent Email Count entity class. Meant to hold the number of emails sent, and the type of the email.
 * @author Gonzalo Gorgojo.
 */
import { User } from '@/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EmailType } from './email-type.entity';

@Entity({ name: 'sent_email_count' })
export class SentEmailCount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'timestamp',
    nullable: false,
    default: () => 'CURRENT_TIMESTAMP',
  })
  date_sent: Date;

  @OneToOne(() => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_user_id' })
  fk_user_id: User;

  @Column({ nullable: false })
  recipient_count: number;

  @OneToOne(() => EmailType, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_email_type_id' })
  fk_email_type_id: EmailType;
}
