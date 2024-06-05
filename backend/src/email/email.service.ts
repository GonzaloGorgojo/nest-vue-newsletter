/**
 * EmailService.
 *
 * @file   This file defines the EmailService class. Meant to hold all logic related with emails.
 * @author Gonzalo Gorgojo.
 */
import { Injectable, Logger } from '@nestjs/common';
import { Unsuscribed } from './entities/unsuscribed';
import { DataSource, EntityManager } from 'typeorm';
import { EmailType } from './entities/email-type.entity';
import { SentEmailCount } from './entities/sent-email-count.entity';
import { SentEmailRecipient } from './entities/sent-email-recipient';
import { EmailTypeDto } from './dto/email-type.dto';

@Injectable()
export class EmailService {
  logger: Logger;

  constructor(private dataSource: DataSource) {
    this.logger = new Logger(EmailService.name);
  }

  async getUnsuscribedRecipients(): Promise<Unsuscribed[]> {
    try {
      const manager: EntityManager = this.dataSource.manager;

      return await manager.find(Unsuscribed);
    } catch (error) {
      this.logger.error(
        `Error in method: getUnsuscribedRecipients, error: ${error}`,
      );
      throw error;
    }
  }

  async getEmailTypes(): Promise<EmailType[]> {
    try {
      const manager: EntityManager = this.dataSource.manager;

      return await manager.find(EmailType);
    } catch (error) {
      this.logger.error(
        `Error in method: getUnsuscribedRecipients, error: ${error}`,
      );
      throw error;
    }
  }

  async getSentEmailCount(): Promise<SentEmailCount[]> {
    try {
      const manager: EntityManager = this.dataSource.manager;

      return await manager.find(SentEmailCount);
    } catch (error) {
      this.logger.error(`Error in method: getSentEmailCount, error: ${error}`);
      throw error;
    }
  }

  async getSentEmailRecipient(): Promise<SentEmailRecipient[]> {
    try {
      const manager: EntityManager = this.dataSource.manager;

      return await manager.find(SentEmailRecipient);
    } catch (error) {
      this.logger.error(
        `Error in method: getSentEmailRecipient, error: ${error}`,
      );
      throw error;
    }
  }

  async addEmailType(emailType: EmailTypeDto) {
    try {
      const manager: EntityManager = this.dataSource.manager;

      return await manager.save(EmailType, emailType);
    } catch (error) {
      this.logger.error(`Error in method: addEmailType, error: ${error}`);
      throw error;
    }
  }

  async sendEmail() {
    try {
      // send email logic here
    } catch (error) {
      this.logger.error(`Error in method: sendEmail, error: ${error}`);
      throw error;
    }
  }
}
