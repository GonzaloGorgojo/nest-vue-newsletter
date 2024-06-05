/**
 * Recipient entity.
 *
 * @file This file defines the Recipient entity class. Meant to hold information of the recipients.
 * @author Gonzalo Gorgojo.
 */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'recipient' })
export class Recipient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, length: 256 })
  email: string;
}
