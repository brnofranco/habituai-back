import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from './constants';
import { RegisterUserDto } from 'src/user/register-user.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@SkipAuth()
	@HttpCode(HttpStatus.OK)
	@Post('login')
	signIn(@Body() signInDto: Record<string, any>) {
		return this.authService.signIn(signInDto.email, signInDto.password);
	}

	@SkipAuth()
	@HttpCode(HttpStatus.OK)
	@Post('register')
	register(@Body() registerDto: RegisterUserDto) {
		return this.authService.register(registerDto);
	}
}
