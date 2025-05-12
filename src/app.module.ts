import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './entities/user.entity';
import { AuthModule } from './module/auth/auth.module';
import { QuestionModule } from './module/generate_interviews/gen_interviews.module';

@Module({
  imports: [
   ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USERNAME, 
      password:  process.env.DB_PASSWORD, 
      database: process.env.DB_DATABASE,  
      entities: [User],
      synchronize: true, 
    }),
    AuthModule,
    QuestionModule
  ],
})
export class AppModule {}