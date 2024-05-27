import { HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterUserDto } from 'src/users/register-user.dto';
import { bcryptSalts } from './constants';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	async signIn(email: string, password: string): Promise<{ token: string }> {
		const user = await this.usersService.find(email);

		if (!user) {
			console.error('[signIn] User not found!');
			throw new NotFoundException();
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password);

		if (!isPasswordCorrect) {
			console.error('[signIn] User unauthorized!');
			throw new UnauthorizedException();
		}

		const payloadJWT = { sub: user.id, email: user.email };

		const token = await this.jwtService.signAsync(payloadJWT);
		console.log('[signIn] User logged successfully!');
		return { token };
	}

	async register(payload: RegisterUserDto): Promise<void> {
		const { email, password } = payload;

		const user = await this.usersService.find(email);

		if (user) {
			console.error('[register] User already registered!');
			throw new HttpException('User already registered!', HttpStatus.UNPROCESSABLE_ENTITY);
		}

		await bcrypt
			.hash(password, bcryptSalts)
			.then((encryptedPassword) => {
				this.usersService.register({ ...payload, password: encryptedPassword });
				console.log('[register] User created successfully!');
			})
			.catch((error) => {
				console.error('[register] User cannot be created!', error);
			});
	}
}
