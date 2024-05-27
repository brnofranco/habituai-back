import User from './users';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
	private readonly users: User[] = [];

	async findOne(email: string): Promise<User | undefined> {
		return this.users.find((user) => user.email === email);
	}
}
