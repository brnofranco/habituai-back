import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async signIn(email: string, password: string): Promise<{ token: string }> {
		const user = await this.usersService.findOne(email);

		if (!user) {
			console.log('User not found!');
			throw new NotFoundException();
		}

		if (user?.password !== password) {
			console.log('User unauthorized!');
			throw new UnauthorizedException();
		}

		const payload = { sub: user.id, email: user.email };

		return {
			token: await this.jwtService.signAsync(payload),
		};
	}
}
