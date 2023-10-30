// lấy data để trả về controller
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { AuthRepository } from './auth.repository';
import { RegisterDTOServices, LoginDTO } from './dto/auth.dto';
import { EmailService } from '../../shared/utils/mail.service';
import { GlobalInterface } from 'src/shared/interface/global.interface';
@Injectable()
export class AuthServices {
  constructor(
    private authService: AuthRepository,
    private emailService: EmailService,
  ) {}

  async register(req: RegisterDTOServices): Promise<GlobalInterface> {
    const hashPassword = (password: string) =>
      bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    const user = { ...req, password: hashPassword(req.password) };
    const response = await this.authService.register(user);
    if (response) {
      const html = `<h2>Register code:</h2><br/><a href="http://127.0.0.1:3000/verifyAccount/${response.card_id}">Click here to confirm your registration</a>`;
      const data = {
        email: req.email,
        html,
        subject: 'Confirm your registration',
      };
      await this.emailService.sendEmail(data.email, data.subject, data.html);
      return {
        success: true,
        message: 'Please your check email',
      };
    }
  }
  async verifyAccount(card_id: string): Promise<GlobalInterface> {
    const response = await this.authService.verifyAccount(card_id);
    if (response) {
      return {
        success: true,
        message: 'Register successfully',
      };
    }
  }

  login(req: LoginDTO) {
    return this.authService.login(req);
  }
}