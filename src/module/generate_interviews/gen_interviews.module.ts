import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionController } from '../generate_interviews/gen_interviews.controller';
import { QuestionService } from './gen_interviews.service';
import { User } from '../../entities/user.entity';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [QuestionController],
  providers: [QuestionService,ConfigService,JwtService],
})
export class QuestionModule {}