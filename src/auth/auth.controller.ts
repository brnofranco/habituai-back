import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SkipAuth } from './constants';
import { LoginDto } from './login.dto';

@Controller('auth')
export class AuthController {
	constructor(private authService: AuthService) {}

	@SkipAuth()
	@HttpCode(HttpStatus.OK)
	@Post('login')
	signIn(@Body() loginDto: LoginDto) {
		return this.authService.login(loginDto);
	}
}
