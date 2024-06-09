import { Module } from '@nestjs/common';
import { EmailService } from './email.service';
import { EmailController } from './email.controller';
import { EmailProvider } from './email-provider.service';
import { UserModule } from '@/user/user.module';
import { EmailSentListener } from './listener/email-dispatch.listener';

@Module({
  imports: [UserModule],
  controllers: [EmailController],
  providers: [EmailService, EmailProvider, EmailSentListener],
})
export class EmailModule {}
