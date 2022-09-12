import nodemailer from 'nodemailer';
import { MailAdapter, SendMailData } from '../mail-adapter';

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: '72a4da3710c102',
    pass: 'd794d01fb87581',
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: 'Equipe Feedget <oi@geedget.com>',
      to: 'Caue Fidelis <cauefidelis@live.com',
      subject,
      html: body,
    });
  }
}
