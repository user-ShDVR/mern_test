import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'noreply.market.test.1337@gmail.com',
      pass: 'WT6-TER-8c8-i9a',
    },
  });

  async sendOrderConfirmation(email: string, orderDetails: any) {
    const mailOptions = {
      from: '"Your Company" <noreply.market.test.1337@gmail.com>',
      to: email,
      subject: 'Order Confirmation',
      text: `Your order has been placed successfully. Order details: ${JSON.stringify(orderDetails)}`,
      html: `<p>Your order has been placed successfully. Here are the details:</p>
             <pre>${JSON.stringify(orderDetails, null, 2)}</pre>`,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Order confirmation sent.');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
