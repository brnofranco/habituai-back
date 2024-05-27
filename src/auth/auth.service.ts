import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from 'src/users/register-user.dto';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async signIn(email: string, password: string): Promise<{ token: string }> {
		const user = await this.usersService.find(email);

		if (!user) {
			console.error('User not found!');
			throw new NotFoundException();
		}

		//TODO encrypt pass
		if (user?.password !== password) {
			console.error('User unauthorized!');
			throw new UnauthorizedException();
		}

		const payloadJWT = { sub: user.id, email: user.email };

		return { token: await this.jwtService.signAsync(payloadJWT) };
	}

	async register(payload: RegisterUserDto): Promise<void> {
		const user = await this.usersService.find(payload.email);

		if (user) {
			console.error('User already registered!');
			throw new ConflictException();
		}

		this.usersService.register(payload);
	}
}
