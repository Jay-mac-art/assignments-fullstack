import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { GenerateQuestionDto } from '../generate_interviews/dto/generate_interview'
import { QuestionService } from '../generate_interviews/gen_interviews.service';
import { JwtGuard } from 'src/guard/jwt.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller('ai')
@UseGuards(JwtGuard) 
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}


  @Post('generate-questions')
  async generateQuestions(@Body() dto: GenerateQuestionDto , @Req() request: Request | any) { 
    try{
    return this.questionService.generateQuestion(dto,request?.user?.userId);
    }
    catch(error)
    {
      throw error;
    }
  }
}
