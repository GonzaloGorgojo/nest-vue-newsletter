/**
 * EmailController controller.
 *
 * @file   This file defines the EmailController controller. Meant to hold email related routes.
 * @author Gonzalo Gorgojo.
 */
import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { EmailService } from './email.service';
import { Unsuscribed } from './entities/unsuscribed';
import { EmailType } from './entities/email-type.entity';
import { SentEmailCount } from './entities/sent-email-count.entity';
import { SentEmailRecipient } from './entities/sent-email-recipient';
import { EmailInfoDto } from './dto/email-info.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Get('unsuscribed')
  async getUnsuscribedRecipients(): Promise<Unsuscribed[]> {
    return this.emailService.getUnsuscribedRecipients();
  }

  @Get('type')
  async getEmailTypes(): Promise<EmailType[]> {
    return this.emailService.getEmailTypes();
  }

  @Get('sent/count')
  async getSentEmailCount(): Promise<SentEmailCount[]> {
    return this.emailService.getSentEmailCount();
  }

  @Get('sent/recipient')
  async getSentEmailRecipient(): Promise<SentEmailRecipient[]> {
    return this.emailService.getSentEmailRecipient();
  }

  @Post('send')
  @UseInterceptors(FileInterceptor('attachment'))
  async sendEmail(
    @Body() info: EmailInfoDto,
    @UploadedFile() attachment?: Express.Multer.File,
  ) {
    return this.emailService.sendEmail(info, attachment);
  }
}
