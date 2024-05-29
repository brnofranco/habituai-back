import { SetMetadata } from '@nestjs/common';

export const jwtConstants = {
	secret: process.env.JWT_SECRET || 'jwtSecret',
};

export const IS_PUBLIC_KEY = process.env.IS_PUBLIC_KEY || 'isPublic';
export const SkipAuth = () => SetMetadata(IS_PUBLIC_KEY, true);

export const bcryptSalts = Number(process.env.BCRYPT_SALTS) || 10;
