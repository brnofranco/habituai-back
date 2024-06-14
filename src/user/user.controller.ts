import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Request } from '@nestjs/common';
import { UserService } from './user.service';
import { TokenPayload } from 'src/auth/token-payload';
import { Prisma } from '@prisma/client';
import { SkipAuth } from 'src/auth/constants';
import { RegisterUserDto } from './register-user.dto';

@Controller('user')
export class UserController {
	constructor(private userService: UserService) {}

	@Get()
	getUser(@Request() request: { user: TokenPayload }) {
		const { id } = request.user;
		return this.userService.findById(id);
	}

	@Put()
	updateUser(@Request() request: { user: TokenPayload; body: Prisma.UserUpdateInput }) {
		const { id } = request.user;
		return this.userService.update({ where: { id }, data: request.body });
	}

	@SkipAuth()
	@HttpCode(HttpStatus.OK)
	@Post()
	register(@Body() registerDto: RegisterUserDto) {
		return this.userService.register(registerDto);
	}
}
