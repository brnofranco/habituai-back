import * as bcrypt from 'bcrypt';
import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoginDto } from './login.dto';

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService,
	) {}

	async login(LoginDto: LoginDto) {
		const { email, password } = LoginDto;

		const user = await this.userService.findByEmail(email);

		if (!user) {
			console.error('[login] User not found!');
			throw new NotFoundException();
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			console.error('[login] User unauthorized!');
			throw new UnauthorizedException();
		}

		const payloadJWT = { id: user.id, email: user.email };

		const token = await this.jwtService.signAsync(payloadJWT);
		console.log('[login] User logged successfully!');
		return { token };
	}
}
