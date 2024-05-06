import { Injectable } from '@nestjs/common';
import { users } from '@prisma/client';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    host: 'mail.smtp2go.com',
    port: 2525,
    secure: false,
    auth: {
      user: 'hugerain.space',
      pass: 'OTKiJmG2C4yVOSbK',
    },
  });

  async sendOrderConfirmation(user: users, order: any) {
    const itemsHtml = order.order_products
      .map(
        (op) => `
        <tr>
            <td>${op.product.name}</td>
            <td>${op.quantity}</td>
            <td>₽${op.product.price.toFixed(2)}</td>
        </tr>
    `,
      )
      .join('');

    const mailOptions = {
      from: 'noreply@hugerain.space',
      to: user.email,
      subject: 'Подтверждения заказа',
      html: `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                body { font-family: Arial, sans-serif; background-color: #f4f4f4; color: #333; margin: 0; padding: 20px; }
                .container { background-color: #ffffff; border: 1px solid #e0e0e0; padding: 20px; max-width: 600px; margin: auto; }
                .header { background-color: #007bff; color: #ffffff; padding: 10px 20px; text-align: center; border-radius: 3px 3px 0 0; }
                table { width: 100%; border-collapse: collapse; }
                th, td { text-align: left; padding: 8px; border-bottom: 1px solid #e0e0e0; }
                .total { font-weight: bold; }
                .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">Благодарим вас за ваш заказ</div>
                <p>Здравствуйте, ${user.name},</p>
                <p>Благодарим вас за ваш заказ. Он будет зарезервирован, пока мы не получим подтверждение того, что платеж получен. Напоминаем содержимое вашего заказа:</p>
                <table>
                    <tr><th>Товар</th><th>Количество</th><th>Цена</th></tr>
                    ${itemsHtml}
                </table>
                <table>
                    <tr><td class="total">Подытог:</td><td class="total">₽${order.summary.toFixed(2)}</td></tr>
                    <tr><td>Метод оплаты:</td><td>${order.paymentMethod || 'Прямой перевод по банковской карте'}</td></tr>
                    <tr><td>Итого:</td><td>₽${order.summary.toFixed(2)}</td></tr>
                    <tr><td>Примечание:</td><td>${order.note || 'Нет'}</td></tr>
                </table>
                <div class="footer">
                    Платежный адрес<br>
                    ${user.name} ${user.surname} ${user.lastname}<br>
                    Пользовательский адрес не указан<br>
                    ${user.email}
                </div>
            </div>
        </body>
        </html>
        `,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Order confirmation sent.');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
