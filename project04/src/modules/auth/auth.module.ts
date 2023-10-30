import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthServices } from './auth.service';
import { AuthRepository } from './auth.repository';
import { EmailService } from '../../shared/utils/mail.service';
import { GenerateToken } from '../../shared/middlewares/generateToken';
import { UserEntity } from './entities/auth.entity';
@Module({
  controllers: [AuthController],
  imports: [TypeOrmModule.forFeature([UserEntity, AuthRepository])],
  providers: [AuthServices, AuthRepository, EmailService, GenerateToken],
})
export class AuthModule {}
