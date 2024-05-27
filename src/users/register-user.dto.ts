import { Prisma } from '@prisma/client';

export class RegisterUserDto implements Partial<Prisma.UserCreateInput> {
	name: string;
	email: string;
	password: string;
}
