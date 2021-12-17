import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService } from '@nestjs-modules/mailer';

import { MailData } from './interfaces/mail-data.interface';

@Injectable()
export class MailService {
  constructor(
    private mailerService: MailerService,
    private configService: ConfigService,
  ) {}

  async userSignUp(mailData: MailData<{ hash: string }>): Promise<void> {
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: "Confirm email",
      text: `${this.configService.get('app.frontendDomain')}/confirm-email/${
        mailData.data.hash
      } Confirm email`,
      template: './activation',
      context: {
        title: "Confirm email",
        url: `${this.configService.get('app.frontendDomain')}/confirm-email/${
          mailData.data.hash
        }`,
        actionTitle: "Confirm email",
        app_name: this.configService.get('app.name'),
        text1: "Hey!",
        text2: "You’re almost ready to start enjoying",
        text3: "Simply click the big green button below to verify your email address.",
      },
    });
  }

  async forgotPassword(mailData: MailData<{ hash: string }>): Promise<void> {
    await this.mailerService.sendMail({
      to: mailData.to,
      subject: "Reset Password",
      text: `${this.configService.get('app.frontendDomain')}/password-change/${
        mailData.data.hash
      } Reset Password`,
      template: './reset-password',
      context: {
        title: "Reset Password",
        url: `${this.configService.get('app.frontendDomain')}/password-change/${
          mailData.data.hash
        }`,
        actionTitle: "Reset Password",
        app_name: this.configService.get('app.name'),
        text1: "Trouble signing in?",
        text2: "Resetting your password is easy.",
        text3: "Just press the button below and follow the instructions. We’ll have you up and running in no time.",
        text4: "If you did not make this request then please ignore this email.",
        text5: "This password reset link will expire in 2 hours.",
      },
    });
  }
}