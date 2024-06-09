import { Injectable, Logger } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { EmailSentEvent } from '../dto/email-event.dto';
import { DataSource } from 'typeorm';
import { Recipient } from '@/user/entities/recipient.entity';
import { EmailType } from '../entities/email-type.entity';
import { SentEmailCount } from '../entities/sent-email-count.entity';
import { SentEmailRecipient } from '../entities/sent-email-recipient';
import { User } from '@/user/entities/user.entity';

@Injectable()
export class EmailSentListener {
  logger: Logger;

  constructor(private dataSource: DataSource) {
    this.logger = new Logger(EmailSentListener.name);
  }

  @OnEvent('email.sent')
  async handleEmailSentEvent(event: EmailSentEvent) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();

      const manager = queryRunner.manager;

      const [requestUser, emailType] = await Promise.all([
        manager.findOne(User, {
          where: { id: 1 },
        }),
        manager.findOne(EmailType, {
          where: { type: event.type },
        }),
      ]);

      const emailCount: SentEmailCount = await manager.save(SentEmailCount, {
        recipient_count: event.count,
        fk_email_type_id: emailType,
        date_sent: new Date(),
        fk_user_id: requestUser,
      });
      this.logger.log(`Email count saved: ${emailCount.recipient_count}`);

      for (const recipient of event.recipients) {
        let existingRecipient = await manager.findOne(Recipient, {
          where: { email: recipient.email },
        });
        if (!existingRecipient) {
          existingRecipient = await manager.save(Recipient, {
            email: recipient.email,
          });
        }

        await manager.save(SentEmailRecipient, {
          date_sent: new Date(),
          fk_email_batch_id: emailCount,
          fk_email_type_id: emailType,
          fk_recipient_id: existingRecipient,
        });
        this.logger.log(`Email sent to: ${recipient.email}`);
      }
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      this.logger.error(
        `Error in method: handleEmailSentEvent, error: ${error}`,
      );
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
