import { Prisma } from '@prisma/client';

export class RegisterUsersDto implements Partial<Prisma.UserCreateInput> {
	name: string;
	email: string;
	password: string;
}
