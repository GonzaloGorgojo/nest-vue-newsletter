/**
 * EmailSentEvent dto.
 *
 * @file   This file defines the email sent event class. Meant to hold the dto that will be used to emit an event when an email is sent.
 * @author Gonzalo Gorgojo.
 */

export class EmailSentEvent {
  recipients: { email: string }[];
  subject: string;
  type: string;
  count: number;
}
