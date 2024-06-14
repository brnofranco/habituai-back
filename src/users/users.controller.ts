import { Body, Controller, Get, HttpCode, HttpStatus, Post, Put, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import { TokenPayload } from 'src/auth/token-payload';
import { Prisma } from '@prisma/client';
import { SkipAuth } from 'src/auth/constants';
import { RegisterUsersDto } from './register-users.dto';

@Controller('users')
export class UsersController {
	constructor(private userService: UsersService) {}

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
	register(@Body() registerDto: RegisterUsersDto) {
		return this.userService.register(registerDto);
	}
}
