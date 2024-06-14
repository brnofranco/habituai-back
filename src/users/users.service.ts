import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import * as bcrypt from 'bcrypt';
import { bcryptSalts } from 'src/auth/constants';
import { UsersPresenter } from './user.presenter';
import { RegisterUsersDto } from './register-users.dto';

@Injectable()
export class UsersService {
	constructor(private prisma: DatabaseService) {}

	async register(payload: RegisterUsersDto) {
		const { name, email, password } = payload;

		const user = await this.findByEmail(email);

		if (user) {
			console.error('[register] User already registered!');
			throw new HttpException('User already registered!', HttpStatus.UNPROCESSABLE_ENTITY);
		}

		try {
			const encryptedPassword = await bcrypt.hash(password, bcryptSalts);
			const createdUser = await this.prisma.user.create({
				data: { email, name, password: encryptedPassword },
			});

			console.log('[register] User created successfully!');

			return new UsersPresenter(createdUser);
		} catch (error) {
			console.error('[register] User cannot be created!', error);
			throw new HttpException('User cannot be created!', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	async findByEmail(email: string): Promise<User | null> {
		return await this.prisma.user.findUnique({ where: { email } });
	}

	async findById(requestedId: number): Promise<Omit<User, 'password'> | null> {
		const { id, email, name, experience, avatarId } = await this.prisma.user.findUnique({
			where: { id: requestedId },
		});

		return { id, email, name, experience, avatarId };
	}

	async update(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> {
		const { where, data } = params;
		return this.prisma.user.update({ data, where });
	}
}
