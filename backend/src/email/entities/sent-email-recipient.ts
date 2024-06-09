/**
 * Sent Email Recipient entity.
 *
 * @file This file defines the Sent Email Recipient entity class. Meant to hold the information of the recipients of an email.
 * @author Gonzalo Gorgojo.
 */
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Recipient } from '@/user/entities/recipient.entity';
import { SentEmailCount } from './sent-email-count.entity';

@Entity({ name: 'sent_email_recipient' })
export class SentEmailRecipient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  date_sent: Date;

  @ManyToOne(() => Recipient, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'fk_recipient_id' })
  fk_recipient_id: Recipient;

  @ManyToOne(() => SentEmailCount)
  @JoinColumn({ name: 'fk_email_batch_id' })
  fk_email_batch_id: SentEmailCount;
}
