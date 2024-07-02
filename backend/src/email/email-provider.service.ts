/**
 * EmailProvider.
 *
 * @file   This file defines the EmailProvider class. Meant to hold one provider that we will use to manage sent emails.
 * @author Gonzalo Gorgojo.
 */

import { HttpException, Injectable, Logger } from '@nestjs/common';
import { MailtrapClient, SendResponse } from 'mailtrap';
import { EmailInfoDto } from './dto/email-info.dto';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Injectable()
export class EmailProvider {
  logger: Logger;
  constructor(private eventEmitter: EventEmitter2) {
    this.logger = new Logger(EmailProvider.name);
  }

  async sendBulkEmail(info: EmailInfoDto, attachment?: Express.Multer.File) {
    try {
      const client = new MailtrapClient({
        token: process.env.TOKEN,
      });

      const sender = {
        email: 'newsletter@gonzalogorgojo.com',
        name: 'Newsletter',
      };
      const recipients = [
        {
          email: 'newsletter.app@gmail.com',
        },
      ];
      const blindCopy = info.to.split(',').map((email) => {
        return {
          email,
        };
      });

      const emailSent: SendResponse = await client.send({
        from: sender,
        to: recipients,
        bcc: blindCopy,
        subject: info.subject,
        attachments: attachment
          ? [
              {
                filename: attachment.originalname,
                content: attachment.buffer.toString('base64'),
              },
            ]
          : null,
        html: `
                <!doctype html>
                <html>
                <head>
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                </head>
                <body style="font-family: sans-serif;">
                    <div style="display: block; margin: auto; max-width: 600px;" class="main">
                    <h1 style="font-size: 18px; font-weight: bold; margin-top: 20px">Newsletter</h1>
                    <p>${info.body}</p>
                    </div>

                    <a href="__unsubscribe_url__">unsubscribe</a>
                </body>
                </html>
                `,
      });

      if (emailSent.success) {
        this.eventEmitter.emit('email.sent', {
          recipients: blindCopy,
          subject: info.subject,
          type: info.type,
          count: emailSent.message_ids.length - 1,
        });
        return 'Email sent successfully';
      } else {
        throw new HttpException('Error sending email', 500);
      }
    } catch (error) {
      this.logger.error(`Error in method: sendBulkEmail, error: ${error}`);
      throw error;
    }
  }
}
