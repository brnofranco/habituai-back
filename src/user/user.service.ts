import { Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
	constructor(private prisma: DatabaseService) {}

	async findByEmail(email: string): Promise<User | null> {
		return await this.prisma.user.findUnique({ where: { email } });
	}

	async findById(requestedId: number): Promise<Omit<User, 'password'> | null> {
		const { id, email, name, experience, avatarId } = await this.prisma.user.findUnique({
			where: { id: requestedId },
		});

		return { id, email, name, experience, avatarId };
	}

	async register(data: Prisma.UserCreateInput): Promise<User> {
		const { email, name, password } = data;

		return this.prisma.user.create({
			data: {
				email,
				name,
				password,
			},
		});
	}

	async update(params: { where: Prisma.UserWhereUniqueInput; data: Prisma.UserUpdateInput }): Promise<User> {
		const { where, data } = params;
		return this.prisma.user.update({ data, where });
	}
}
