import { Controller, Post, Body, UsePipes, ValidationPipe, HttpCode, Patch, Param, ParseIntPipe, UseGuards, Req, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto, UpdateUserDto } from './dto/auth.dto';
import { User } from 'src/entities/user.entity';
import { JwtGuard } from 'src/guard/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @UsePipes(new ValidationPipe())
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @HttpCode(200)
  @UsePipes(new ValidationPipe())
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @UseGuards(JwtGuard)
  @Post('update')
  async update(
    @Req() request : any ,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<User> {
    return this.authService.update(request?.user?.userId, updateUserDto);
}


 @UseGuards(JwtGuard)
 @Get('user')
  async findOne(
   @Req() request : any ,
  ): Promise<User> {
    return this.authService.findOne(request?.user?.userId);
  }

}