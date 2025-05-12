import { Injectable, BadGatewayException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import axios from 'axios';
import { User } from '../../entities/user.entity';
import { GenerateQuestionDto } from './dto/generate_interview';

interface AiQuestion {
  question: string;
  criteria: string;
}

@Injectable()
export class QuestionService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async generateQuestion(dto: GenerateQuestionDto, userId: number): Promise<any> {
    const user = await this.userRepo.findOneBy({ id: userId });
    const baseSkills = user?.skills ?? [];
    const baseTechs = user?.technologies ?? [];
    const {count , experienceLevel} = dto;
    const allSkills = Array.from(new Set([...baseSkills, ...(dto.skills ?? [])]));
    const allTechs = Array.from(new Set([...baseTechs, ...(dto.technologies ?? [])]));


    const prompt = this.constructPrompt(allSkills, allTechs, experienceLevel,count);
    const raw = await this.callLLM(prompt);

       
    const jsonMatch = raw.match(/```json\s*([\s\S]*?)\s*```/i);
    const jsonString = jsonMatch ? jsonMatch[1] : raw;

    try {
      const parsed: AiQuestion[] = JSON.parse(jsonString);
      return parsed.map(({ question, criteria }) => ({
        question: question.trim(),
        criteria: criteria.trim(),
      }));
    } catch (e) {
      throw new BadGatewayException('Invalid JSON response from LLM');
    }
  }

  private constructPrompt(skills: string[], technologies: string[], level: string , count : string): string {
    return `You are a technical interviewer. Generate an array of objects in JSON format, each with \"question\" and \"criteria\" fields. Generate ${count} questions for a ${level} candidate with skills in ${skills.join(', ')} and technologies like ${technologies.join(', ')}.`;
  }

  private async callLLM(prompt: string): Promise<string> {
    const apiKey = this.configService.get<string>('OPENROUTER_API_KEY');
    const res = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-prover-v2:free',
        messages: [
          { role: 'system', content: 'You output valid JSON only.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 800,
      },
      { headers: { Authorization: `Bearer ${apiKey}` } },
    );
    const content = res.data.choices?.[0]?.message?.content;
    if (!content) throw new BadGatewayException('Empty response from LLM');
    return content;
  }
}
