import { IsNumberString, IsArray, IsIn } from 'class-validator';

export class GenerateQuestionDto {
  @IsArray()
  skills: string[];

  @IsArray()
  technologies: string[];

  @IsIn(['junior', 'mid-level', 'senior'])
  experienceLevel: string;

  @IsNumberString()
  count : string;
}